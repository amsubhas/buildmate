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
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
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

async function listAll(path) {
  const body = await request(`${path}${path.includes('?') ? '&' : '?'}limit=-1`, { headers: auth });
  return body.data || [];
}

async function getCollection(name) {
  const rows = await listAll('/collections');
  return rows.find(item => item.collection === name) || null;
}

for (const def of schema.collections) {
  if (await getCollection(def.name)) continue;
  await request('/collections', {
    method: 'POST', headers: auth,
    body: JSON.stringify({
      collection: def.name,
      meta: { singleton: Boolean(def.singleton), icon: def.singleton ? 'business' : 'box', note: def.note },
      schema: {}
    })
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
    ['category','integer',{interface:'select-dropdown-m2o'}],['name','string',{}],['short_description','text',{}],['description','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}],['gallery','json',{interface:'list'}],['applications','json',{interface:'list'}],['features','json',{interface:'list'}],['capacity','string',{}],['raw_materials','text',{}],['process','text',{interface:'input-rich-text-html'}],['advantages','json',{interface:'list'}],['brochure','integer',{interface:'select-dropdown-m2o'}]
  ],
  product_specifications: [['product','integer',{interface:'select-dropdown-m2o'}],['parameter','string',{}],['value','string',{}],['unit','string',{}],['sort','integer',{defaultValue:0}]],
  solutions: [['name','string',{}],['type','string',{}],['short_description','text',{}],['description','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}]],
  projects: [['product','integer',{interface:'select-dropdown-m2o'}],['name','string',{}],['client','string',{}],['location','string',{}],['country','string',{}],['project_type','string',{}],['capacity','string',{}],['raw_material','string',{}],['year','integer',{}],['description','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}],['gallery','json',{interface:'list'}],['coordinates','json',{interface:'input-code'}],['featured','boolean',{defaultValue:false}]],
  brochures: [['title','string',{}],['category','string',{}],['product','integer',{interface:'select-dropdown-m2o'}],['cover','uuid',{special:'file',interface:'file-image'}],['pdf','uuid',{special:'file'}],['version','string',{defaultValue:'2026'}],['description','text',{}],['pages','integer',{interface:'input',note:'PDF page count.'}],['tag','string',{note:'Short merchandising label shown on the brochure card.'}],['featured','boolean',{defaultValue:false}]],
  articles: [['product','integer',{interface:'select-dropdown-m2o'}],['project','integer',{interface:'select-dropdown-m2o'}],['title','string',{}],['excerpt','text',{}],['body','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}],['author','string',{}],['published_at','dateTime',{}]],
  news: [['title','string',{}],['excerpt','text',{}],['body','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}],['published_at','dateTime',{}]],
  events: [['title','string',{}],['event_name','string',{}],['location','string',{}],['start_date','dateTime',{}],['end_date','dateTime',{}],['description','text',{interface:'input-rich-text-html'}],['hero_image','uuid',{special:'file',interface:'file-image'}]],
  faqs: [['question','string',{}],['answer','text',{interface:'input-rich-text-html'}],['product','integer',{interface:'select-dropdown-m2o'}],['sort','integer',{defaultValue:0}]],
  downloads: [['title','string',{}],['type','string',{}],['description','text',{}],['file','uuid',{special:'file',interface:'file'}],['product','integer',{interface:'select-dropdown-m2o'}]],
  customers: [['name','string',{}],['logo','uuid',{special:'file',interface:'file-image'}],['description','text',{}]],
  testimonials: [['customer','integer',{interface:'select-dropdown-m2o'}],['quote','text',{}],['person_name','string',{}],['person_role','string',{}]],
  partners: [['name','string',{}],['logo','uuid',{special:'file',interface:'file-image'}],['website','string',{}],['description','text',{}]],
  careers: [['title','string',{}],['location','string',{}],['employment_type','string',{}],['description','text',{interface:'input-rich-text-html'}],['apply_url','string',{}],['closing_date','dateTime',{}]]
};

async function getField(collection, field) {
  const body = await request(`/fields/${collection}`, { headers: auth });
  return body.data?.find(item => item.field === field) || null;
}

async function createField(collection, [field, type, opts]) {
  if (await getField(collection, field)) return;
  const { interface: ui, defaultValue, choices, hidden, special, note, ...rest } = opts || {};
  const meta = {
    interface: ui,
    hidden: Boolean(hidden),
    ...(note ? { note } : {}),
    ...(choices ? { options: { choices } } : {}),
    ...(special ? { special: Array.isArray(special) ? special : [special] } : {}),
    ...rest
  };
  Object.keys(meta).forEach(k => meta[k] === undefined && delete meta[k]);
  const payload = { field, type, meta, schema: { is_nullable: !['name','title','question'].includes(field) } };
  if (defaultValue !== undefined) payload.schema.default_value = defaultValue;
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

async function relationExists(collection, field, related_collection) {
  const body = await request('/relations?limit=-1', { headers: auth });
  return body.data?.some(item => item.collection === collection && item.field === field && item.related_collection === related_collection) || false;
}

for (const [collection, field, related_collection] of relations) {
  if (await relationExists(collection, field, related_collection)) continue;
  await request('/relations', { method:'POST', headers:auth, body:JSON.stringify({ collection, field, related_collection }) });
}

async function getPublicPolicy() {
  const policies = await listAll('/policies');
  return policies.find(item => item.name === 'Public') || policies.find(item => item.description === 'Public') || null;
}

async function ensurePublicRead(policyId, collection, permissions = null) {
  const permissionsRows = await listAll('/permissions');
  const existing = permissionsRows.find(item => item.policy === policyId && item.collection === collection && item.action === 'read');
  const payload = {
    policy: policyId,
    collection,
    action: 'read',
    permissions,
    validation: null,
    presets: null,
    fields: ['*']
  };
  if (existing) {
    await request(`/permissions/${existing.id}`, { method:'PATCH', headers:auth, body:JSON.stringify(payload) });
  } else {
    await request('/permissions', { method:'POST', headers:auth, body:JSON.stringify(payload) });
  }
}

const publicPolicy = await getPublicPolicy();
if (!publicPolicy?.id) throw new Error('Directus Public policy was not found');
await ensurePublicRead(publicPolicy.id, 'brochures', { status: { _eq: 'published' } });
await ensurePublicRead(publicPolicy.id, 'directus_files');

console.log(`BuildMate Directus foundation ready: ${allCollections.length} collections, ${relations.length} content relations, and public brochure/file read access.`);
