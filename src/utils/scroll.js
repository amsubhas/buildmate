// Smooth scroll with offset for sticky header (80px)
export const scrollWithOffset = (el) => {
  if (!el) return
  const y = el.getBoundingClientRect().top + window.pageYOffset - 84
  window.scrollTo({ top: y, behavior: 'smooth' })
}
