import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Blog', to: '/blog' },
  { label: 'News & Events', to: '/news' },
  { label: 'Partner', to: '/partner' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-2xl' : 'bg-navy-900/80 backdrop-blur-md'} border-b border-white/5`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center"
            style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }}>
            <span className="text-white font-display font-bold text-sm">B</span>
          </div>
          <div>
            <div className="font-display font-bold text-white text-lg leading-none tracking-wide">
              BUILD<span className="text-gold">MATE</span>
            </div>
            <div className="text-[10px] text-slate-400 tracking-widest uppercase">Projects Pvt Ltd</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm font-medium font-display uppercase tracking-wide rounded transition-colors ${isActive ? 'text-accent' : 'text-slate-300 hover:text-white'}`
              }>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <a href="tel:+917675989961" className="text-slate-300 text-sm hover:text-accent transition-colors font-display">
            +91 7675 989 961
          </a>
          <Link to="/contact" className="btn-primary text-xs">Get Quote</Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="xl:hidden text-slate-300 p-2" aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden glass border-t border-white/5 overflow-hidden">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(l => (
                <NavLink key={l.to} to={l.to}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded font-display uppercase tracking-wide text-sm font-medium ${isActive ? 'text-accent bg-accent/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`
                  }>
                  {l.label}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-white/10 mt-2">
                <Link to="/contact" className="btn-primary w-full justify-center">Get Quote</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
