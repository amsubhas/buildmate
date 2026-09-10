const base = process.env.DIRECTUS_URL || 'http://localhost:8055';
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');

async function request(url, options = {}) {
  const response = await fetch(`${base}${url}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const text = await response.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!response.ok) throw new Error(`${options.method || 'GET'} ${url} -> ${response.status}: ${JSON.stringify(body)}`);
  return body;
}

const authBody = await request('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password, mode: 'json' }),
});
const token = authBody.data.access_token;
const auth = { Authorization: `Bearer ${token}` };

const rolesBody = await request('/roles?filter[name][_eq]=Public&limit=1&fields=id,name,policies', { headers: auth });
const publicRole = rolesBody.data?.[0];
if (!publicRole) throw new Error('Built-in Public role was not found');

const policyName = 'BuildMate Public Read';
const policiesBody = await request(`/policies?filter[name][_eq]=${encodeURIComponent(policyName)}&limit=1&fields=id,name,roles`, { headers: auth });
let policy = policiesBody.data?.[0];

if (!policy) {
  policy = (await request('/policies', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      name: policyName,
      icon: 'public',
      description: 'Read-only access for published BuildMate website content and required assets.',
      admin_access: false,
      app_access: false,
    }),
  })).data;
}

const rolePolicies = Array.isArray(publicRole.policies) ? publicRole.policies : [];
if (!rolePolicies.includes(policy.id)) {
  await request(`/roles/${publicRole.id}`, {
    method: 'PATCH',
    headers: auth,
    body: JSON.stringify({ policies: [...rolePolicies, policy.id] }),
  });
}

const permissionBody = await request(`/permissions?filter[policy][_eq]=${encodeURIComponent(policy.id)}&limit=-1`, { headers: auth });
const existing = new Map((permissionBody.data || []).map((item) => [`${item.collection}:${item.action}`, item]));

const publishedCollections = [
  'products',
  'product_specifications',
  'solutions',
  'projects',
  'brochures',
  'articles',
  'news',
  'events',
  'faqs',
  'downloads',
  'customers',
  'testimonials',
  'partners',
  'careers',
];
const unrestrictedCollections = ['company', 'product_categories'];

for (const collection of publishedCollections) {
  if (existing.has(`${collection}:read`)) continue;
  await request('/permissions', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      policy: policy.id,
      collection,
      action: 'read',
      permissions: { status: { _eq: 'published' } },
      validation: null,
      presets: null,
      fields: ['*'],
    }),
  });
}

for (const collection of unrestrictedCollections) {
  if (existing.has(`${collection}:read`)) continue;
  await request('/permissions', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      policy: policy.id,
      collection,
      action: 'read',
      permissions: null,
      validation: null,
      presets: null,
      fields: ['*'],
    }),
  });
}

if (!existing.has('directus_files:read')) {
  await request('/permissions', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      policy: policy.id,
      collection: 'directus_files',
      action: 'read',
      permissions: null,
      validation: null,
      presets: null,
      fields: ['id', 'storage', 'filename_disk', 'filename_download', 'title', 'type', 'filesize', 'width', 'height', 'modified_on'],
    }),
  });
}

console.log(`Public website access ready: policy '${policyName}' attached to Public with published-only content and asset read access.`);
