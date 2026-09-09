/**
 * Buildmate local asset resolver.
 * Keep production rendering self-contained so missing external assets cannot
 * silently introduce unrelated imagery or deployment-time CORS/MIME issues.
 */
export const img = (filename) => `/images/${filename}`
export const imgFallback = (filename) => `/images/${filename}`
