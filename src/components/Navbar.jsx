import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollWithOffset } from '../utils/scroll'

const NAV = [
  { label:'Home', to:'/' },
  { label:'About', to:'/about', sub:[
    { label:'About Us',             to:'/about'            },
    { label:'What We Believe',      to:'/about#believe'    },
    { label:'Services',             to:'/services'         },
    { label:'Buildmate Advantages', to:'/about#advantages' },
    { label:'Facilities',           to:'/facilities'       },
    { label:'Innovation',           to:'/innovations'      },
    { label:'News & Events',        to:'/news'             },
  ]},
  { label:'Products', to:'/products', sub:[
    { label:'AAC Plants',                     to:'/products#aac'      },
    { label:'Precast (Facades / Walls)',       to:'/products#precast'  },
    { label:'PEB Systems',                    to:'/products#peb'      },
    { label:'Carbon Capture Plants',           to:'/products#carbon'  },
    { label:'FCB Plants',                      to:'/products#fcb'     },
    { label:'Lime & Fly Ash',                  to:'/products#materials'},
    { label:'Stone Crushing Plants',    to:'/products#crushing' },
    { label:'Concrete Batching Plants', to:'/products#batching' },
    { label:'Dry Mix Mortar Plants',    to:'/products#drymix'   },
    { label:'Concrete Block Plants',    to:'/products#block'    },
    { label:'Cranes',           to:'/products#cranes'   },
    { label:'Mixers',           to:'/products#mixers'   },
  ]},
  { label:'Services', to:'/services', sub:[
    { label:'Unique R&D',        to:'/services#rd'           },
    { label:'AMC / Support',     to:'/services#amc'          },
    { label:'Training',          to:'/services#training'     },
    { label:'Custom Machinery',  to:'/services#custom'       },
    { label:'Plant Upgradation', to:'/services#upgradation'  },
    { label:'Modernization',     to:'/services#modernization'},
  ]},
  { label:'Projects', to:'/projects', sub:[
    { label:'Under Operation', to:'/projects#operation' },
    { label:'Under Execution', to:'/projects#execution' },
    { label:'Gallery',         to:'/projects#gallery'   },
  ]},
  { label:'Customers',  to:'/customers' },
  { label:'Brochures',  to:'/brochures' },
  { label:'Blog',       to:'/blog'      },
  { label:'News',       to:'/news'      },
  { label:'Contact',    to:'/contact', sub:[
    { label:'Partner With Us', to:'/partner'      },
    { label:'Work With Us',    to:'/work-with-us' },
    { label:'Product Enquiry', to:'/contact'      },
  ]},
]

function NavItem({ item, onClose, className }) {
  const isHash = item.to.includes('#')
  if (isHash) {
    return <HashLink smooth scroll={scrollWithOffset} to={item.to} onClick={onClose} className={className}>{item.label}</HashLink>
  }
  if (typeof className === 'function') {
    return <NavLink to={item.to} onClick={onClose} className={({ isActive }) => className({ isActive })}>{item.label}</NavLink>
  }
  return <NavLink to={item.to} onClick={onClose} className={className}>{item.label}</NavLink>
}

function Dropdown({ items, onClose }) {
  return (
    <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:4 }}
      transition={{ duration:0.16 }}
      className="absolute top-full left-0 mt-1 glass border border-white/10 rounded-xl shadow-2xl min-w-[220px] py-2 z-50 max-h-[75vh] overflow-y-auto">
      {items.map((item,i) => (
        <NavItem key={i} item={item} onClose={onClose}
          className="block px-4 py-2 text-xs text-slate-300 hover:text-[#D72D23] hover:bg-white/5 transition-colors font-display uppercase tracking-wider"/>
      ))}
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

  const enter = label => { clearTimeout(timer.current); setActiveDD(label) }
  const leave = () => { timer.current = setTimeout(() => setActiveDD(null), 150) }

  return (
    <header className={'sticky top-0 z-50 transition-all duration-300 border-b border-white/5 '+(scrolled?'glass shadow-xl':'bg-navy-900/90 backdrop-blur-md')} role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* ── Real BuildMate Logo ── */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group" aria-label="BuildMate Home">
          <div className="bg-white rounded-xl px-3 py-1.5 shadow-md group-hover:shadow-lg transition-all duration-300 flex items-center" style={{minWidth:130}}>
            <img
              src="/images/buildmate-logo.jpg"
              alt="BuildMate Projects Pvt Ltd"
              className="h-8 w-auto object-contain block"
              loading="eager"
              width="120" height="32"
              onError={e => { e.target.onerror=null; e.target.src='https://buildmate.in/images/Buildmate_logo_rbg.png' }}
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center" aria-label="Main navigation">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.sub && enter(item.label)}
              onMouseLeave={leave}>
              <NavLink to={item.to}
                className={({ isActive }) =>
                  'flex items-center gap-0.5 px-2.5 py-2 text-[11px] font-display font-semibold uppercase tracking-wide rounded transition-colors whitespace-nowrap '+
                  (isActive ? 'text-[#D72D23]' : 'text-slate-300 hover:text-white')
                }>
                {item.label}
                {item.sub && <ChevronDown size={10} className={'transition-transform '+(activeDD===item.label?'rotate-180':'')}/>}
              </NavLink>
              <AnimatePresence>
                {item.sub && activeDD===item.label && <Dropdown items={item.sub} onClose={() => setActiveDD(null)}/>}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <a href="tel:+917675989961" className="text-slate-400 text-xs hover:text-white transition-colors font-display">+91 7675 989 961</a>
          <Link to="/contact" className="btn-primary text-xs">Get Quote</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="xl:hidden text-slate-300 p-2" aria-label={open?'Close':'Open menu'}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:'auto' }} exit={{ opacity:0,height:0 }} transition={{ duration:0.25 }}
            className="xl:hidden glass border-t border-white/5 overflow-hidden">
            <div className="px-4 py-3 flex flex-col max-h-[75vh] overflow-y-auto">
              {NAV.map(item => (
                <div key={item.label}>
                  <NavLink to={item.to} onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      'block px-3 py-2.5 rounded font-display uppercase tracking-wide text-sm font-semibold '+
                      (isActive ? 'text-[#D72D23] bg-red-DEFAULT/10' : 'text-slate-300 hover:text-white hover:bg-white/5')
                    }>
                    {item.label}
                  </NavLink>
                  {item.sub && (
                    <div className="ml-4 border-l border-white/10 pl-3 mb-1">
                      {item.sub.map((s,i) => (
                        <NavItem key={i} item={s} onClose={() => setOpen(false)}
                          className="block py-1.5 text-xs text-slate-400 hover:text-[#D72D23] font-display uppercase tracking-wide transition-colors"/>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 mt-2">
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center text-sm">Request Enquiry</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
