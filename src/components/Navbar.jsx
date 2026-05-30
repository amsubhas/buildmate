import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'Who We Are', to: '/about',
    sub: [
      { label: 'About Us', to: '/about' },
      { label: 'What We Believe', to: '/about#believe' },
      { label: 'Services', to: '/services' },
      { label: 'Buildmate Advantages', to: '/about#advantages' },
      { label: 'Facilities', to: '/facilities' },
      { label: 'Innovation', to: '/innovations' },
      { label: 'News & Events', to: '/news' },
      { label: 'Company Details', to: '/about#company' },
    ]
  },
  {
    label: 'Products', to: '/products',
    sub: [
      { label: 'AAC Plants', to: '/products#aac' },
      { label: 'Stone Crushing Plants', to: '/products#crushing' },
      { label: 'Concrete Batching Plants', to: '/products#batching' },
      { label: 'Dry Mix Mortar Plants', to: '/products#drymix' },
      { label: 'Precast Concrete Plants', to: '/products#precast' },
      { label: 'Concrete Block / Brick Plants', to: '/products#block' },
      { label: 'Cranes', to: '/products#cranes' },
      { label: 'Mixers', to: '/products#mixers' },
      { label: 'PEB (Pre Engineered Buildings)', to: '/products#peb' },
      { label: 'Special Projects', to: '/products#special' },
    ]
  },
  {
    label: 'Projects', to: '/projects',
    sub: [
      { label: 'Under Operation', to: '/projects#operation' },
      { label: 'Under Execution', to: '/projects#execution' },
      { label: 'Gallery Photos', to: '/projects#gallery' },
    ]
  },
  { label: 'Customers', to: '/customers' },
  {
    label: 'Contact Us', to: '/contact',
    sub: [
      { label: 'Partner With Us', to: '/partner' },
      { label: 'Work With Us', to: '/work-with-us' },
      { label: 'Product Enquiry', to: '/contact' },
    ]
  },
  { label: 'Blog', to: '/blog' },
]

function Dropdown({ items, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full left-0 mt-1 glass border border-white/10 rounded-xl shadow-2xl min-w-[220px] py-2 z-50">
      {items.map(item => (
        <NavLink key={item.to} to={item.to} onClick={onClose}
          className="block px-4 py-2 text-sm text-slate-300 hover:text-accent hover:bg-white/5 transition-colors font-display uppercase tracking-wide">
          {item.label}
        </NavLink>
      ))}
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const timerRef = useRef(null)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setOpen(false); setActiveDropdown(null) }, [location])

  const handleMouseEnter = (label) => {
    clearTimeout(timerRef.current)
    setActiveDropdown(label)
  }
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-2xl' : 'bg-navy-900/80 backdrop-blur-md'} border-b border-white/5`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src="https://buildmate.in/images/Buildmate_logo_rbg.png" alt="Buildmate Logo"
            className="h-10 w-auto object-contain" onError={e => { e.target.style.display='none' }}/>
          <div className="hidden sm:block">
            <div className="font-display font-bold text-white text-lg leading-none tracking-wide">
              BUILD<span className="text-gold">MATE</span>
            </div>
            <div className="text-[10px] text-slate-400 tracking-widest uppercase">Projects Pvt Ltd</div>
          </div>
        </Link>

        {/* Desktop */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.sub && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}>
              <NavLink to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-2 text-xs font-display font-medium uppercase tracking-wide rounded transition-colors ${isActive ? 'text-accent' : 'text-slate-300 hover:text-white'}`
                }>
                {item.label}
                {item.sub && <ChevronDown size={12} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`}/>}
              </NavLink>
              <AnimatePresence>
                {item.sub && activeDropdown === item.label && (
                  <Dropdown items={item.sub} onClose={() => setActiveDropdown(null)}/>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <a href="tel:+917675989961" className="text-slate-400 text-xs hover:text-accent transition-colors font-display">+91 7675 989 961</a>
          <Link to="/contact" className="btn-primary text-xs">Get Quote</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="xl:hidden text-slate-300 p-2" aria-label="Toggle menu">
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            className="xl:hidden glass border-t border-white/5 overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-0.5 max-h-[75vh] overflow-y-auto">
              {NAV.map(item => (
                <div key={item.label}>
                  <NavLink to={item.to}
                    className={({ isActive }) =>
                      `block px-3 py-2.5 rounded font-display uppercase tracking-wide text-sm font-medium ${isActive ? 'text-accent bg-accent/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`
                    }>
                    {item.label}
                  </NavLink>
                  {item.sub && (
                    <div className="ml-4 border-l border-white/10 pl-3 mb-1">
                      {item.sub.map(s => (
                        <NavLink key={s.to} to={s.to}
                          className="block py-1.5 text-xs text-slate-400 hover:text-accent font-display uppercase tracking-wide transition-colors">
                          {s.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 mt-1">
                <Link to="/contact" className="btn-primary w-full justify-center text-sm">Request Enquiry</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
