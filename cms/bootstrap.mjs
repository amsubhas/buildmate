import fs from 'node:fs/promises';

const base = process.env.DIRECTUS_URL || 'http://localhost:8055';
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
const schema = JSON.parse(await fs.readFile(new URL('./schema.json', import.meta.url), 'utf8'));

async function request(url, options = {}) {
  const res = await fetch(`${base}${url}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const text = await res.text();
  let body; try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${url} -> ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function login() {
  for (let attempt = 1; attempt <= 30; attempt++) {
    try {
      const body = await request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password, mode: 'json' }) });
      return body.data.access_token;
    } catch (error) {
      if (attempt === 30) throw error;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

const token = await login();
const auth = { Authorization: `Bearer ${token}` };
const allCollections = schema.collections.map(c => c.name);

async function getCollection(name) {
  const res = await fetch(`${base}/collections/${name}`, { headers: auth });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET /collections/${name} -> ${res.status}`);
  return (await res.json()).data;
}

for (const def of schema.collections) {
  if (await getCollection(def.name)) continue;
  await request('/collections', {
    method: 'POST', headers: auth,
    body: JSON.stringify({ collection: def.name, meta: { singleton: Boolean(def.singleton), icon: def.singleton ? 'business' : 'box', note: def.note }, schema: {} })
  });
}

const baseFields = [
  ['status', 'string', { interface: 'select-dropdown', choices: schema.workflow.map(v => ({ text: v[0].toUpperCase() + v.slice(1), value: v })), defaultValue: 'draft' }],
  ['sort', 'integer', { interface: 'input', defaultValue: 0 }],
  ['slug', 'string', { interface: 'input', note: 'Stable public URL slug.' }],
  ['seo_title', 'string', { interface: 'input', note: 'Optional SEO title.' }],
  ['seo_description', 'text', { interface: 'input-multiline', note: 'Optional SEO description.' }],
  ['og_image', 'uuid', { special: 'file', interface: 'file-image', note: 'Optional Open Graph image.' }]
];

