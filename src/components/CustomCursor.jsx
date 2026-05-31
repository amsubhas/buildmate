import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const target  = useRef({ x: -100, y: -100 })
  const raf     = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const onDown = () => { setClicked(true)  }
    const onUp   = () => { setClicked(false) }

    // Smooth ring follow
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.11
      pos.current.y += (target.current.y - pos.current.y) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.x + 'px'
        ringRef.current.style.top  = pos.current.y + 'px'
      }
      raf.current = requestAnimationFrame(animate)
    }

    // Delegate hover detection
    const enter = () => setHovered(true)
    const leave = () => setHovered(false)

    const addListeners = () => {
      document.querySelectorAll(
        'a, button, .card-hover, .tilt-card, [role="button"], input, select, textarea'
      ).forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf.current = requestAnimationFrame(animate)

    // Re-run after short delay so dynamic elements are mounted
    const t1 = setTimeout(addListeners, 500)
    const t2 = setTimeout(addListeners, 2000)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf.current)
      clearTimeout(t1); clearTimeout(t2)
    }
  }, [])

  return (
    <>
      <div ref={ringRef}
        className={`cursor-ring ${hovered ? 'hovered' : ''} ${clicked ? 'clicked' : ''}`}
        aria-hidden="true"/>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true"/>
    </>
  )
}
