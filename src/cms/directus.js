const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL?.replace(/\/$/, '');

/** Build a public Directus asset URL. No admin token belongs in the browser. */
export function cmsAsset(fileId, transformations = '') {
  if (!DIRECTUS_URL || !fileId) return '';
  return `${DIRECTUS_URL}/assets/${fileId}${transformations}`;
}

/** Read-only browser adapter for published BuildMate content. */
export async function cmsList(collection, params = {}) {
  if (!DIRECTUS_URL) throw new Error('VITE_DIRECTUS_URL is not configured');
  const url = new URL(`${DIRECTUS_URL}/items/${collection}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value));
  const response = await fetch(url);
  if (!response.ok) throw new Error(`CMS request failed: ${response.status}`);
  return response.json();
}

export async function cmsItem(collection, id, params = {}) {
  if (!DIRECTUS_URL) throw new Error('VITE_DIRECTUS_URL is not configured');
  const url = new URL(`${DIRECTUS_URL}/items/${collection}/${id}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value));
  const response = await fetch(url);
  if (!response.ok) throw new Error(`CMS request failed: ${response.status}`);
  return response.json();
}
