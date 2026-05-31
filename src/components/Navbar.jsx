import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollWithOffset } from '../utils/scroll'

const NAV = [
  { label:'Home', to:'/' },
  {
    label:'Who We Are', to:'/about',
    sub:[
      { label:'About Us',             to:'/about'            },
      { label:'What We Believe',      to:'/about#believe'    },
      { label:'Services',             to:'/services'         },
      { label:'Buildmate Advantages', to:'/about#advantages' },
      { label:'Facilities',           to:'/facilities'       },
      { label:'Innovation',           to:'/innovations'      },
      { label:'News & Events',        to:'/news'             },
      { label:'Company Details',      to:'/about#company'    },
    ]
  },
  {
    label:'Products', to:'/products',
    sub:[
      { label:'── PLANTS ──────────────', to:'/products', disabled:true },
      { label:'AAC Plants',                     to:'/products#aac'      },
      { label:'Precast  ›  Facades / Walls',    to:'/products#precast'  },
      { label:'PEB (Pre-Engineered Buildings)', to:'/products#peb'      },
      { label:'Carbon Capture Plants',           to:'/products#carbon'  },
      { label:'FCB Plants',                      to:'/products#fcb'     },
      { label:'── MATERIALS ───────────', to:'/products#materials', disabled:true },
      { label:'Lime',     to:'/products#materials' },
      { label:'Fly Ash',  to:'/products#materials' },
      { label:'── OTHER EQUIPMENT ─────', to:'/products', disabled:true },
      { label:'Stone Crushing Plants',    to:'/products#crushing' },
      { label:'Concrete Batching Plants', to:'/products#batching' },
      { label:'Dry Mix Mortar Plants',    to:'/products#drymix'   },
      { label:'Concrete Block Plants',    to:'/products#block'    },
      { label:'Cranes',           to:'/products#cranes'   },
      { label:'Mixers',           to:'/products#mixers'   },
      { label:'Special Projects', to:'/products#special'  },
    ]
  },
  {
    label:'Services', to:'/services',
    sub:[
      { label:'Unique R&D',        to:'/services#rd'           },
      { label:'AMC / Support',     to:'/services#amc'          },
      { label:'Training',          to:'/services#training'     },
      { label:'Custom Machinery',  to:'/services#custom'       },
      { label:'Plant Upgradation', to:'/services#upgradation'  },
      { label:'Modernization',     to:'/services#modernization'},
    ]
  },
  {
    label:'Projects', to:'/projects',
    sub:[
      { label:'Under Operation', to:'/projects#operation' },
      { label:'Under Execution', to:'/projects#execution' },
      { label:'Gallery Photos',  to:'/projects#gallery'   },
    ]
  },
  { label:'Customers', to:'/customers' },
  {
    label:'Contact Us', to:'/contact',
    sub:[
      { label:'Partner With Us', to:'/partner'      },
      { label:'Work With Us',    to:'/work-with-us' },
      { label:'Product Enquiry', to:'/contact'      },
    ]
  },
  { label:'Blog', to:'/blog' },
]

// Render a nav item — uses HashLink for anchor links, NavLink otherwise
function NavItem({ item, onClose, className }) {
  const isHash = item.to.includes('#')
  if (isHash) {
    return (
      <HashLink smooth scroll={scrollWithOffset} to={item.to} onClick={onClose} className={className}>
        {item.label}
      </HashLink>
    )
  }
  return (
    <NavLink to={item.to} onClick={onClose}
      className={({ isActive }) =>
        typeof className === 'function' ? className({ isActive }) : className
      }>
      {item.label}
    </NavLink>
  )
}

