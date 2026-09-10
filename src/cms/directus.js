const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL?.replace(/\/$/, '');

export const cmsConfigured = Boolean(DIRECTUS_URL);

/** Build a public Directus asset URL. No admin token belongs in the browser. */
export function cmsAsset(fileId, transformations = '') {
  if (!DIRECTUS_URL || !fileId) return '';
  return `${DIRECTUS_URL}/assets/${fileId}${transformations}`;
}

function buildUrl(collection, id = '') {
  if (!DIRECTUS_URL) throw new Error('VITE_DIRECTUS_URL is not configured');
  return new URL(`${DIRECTUS_URL}/items/${collection}${id ? `/${id}` : ''}`);
}

/** Read-only browser adapter. Public requests are restricted to published content by default. */
export async function cmsList(collection, params = {}, { publishedOnly = true } = {}) {
  const url = buildUrl(collection);
  const query = { ...params };
  if (publishedOnly && query['filter[status][_eq]'] === undefined) {
    query['filter[status][_eq]'] = 'published';
  }
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`CMS request failed: ${response.status}`);
  return response.json();
}

export async function cmsItem(collection, id, params = {}, { publishedOnly = true } = {}) {
  const url = buildUrl(collection, id);
  const query = { ...params };
  if (publishedOnly && query['filter[status][_eq]'] === undefined) {
    query['filter[status][_eq]'] = 'published';
  }
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`CMS request failed: ${response.status}`);
  return response.json();
}