const fields = {
  company: [
    ['name','string',{}],['legal_name','string',{}],['tagline','string',{}],['description','text',{interface:'input-rich-text-html'}],['website','string',{}],['email','string',{}],['phone','string',{}],['whatsapp','string',{}],['address','text',{}],['logo','uuid',{special:'file',interface:'file-image'}],['favicon','uuid',{special:'file',interface:'file-image'}]
  ],
  product_categories: [['name','string',{}],['description','text',{}],['sort','integer',{defaultValue:0}]],
  products: [
    ['category','uuid',{interface:'select-dropdown-m2o'}],['name','string',{}],['short_description','text',{}],['description','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}],['gallery','json',{interface:'list'}],['applications','json',{interface:'list'}],['features','json',{interface:'list'}],['capacity','string',{}],['raw_materials','text',{}],['process','text',{interface:'input-rich-text-html'}],['advantages','json',{interface:'list'}],['brochure','uuid',{interface:'select-dropdown-m2o'}]
  ],
  product_specifications: [['product','uuid',{interface:'select-dropdown-m2o'}],['parameter','string',{}],['value','string',{}],['unit','string',{}],['sort','integer',{defaultValue:0}]],
  solutions: [['name','string',{}],['type','string',{}],['short_description','text',{}],['description','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}]],
  projects: [['product','uuid',{interface:'select-dropdown-m2o'}],['name','string',{}],['client','string',{}],['location','string',{}],['country','string',{}],['project_type','string',{}],['capacity','string',{}],['raw_material','string',{}],['year','integer',{}],['description','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}],['gallery','json',{interface:'list'}],['coordinates','json',{interface:'input-code'}],['featured','boolean',{defaultValue:false}]],
  brochures: [['title','string',{}],['category','string',{}],['product','uuid',{interface:'select-dropdown-m2o'}],['cover','uuid',{special:'file',interface:'file-image'}],['pdf','uuid',{special:'file',interface:'file'}],['version','string',{defaultValue:'2026'}],['description','text',{}],['featured','boolean',{defaultValue:false}]],
  articles: [['product','uuid',{interface:'select-dropdown-m2o'}],['project','uuid',{interface:'select-dropdown-m2o'}],['title','string',{}],['excerpt','text',{}],['body','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}],['author','string',{}],['published_at','dateTime',{}]],
  news: [['title','string',{}],['excerpt','text',{}],['body','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}],['published_at','dateTime',{}]],
  events: [['title','string',{}],['event_name','string',{}],['location','string',{}],['start_date','dateTime',{}],['end_date','dateTime',{}],['description','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}]],
  faqs: [['question','string',{}],['answer','text',{interface:'input-rich-text-html'}],['product','uuid',{interface:'select-dropdown-m2o'}],['sort','integer',{defaultValue:0}]],
  downloads: [['title','string',{}],['type','string',{}],['description','text',{}],['file','uuid',{special:'file',interface:'file'}],['product','uuid',{interface:'select-dropdown-m2o'}]],
  customers: [['name','string',{}],['logo','uuid',{special:'file',interface:'file-image'}],['description','text',{}]],
  testimonials: [['customer','uuid',{interface:'select-dropdown-m2o'}],['quote','text',{}],['person_name','string',{}],['person_role','string',{}]],
  partners: [['name','string',{}],['logo','uuid',{special:'file',interface:'file-image'}],['website','string',{}],['description','text',{}]],
  careers: [['title','string',{}],['location','string',{}],['employment_type','string',{}],['description','text',{interface:'input-rich-text-html'}],['apply_url','string',{}],['closing_date','dateTime',{}]]
};

async function getField(collection, field) {
  const res = await fetch(`${base}/fields/${collection}/${field}`, { headers: auth });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET /fields/${collection}/${field} -> ${res.status}`);
  return (await res.json()).data;
}

async function createField(collection, [field, type, opts]) {
  if (await getField(collection, field)) return;
  const { interface: ui, defaultValue, choices, hidden, special, note, ...rest } = opts || {};
  const meta = { interface: ui, hidden: Boolean(hidden), ...(note ? { note } : {}), ...(choices ? { options: { choices } } : {}), ...rest };
  Object.keys(meta).forEach(k => meta[k] === undefined && delete meta[k]);
  const payload = { field, type, meta, schema: { is_nullable: !['name','title','question'].includes(field) } };
  if (defaultValue !== undefined) payload.schema.default_value = defaultValue;
  if (special) payload.special = special;
  await request(`/fields/${collection}`, { method:'POST', headers:auth, body:JSON.stringify(payload) });
}

for (const collection of allCollections) {
  if (collection !== 'company') for (const field of baseFields) await createField(collection, field);
  for (const field of fields[collection] || []) await createField(collection, field);
}

const relations = [
  ['products','category','product_categories'],['products','brochure','brochures'],['product_specifications','product','products'],['projects','product','products'],
  ['brochures','product','products'],['articles','product','products'],['articles','project','projects'],['faqs','product','products'],['downloads','product','products'],['testimonials','customer','customers']
];

async function relationExists(manyCollection, manyField) {
  const res = await fetch(`${base}/relations/${manyCollection}/${manyField}`, { headers: auth });
  if (res.status === 404) return false;
  if (!res.ok) throw new Error(`GET /relations/${manyCollection}/${manyField} -> ${res.status}`);
  return true;
}

for (const [many_collection, many_field, one_collection] of relations) {
  if (await relationExists(many_collection, many_field)) continue;
  await request('/relations', { method:'POST', headers:auth, body:JSON.stringify({ many_collection, many_field, one_collection, one_field:null, one_deselect_action:'nullify' }) });
}

console.log(`BuildMate Directus foundation ready: ${allCollections.length} collections and ${relations.length} content relations.`);