function Dropdown({ items, onClose }) {
  return (
    <motion.div
      initial={{ opacity:0, y:8, scale:0.97 }}
      animate={{ opacity:1, y:0, scale:1 }}
      exit={{ opacity:0, y:4, scale:0.97 }}
      transition={{ duration:0.18, ease:'easeOut' }}
      className="absolute top-full left-0 mt-1 glass border border-white/10 rounded-xl shadow-2xl min-w-[240px] py-2 z-50 max-h-[80vh] overflow-y-auto">
      {items.map((item, i) =>
        item.disabled ? (
          <div key={i} className="px-4 py-1.5 text-[10px] font-display tracking-widest text-slate-600 uppercase select-none border-t border-white/5 mt-1 first:border-0 first:mt-0">
            {item.label}
          </div>
        ) : (
          <NavItem key={i} item={item} onClose={onClose}
            className="block px-4 py-2 text-sm text-slate-300 hover:text-accent hover:bg-white/5 transition-colors font-display uppercase tracking-wide"/>
        )
      )}
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [activeDD, setActiveDD] = useState(null)
  const location = useLocation()
  const timer    = useRef(null)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive:true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setOpen(false); setActiveDD(null) }, [location])

  const enter = (label) => { clearTimeout(timer.current); setActiveDD(label) }
  const leave = () => { timer.current = setTimeout(() => setActiveDD(null), 140) }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-2xl' : 'bg-navy-900/80 backdrop-blur-md'
    } border-b border-white/5`}
    role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group" aria-label="Buildmate Home">
          <img src="https://www.buildmate.in/images/Buildmate_logo_rbg.png" alt="Buildmate Logo"
            className="h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
            loading="eager"
            onError={e => {
              e.target.style.display = 'none'
              e.target.nextElementSibling.style.display = 'flex'
            }}/>
          <div style={{display:'none'}} className="w-9 h-9 bg-gradient-to-br from-accent to-accent-dark items-center justify-center rounded-lg">
            <span className="font-display font-bold text-white">B</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-display font-bold text-white text-lg leading-none tracking-wide">
              BUILD<span className="text-gold">MATE</span>
            </div>
            <div className="text-[10px] text-slate-400 tracking-widest uppercase">Projects Pvt Ltd</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-0" aria-label="Main navigation">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.sub && enter(item.label)}
              onMouseLeave={leave}>
              <NavLink to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-1 px-2.5 py-2 text-[11px] font-display font-semibold uppercase tracking-wide rounded transition-colors whitespace-nowrap
                   ${isActive ? 'text-accent' : 'text-slate-300 hover:text-white'}`
                }>
                {item.label}
                {item.sub && (
                  <ChevronDown size={11}
                    className={`transition-transform duration-200 ${activeDD === item.label ? 'rotate-180' : ''}`}
                    aria-hidden="true"/>
                )}
              </NavLink>
              <AnimatePresence>
                {item.sub && activeDD === item.label && (
                  <Dropdown items={item.sub} onClose={() => setActiveDD(null)}/>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <a href="tel:+917675989961" className="text-slate-400 text-xs hover:text-accent transition-colors font-display">
            +91 7675 989 961
          </a>
          <Link to="/contact" className="btn-primary text-xs magnetic" aria-label="Get a Quote">
            Get Quote
          </Link>
        </div>

        <button onClick={() => setOpen(!open)}
          className="xl:hidden text-slate-300 p-2 hover:text-white transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu"
            initial={{ opacity:0, height:0 }}
            animate={{ opacity:1, height:'auto' }}
            exit={{ opacity:0, height:0 }}
            transition={{ duration:0.25, ease:'easeInOut' }}
            className="xl:hidden glass border-t border-white/5 overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-0.5 max-h-[75vh] overflow-y-auto">
              {NAV.map(item => (
                <div key={item.label}>
                  <NavLink to={item.to} onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2.5 rounded font-display uppercase tracking-wide text-sm font-semibold
                       ${isActive ? 'text-accent bg-accent/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`
                    }>
                    {item.label}
                  </NavLink>
                  {item.sub && (
                    <div className="ml-4 border-l border-white/10 pl-3 mb-1">
                      {item.sub.filter(s => !s.disabled).map((s, i) => (
                        <NavItem key={i} item={s} onClose={() => setOpen(false)}
                          className="block py-1.5 text-xs text-slate-400 hover:text-accent font-display uppercase tracking-wide transition-colors"/>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 mt-1">
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center text-sm">
                  Request Enquiry
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
