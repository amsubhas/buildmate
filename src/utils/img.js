/**
 * Smart image resolver — loads from buildmate.in (canonical image CDN)
 * Falls back to local /images/ path, then to Unsplash placeholder.
 */
const CDN = 'https://buildmate.in/images'

export const img = (filename) => `${CDN}/${filename}`

export const imgFallback = (filename) => `/images/${filename}`

// Unsplash industrial fallback
export const placeholder = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=60'
