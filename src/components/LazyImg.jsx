import { useState, useRef, useEffect } from 'react'

const CDN_BASE = 'https://buildmate.in/images'

// Given any /images/<file> src, return the buildmate.in CDN version
function cdnSrc(src) {
  if (!src) return src
  const match = src.match(/\/images\/(.+)$/)
  if (match) return `${CDN_BASE}/${match[1]}`
  return src
}

export default function LazyImg({ src, alt, className, fallbackSrc, style, ...props }) {
  const [loaded,  setLoaded]  = useState(false)
  const [errorCount, setErrorCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin: '200px' }
    )
    if (imgRef.current) obs.observe(imgRef.current)
    return () => obs.disconnect()
  }, [])

  // Fallback chain: src → CDN version → fallbackSrc → Unsplash placeholder
  let actualSrc = src
  if (errorCount === 1) actualSrc = cdnSrc(src) !== src ? cdnSrc(src) : (fallbackSrc || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=60')
  if (errorCount >= 2) actualSrc = fallbackSrc || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=60'

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className || ''}`} style={style}>
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 skeleton"/>
      )}
      {visible && (
        <img src={actualSrc} alt={alt}
          loading="lazy" decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrorCount(c => c + 1)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}/>
      )}
    </div>
  )
}
