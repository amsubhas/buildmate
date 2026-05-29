import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ChevronRight, Award, Globe, Cpu, Layers,
  Shield, TrendingUp, Settings, Users, Phone, Download
} from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:'easeOut'}} }
const FC = { hidden:{opacity:0}, visible:{opacity:1,transition:{duration:0.8}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }
const VP = { once:true, margin:'-80px' }

// ── DATA ──────────────────────────────────────────────
const SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1581092160607-ee67df1d9d52?w=1920&q=80',
    tag: 'Engineering Excellence',
    h1: 'Accelerate Concept To Commissioning',
    sub: 'End-to-end industrial plant solutions trusted by clients across 20+ countries.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
    tag: 'Quality & Innovation',
    h1: 'Focus On Quality & Innovation',
    sub: 'Precision engineering, advanced manufacturing, and R&D-driven product development.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1920&q=80',
    tag: 'Sustainability',
    h1: 'Most Environment Friendly & Sustainable Solutions',
    sub: 'Green manufacturing technologies that reduce carbon footprint without compromising performance.',
  },
]

const PRODUCTS = [
  { name:'AAC Plants', desc:'Autoclaved Aerated Concrete manufacturing plants with full automation', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80' },
  { name:'Stone Crushing Plants', desc:'Heavy-duty rock and aggregate crushing systems for construction', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80' },
  { name:'Concrete Batching Plants', desc:'High-output ready-mix concrete batching with precise metering', img:'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80' },
  { name:'Dry Mix Mortar Plants', desc:'Automated dry-mix production for tile adhesives, plastering & grouting', img:'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80' },
  { name:'Precast Concrete Plants', desc:'Precision precast element manufacturing for faster construction', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80' },
  { name:'Concrete Block Plants', desc:'High-speed hollow & solid block manufacturing systems', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80' },
  { name:'Cranes', desc:'Industrial overhead, gantry and jib cranes for plant operations', img:'https://images.unsplash.com/photo-1517630800677-932d836ab680?w=500&q=80' },
  { name:'Mixers', desc:'Heavy-duty planetary, twin-shaft and pan mixers for all applications', img:'https://images.unsplash.com/photo-1581092160607-ee67df1d9d52?w=500&q=80' },
  { name:'PEB Systems', desc:'Pre-Engineered Building steel structures for rapid industrial deployment', img:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80' },
  { name:'Special Projects', desc:'Bespoke plant solutions and custom industrial engineering projects', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80' },
]

const WHY = [
  { icon:Award, title:'30+ Years Experience', desc:'Decades of engineering expertise delivering world-class industrial solutions.' },
  { icon:Layers, title:'Turnkey Solutions', desc:'Complete project delivery from concept, design, manufacturing to commissioning.' },
  { icon:Cpu, title:'Manufacturing Excellence', desc:'In-house CNC fabrication with ISO-certified quality assurance processes.' },
  { icon:Globe, title:'Global Installations', desc:'Successful plant commissionings across 20+ countries and 5 continents.' },
  { icon:TrendingUp, title:'R&D Focus', desc:'Dedicated research and development driving continuous product innovation.' },
  { icon:Shield, title:'Sustainability', desc:'Eco-friendly manufacturing technologies for a greener future.' },
]

const SERVICES_P = [
  { icon:Settings, title:'Engineering Consultancy', desc:'Expert guidance from concept to commissioning.' },
  { icon:Layers, title:'Turnkey Solutions', desc:'Complete plant setup with end-to-end ownership.' },
  { icon:TrendingUp, title:'Plant Modernization', desc:'Upgrade existing facilities to modern standards.' },
  { icon:Shield, title:'AMC Support', desc:'Annual maintenance contracts with guaranteed uptime.' },
  { icon:Users, title:'Training Programs', desc:'Operator and management training for plant teams.' },
  { icon:Cpu, title:'Capacity Optimization', desc:'Maximize throughput with process engineering.' },
]

const STATS = [
  { num:'30+', label:'Years Experience' },
  { num:'500+', label:'Plants Installed' },
  { num:'20+', label:'Countries Served' },
  { num:'98%', label:'Client Satisfaction' },
]

const TESTIMONIALS = [
  { name:"Rajiv Mehta", role:"MD, Mehta Constructions", text:"Buildmate delivered our AAC plant on schedule with exceptional quality. Their technical support is outstanding." },
  { name:"Ahmed Al-Farsi", role:"Director, Gulf Construction LLC", text:"The precast plant exceeded our production targets by 20%. World-class engineering from a reliable partner." },
  { name:"Priya Sharma", role:"Plant Head, EcoBuild Industries", text:"Buildmate automation systems transformed our dry mix plant efficiency completely." },
]

const NEWS_ITEMS = [
  { cat:'Exhibition', title:'Buildmate at EXCON 2024 – Bangalore', date:'Nov 2024', img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80' },
  { cat:'Product Launch', title:'Next-Gen AAC Plant Series Unveiled', date:'Oct 2024', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80' },
  { cat:'Industry Event', title:'Smart Manufacturing Summit 2024 – Hyderabad', date:'Sep 2024', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80' },
]

const BLOG_ITEMS = [
  { cat:'AAC Technology', title:'How AAC Blocks Are Revolutionizing Green Construction', date:'Dec 2024', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80' },
  { cat:'Precast Systems', title:'Benefits of Precast Concrete in Modern Infrastructure', date:'Nov 2024', img:'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80' },
  { cat:'Automation', title:'Industry 4.0 in Concrete Plant Manufacturing', date:'Oct 2024', img:'https://images.unsplash.com/photo-1581092160607-ee67df1d9d52?w=500&q=80' },
]

// ── HERO ──────────────────────────────────────────────
function HeroSection() {
  const [cur, setCur] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c+1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])
  const s = SLIDES[cur]
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.div key={cur}
          initial={{ opacity:0, scale:1.04 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
          transition={{ duration:1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${s.bg}')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div key={`c-${cur}`} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.6 }}>
            <p className="section-label mb-3">{s.tag}</p>
            <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl text-white max-w-3xl mb-5 leading-tight">
              {s.h1}
            </h1>
            <p className="text-slate-300 text-lg max-w-xl mb-8 leading-relaxed">{s.sub}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary text-sm">Get Free Consultation <ArrowRight size={16}/></Link>
              <Link to="/products" className="btn-outline text-sm">Explore Products</Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex gap-2 mt-10">
          {SLIDES.map((_,i) => (
            <button key={i} onClick={() => setCur(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i===cur ? 'w-8 bg-accent' : 'w-4 bg-white/30'}`} />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-navy-900/80 backdrop-blur-md border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
          {STATS.map(s => (
            <div key={s.label} className="py-4 px-6 text-center">
              <div className="font-display font-bold text-2xl text-accent">{s.num}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PRODUCTS SECTION ──────────────────────────────────
function ProductsSection() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-2">Our Portfolio</p>
          <h2 className="section-title text-4xl text-white mb-3">Industrial Plant Solutions</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">From raw material processing to finished product manufacturing — comprehensive turnkey solutions for every industry.</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {PRODUCTS.map(p => (
            <motion.div key={p.name} variants={FV}
              className="group relative overflow-hidden rounded-lg border border-white/5 bg-navy-800 card-hover cursor-pointer">
              <div className="h-40 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"/>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/60 to-transparent"/>
              </div>
              <div className="p-4 relative z-10">
                <h3 className="font-display font-semibold text-white text-sm mb-1 leading-tight">{p.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{p.desc}</p>
                <Link to="/products" className="text-accent text-xs font-display font-semibold uppercase tracking-wide flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More <ChevronRight size={12}/>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-8">
          <Link to="/products" className="btn-outline">View All Products <ArrowRight size={15}/></Link>
        </div>
      </div>
    </section>
  )
}

// ── ABOUT SECTION ─────────────────────────────────────
function AboutSection() {
  return (
    <section className="py-20 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label mb-3">About Buildmate</p>
            <h2 className="section-title text-4xl text-white mb-5">Engineering Excellence Since 1990s</h2>
            <p className="text-slate-400 leading-relaxed mb-4">Buildmate Projects Pvt Ltd is a premier industrial engineering company headquartered in Hyderabad, India. With three decades of experience, we deliver world-class manufacturing plant solutions across Asia, Africa, and the Middle East.</p>
            <p className="text-slate-400 leading-relaxed mb-6">Our in-house manufacturing facility in Gundlapochampally, Hyderabad spans thousands of square meters of state-of-the-art CNC infrastructure, enabling us to deliver precision-engineered plant equipment with unmatched quality.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[['500+ Plants','Installed globally'],['30+ Years','Engineering experience'],['20+ Countries','Global presence'],['ISO Certified','Quality assured']].map(([n,l]) => (
                <div key={n} className="p-4 bg-navy-800 rounded-lg border border-white/5">
                  <div className="font-display font-bold text-xl text-accent mb-1">{n}</div>
                  <div className="text-xs text-slate-400">{l}</div>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-primary">Know More <ArrowRight size={15}/></Link>
          </motion.div>
          <motion.div className="relative" variants={FC} initial="hidden" whileInView="visible" viewport={VP}>
            <div className="rounded-xl overflow-hidden border border-white/10 h-[420px]">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80" alt="Buildmate Facility" className="w-full h-full object-cover opacity-70"/>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent rounded-xl"/>
            </div>
            <div className="absolute -bottom-4 -left-4 glass p-4 rounded-xl border border-accent/20">
              <div className="font-display font-bold text-3xl text-accent mb-1">2000+</div>
              <div className="text-xs text-slate-300">Crore INR Project Value</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── WHY CHOOSE ────────────────────────────────────────
function WhyChooseSection() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-2">Why Choose Us</p>
          <h2 className="section-title text-4xl text-white mb-3">The Buildmate Advantage</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Industry-leading capabilities that set us apart from the competition.</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {WHY.map(w => (
            <motion.div key={w.title} variants={FV}
              className="p-6 bg-navy-800 rounded-xl border border-white/5 card-hover group">
              <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <w.icon size={22} className="text-accent"/>
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-2">{w.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── SERVICES PREVIEW ──────────────────────────────────
function ServicesSection() {
  return (
    <section className="py-20 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label mb-2">Services</p>
            <h2 className="section-title text-4xl text-white">What We Offer</h2>
          </motion.div>
          <Link to="/services" className="btn-outline shrink-0">All Services <ArrowRight size={15}/></Link>
        </div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {SERVICES_P.map(s => (
            <motion.div key={s.title} variants={FV}
              className="group p-6 bg-navy-800 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"/>
              <div className="w-10 h-10 rounded-lg bg-navy-700 flex items-center justify-center mb-4">
                <s.icon size={18} className="text-accent"/>
              </div>
              <h3 className="font-display font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── GLOBAL PRESENCE ───────────────────────────────────
function GlobalSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950"/>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png)', backgroundSize:'cover', backgroundPosition:'center', filter:'invert(1)' }}/>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-14" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-2">Global Presence</p>
          <h2 className="section-title text-4xl text-white mb-3">Trusted Across the Globe</h2>
          <p className="text-slate-400 max-w-xl mx-auto">From South Asia to the Middle East, Africa and beyond — Buildmate's solutions power industrial growth worldwide.</p>
        </motion.div>
        <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {[['500+','Plants Commissioned'],['20+','Countries Served'],['30+','Years of Excellence'],['1000+','Satisfied Clients']].map(([n,l]) => (
            <motion.div key={l} variants={FV} className="glass rounded-xl p-6 text-center">
              <div className="font-display font-bold text-4xl text-accent mb-2">{n}</div>
              <div className="text-slate-300 text-sm uppercase tracking-wide font-display">{l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ──────────────────────────────────────
function TestimonialsSection() {
  const [cur, setCur] = useState(0)
  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-2">Testimonials</p>
          <h2 className="section-title text-4xl text-white">What Our Clients Say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t,i) => (
            <motion.div key={i} variants={FV} initial="hidden" whileInView="visible" viewport={VP}
              style={{ transitionDelay: `${i*0.1}s` }}
              className="p-6 bg-navy-800 rounded-xl border border-white/5 card-hover">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_,i) => <span key={i} className="text-gold text-sm">★</span>)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center font-display font-bold text-white text-sm">
                  {t.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── NEWS ──────────────────────────────────────────────
function NewsSection() {
  return (
    <section className="py-20 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label mb-2">News & Events</p>
            <h2 className="section-title text-4xl text-white">Latest Updates</h2>
          </motion.div>
          <Link to="/news" className="btn-outline shrink-0">All News <ArrowRight size={15}/></Link>
        </div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {NEWS_ITEMS.map(n => (
            <motion.div key={n.title} variants={FV}
              className="group bg-navy-800 rounded-xl overflow-hidden border border-white/5 card-hover cursor-pointer">
              <div className="h-44 overflow-hidden">
                <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"/>
              </div>
              <div className="p-5">
                <span className="text-xs font-display uppercase tracking-wider text-gold">{n.cat}</span>
                <h3 className="text-white font-display font-semibold mt-1 mb-2 leading-tight">{n.title}</h3>
                <p className="text-slate-400 text-xs">{n.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── BLOG ──────────────────────────────────────────────
function BlogSection() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label mb-2">Blog</p>
            <h2 className="section-title text-4xl text-white">Insights & Knowledge</h2>
          </motion.div>
          <Link to="/blog" className="btn-outline shrink-0">View Blog <ArrowRight size={15}/></Link>
        </div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {BLOG_ITEMS.map(b => (
            <motion.div key={b.title} variants={FV}
              className="group bg-navy-800 rounded-xl overflow-hidden border border-white/5 card-hover cursor-pointer">
              <div className="h-44 overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"/>
              </div>
              <div className="p-5">
                <span className="text-xs font-display uppercase tracking-wider text-accent">{b.cat}</span>
                <h3 className="text-white font-display font-semibold mt-1 mb-2 leading-tight">{b.title}</h3>
                <p className="text-slate-400 text-xs">{b.date}</p>
                <Link to="/blog" className="mt-3 text-accent text-xs font-display font-semibold uppercase tracking-wide flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ChevronRight size={12}/>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── CONTACT CTA ───────────────────────────────────────
function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-gradient-radial from-accent/30 to-transparent"/>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-3">Get Started</p>
          <h2 className="section-title text-4xl sm:text-5xl text-white mb-5">Ready to Commission Your Plant?</h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">Speak with our engineering team today. We deliver from concept to commissioning — worldwide.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">Request Consultation <ArrowRight size={16}/></Link>
            <a href="#" className="btn-outline flex items-center gap-2"><Download size={15}/> Download Brochure</a>
            <a href="https://wa.me/917675989961" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded font-display font-semibold text-sm uppercase tracking-wide transition-colors">
              <Phone size={15}/> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── PAGE EXPORT ───────────────────────────────────────
export default function Home() {
  return (
    <>
      <HeroSection/>
      <ProductsSection/>
      <AboutSection/>
      <WhyChooseSection/>
      <ServicesSection/>
      <GlobalSection/>
      <TestimonialsSection/>
      <NewsSection/>
      <BlogSection/>
      <ContactCTA/>
    </>
  )
}
