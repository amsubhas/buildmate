import fs from 'node:fs/promises';
import path from 'node:path';

const base = process.env.DIRECTUS_URL || 'http://localhost:8055';
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
const repoRoot = path.resolve(new URL('.', import.meta.url).pathname, '..');
const brochureDir = path.join(repoRoot, 'public', 'brochures', 'pdf');
const brochures = [
  ['Buildmate_01-AAC-Plants.pdf','AAC Plants','aac-plants','Manufacturing Plants','Flagship Product'],
  ['Buildmate_02-Dry-Mix-Mortar-Plants.pdf','Dry Mix Mortar Plants','dry-mix-mortar-plants','Manufacturing Plants','Dry Mix'],
  ['Buildmate_03-Precast-Concrete-Plants.pdf','Precast Concrete Plants','precast-concrete-plants','Manufacturing Plants','Precast'],
  ['Buildmate_04-Concrete-Block-Brick-Plants.pdf','Concrete Block / Brick Plants','concrete-block-brick-plants','Manufacturing Plants','Block Plants'],
  ['Buildmate_05-Stone-Crushing-Plants.pdf','Stone Crushing Plants','stone-crushing-plants','Processing Equipment','Crushing'],
  ['Buildmate_06-Concrete-Blocks.pdf','Concrete Blocks','concrete-blocks','Product Catalogue','Catalogue'],
  ['Buildmate_07-Precast-Concrete-Elements.pdf','Precast Concrete Elements','precast-concrete-elements','Product Catalogue','Catalogue'],
  ['Buildmate_08-Concrete-Batching-Plants.pdf','Concrete Batching Plants','concrete-batching-plants','Manufacturing Plants','Batching'],
  ['Buildmate_09-Cranes-and-PEBs.pdf','Cranes & PEBs','cranes-and-pebs','Equipment & Structures','Equipment'],
  ['Buildmate_10-Mixers.pdf','Mixers','mixers','Equipment','Mixing'],
  ['Buildmate_11-Special-Projects.pdf','Special Projects','special-projects','Special Projects','Special Projects']
];

async function json(url, options = {}) {
  const res = await fetch(`${base}${url}`, options);
  const text = await res.text();
  let body; try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${url} -> ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

const authBody = await json('/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password,mode:'json'}) });
const token = authBody.data.access_token;
const headers = { Authorization:`Bearer ${token}` };

async function existing(slug) {
  const body = await json(`/items/brochures?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`, { headers });
  return body.data?.[0] || null;
}

async function existingFile(filename) {
  const body = await json(`/files?filter[filename_download][_eq]=${encodeURIComponent(filename)}&limit=1`, { headers });
  return body.data?.[0] || null;
}

async function pdfPageCount(filePath) {
  const buffer = await fs.readFile(filePath);
  const text = buffer.toString('latin1');
  const matches = text.match(/\/Type\s*\/Page\b/g);
  return matches?.length || null;
}

for (let index = 0; index < brochures.length; index++) {
  const [filename, title, slug, category, tag] = brochures[index];
  const filePath = path.join(brochureDir, filename);
  const file = await existingFile(filename) || await (async () => {
    const buffer = await fs.readFile(filePath);
    const form = new FormData();
    form.append('file', new Blob([buffer], { type:'application/pdf' }), filename);
    const uploaded = await fetch(`${base}/files`, { method:'POST', headers, body:form });
    if (!uploaded.ok) throw new Error(`PDF upload failed for ${filename}: ${uploaded.status} ${await uploaded.text()}`);
    return (await uploaded.json()).data;
  })();

  const pages = await pdfPageCount(filePath);
  const payload = {
    title,
    slug,
    category,
    tag,
    pdf:file.id,
    pages,
    version:'2026',
    status:'approved',
    sort:index + 1,
    featured:true,
    description:`Official BuildMate 2026 ${title} brochure.`
  };
  const old = await existing(slug);
  if (old) {
    await json(`/items/brochures/${old.id}`, { method:'PATCH', headers:{...headers,'Content-Type':'application/json'}, body:JSON.stringify(payload) });
    console.log(`Updated ${title}`);
  } else {
    await json('/items/brochures', { method:'POST', headers:{...headers,'Content-Type':'application/json'}, body:JSON.stringify(payload) });
    console.log(`Created ${title}`);
  }
}
