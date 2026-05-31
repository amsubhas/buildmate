/**
 * Smart image resolver — loads from www.buildmate.in (canonical image CDN)
 * Falls back to Unsplash placeholder if image is unavailable.
 */
const CDN = 'https://www.buildmate.in/images'

export const img = (filename) => `${CDN}/${filename}`

export const imgFallback = (filename) => `${CDN}/${filename}`

// Unsplash industrial fallback
export const placeholder = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=60'
