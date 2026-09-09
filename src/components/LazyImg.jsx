import { useState, useRef, useEffect } from 'react'
export default function LazyImg({ src, alt='', className='', style, priority=false, ...props }) {
  const [loaded, setLoaded] = useState(false)
  const [lvl, setLvl]       = useState(0)
  const [vis, setVis]       = useState(priority)
  const ref = useRef(null)
  useEffect(() => {
    if (priority) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { rootMargin:'300px' })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [priority])
  const getSrc = () => lvl === 0 ? src : null
  const activeSrc = getSrc()
  return (
    <div ref={ref} className={'relative overflow-hidden ' + className} style={style}>
      {!loaded && lvl < 1 && <div className="absolute inset-0 skeleton"/>}
      {lvl >= 1 && (
        <div className="absolute inset-0 bg-navy-800 flex items-center justify-center">
          <div className="text-center opacity-25"><div className="text-3xl mb-1">🏭</div><div className="text-[10px] text-slate-500 font-display uppercase tracking-wide">{alt}</div></div>
        </div>
      )}
      {vis && activeSrc && (
        <img src={activeSrc} alt={alt} loading={priority?'eager':'lazy'} decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => { setLvl(1); setLoaded(false) }}
          className={'w-full h-full object-cover transition-opacity duration-500 '+(loaded?'opacity-100':'opacity-0')}
          {...props}/>
      )}
    </div>
  )
}
