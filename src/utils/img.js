/**
 * Smart image resolver — always serves from /images/ (works when deployed to buildmate.in)
 * Falls back to external buildmate.in URL if local not found
 */
export const img = (filename) => `/images/${filename}`

export const imgFallback = (filename) =>
  `/images/${filename}`

// Unsplash industrial fallback
export const placeholder = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=60'
