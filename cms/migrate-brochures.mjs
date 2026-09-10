import fs from 'node:fs/promises';

const base = process.env.DIRECTUS_URL || 'http://localhost:8055';
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');

const brochures = JSON.parse(await fs.readFile(new URL('./brochure-sources.json', import.meta.url), 'utf8'));
const downloadDir = '/directus/tmp-brochures';
await fs.mkdir(downloadDir, { recursive: true });

async function json(url, options = {}) {
  const res = await fetch(`${base}${url}`, options);
  const text = await res.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${url} -> ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

const authBody = await json('/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, mode: 'json' })
});
const token = authBody.data.access_token;
const headers = { Authorization: `Bearer ${token}` };

async function existing(slug) {
  const body = await json(`/items/brochures?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`, { headers });
  return body.data?.[0] || null;
}

async function existingFile(filename) {
  const body = await json(`/files?filter[filename_download][_eq]=${encodeURIComponent(filename)}&limit=1`, { headers });
  return body.data?.[0] || null;
}

async function downloadPdf(url, filename) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`Official brochure download failed for ${filename}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 1000 || bytes.subarray(0, 5).toString('latin1') !== '%PDF-') {
    throw new Error(`Official brochure download was not a valid PDF for ${filename}`);
  }
  const filePath = `${downloadDir}/${filename}`;
  await fs.writeFile(filePath, bytes);
  return filePath;
}

function pdfPageCount(buffer) {
  const text = buffer.toString('latin1');
  return text.match(/\/Type\s*\/Page\b/g)?.length || null;
}

for (let index = 0; index < brochures.length; index++) {
  const source = brochures[index];
  const filename = source.filename.replace(/\.pdf$/i, '-Original-Website.pdf');
  const filePath = await downloadPdf(source.url, filename);
  const buffer = await fs.readFile(filePath);

  let file = await existingFile(filename);
  if (!file) {
    const form = new FormData();
    form.append('file', new Blob([buffer], { type: 'application/pdf' }), filename);
    const uploaded = await fetch(`${base}/files`, { method: 'POST', headers, body: form });
    if (!uploaded.ok) throw new Error(`PDF upload failed for ${source.title}: ${uploaded.status} ${await uploaded.text()}`);
    file = (await uploaded.json()).data;
  }

  const payload = {
    title: source.title,
    slug: source.slug,
    category: source.category,
    tag: source.tag,
    pdf: file.id,
    pages: pdfPageCount(buffer),
    version: 'Original Website',
    status: 'published',
    sort: index + 1,
    featured: true,
    description: `Original Buildmate website brochure: ${source.title}.`
  };

  const old = await existing(source.slug);
  if (old) {
    await json(`/items/brochures/${old.id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log(`Updated original brochure: ${source.title}`);
  } else {
    await json('/items/brochures', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log(`Created original brochure: ${source.title}`);
  }
}

console.log(`Original Buildmate website brochure migration complete: ${brochures.length} PDFs.`);
