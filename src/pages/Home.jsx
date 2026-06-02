import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronRight, ExternalLink, Award, Globe, Cpu, Layers, Shield,
         TrendingUp, Users, Settings, GraduationCap, RefreshCw, Phone, Download } from 'lucide-react'
import { scrollWithOffset } from '../utils/scroll'

const FV = { hidden:{opacity:0,y:32}, visible:{opacity:1,y:0,transition:{duration:0.65,ease:[0.22,1,0.36,1]}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.09}} }
const VP = { once:true, margin:'-80px' }

// ── Animated Counter ─────────────────────────────────────────
function Counter({ to, suffix='', duration=2200 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = to / steps
    let current = 0
    let step = 0
    const interval = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), to)
      setCount(current)
      if (step >= steps) clearInterval(interval)
    }, duration / steps)
    return () => clearInterval(interval)
  }, [started, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// ── Floating background element ──────────────────────────────
function FloatEl({ top, left, size, delay, color='rgba(14,165,233,0.06)' }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ top, left, width:size, height:size, background:color, filter:'blur(1px)' }}
      animate={{ y:[-15,15,-15], x:[-8,8,-8], rotate:[0,180,360] }}
      transition={{ duration:8+delay*2, ease:'easeInOut', repeat:Infinity, delay }}/>
  )
}

// ── Hero Section ─────────────────────────────────────────────
function HeroSection() {
  const [cur, setCur]         = useState(0)
  const [spotX, setSpotX]     = useState(50)
  const [spotY, setSpotY]     = useState(50)
  const heroRef               = useRef(null)
  const { scrollY }           = useScroll()
  const bgY = useTransform(scrollY, [0, 600], ['0%', '20%'])
  const contentY = useTransform(scrollY, [0, 600], ['0%', '8%'])

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c+1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  const handleMouseMove = useCallback((e) => {
    const r = heroRef.current?.getBoundingClientRect()
    if (!r) return
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top)  / r.height) * 100
    setSpotX(x); setSpotY(y)
    heroRef.current.style.setProperty('--cursor-x', x + '%')
    heroRef.current.style.setProperty('--cursor-y', y + '%')
  }, [])

  const s = SLIDES[cur]

  return (
    <section ref={heroRef}
      className="relative min-h-screen overflow-hidden flex flex-col bg-navy-950 bg-grid"
      onMouseMove={handleMouseMove}
      aria-label="Hero banner">

      {/* Spotlight overlay */}
      <div className="hero-spotlight"/>

      {/* Parallax background image */}
      <AnimatePresence mode="wait">
        <motion.div key={cur}
          style={{ y: bgY }}
          initial={{ opacity:0, scale:1.06 }}
          animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0 }}
          transition={{ duration:1.1, ease:'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage:`url('${s.bg}')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/96 via-navy-950/75 to-navy-950/40"/>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30"/>
        </motion.div>
      </AnimatePresence>

      {/* Floating decorative elements */}
      <FloatEl top="15%" left="75%" size={180} delay={0} color="rgba(14,165,233,0.04)"/>
      <FloatEl top="60%" left="80%" size={120} delay={1.5} color="rgba(249,115,22,0.04)"/>
      <FloatEl top="30%" left="5%"  size={90}  delay={0.8} color="rgba(14,165,233,0.05)"/>

      {/* Scan line */}
      <div className="hud-scan absolute inset-0 pointer-events-none overflow-hidden opacity-30"/>

      {/* HUD corner tags */}
      <div className="absolute top-20 left-4 sm:left-8 z-10 hidden lg:block">
        <div className="text-[10px] font-display tracking-widest text-accent/40 uppercase">
          BLD-{String(cur+1).padStart(2,'0')} // ENGINEERING SYSTEMS
        </div>
      </div>
      <div className="absolute top-20 right-4 sm:right-8 z-10 hidden lg:block text-right">
        <div className="text-[10px] font-display tracking-widest text-accent/30 uppercase">
          EST. 1991 // HYDERABAD, INDIA
        </div>
      </div>

      {/* Main content */}
      <motion.div style={{ y: contentY }}
        className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 w-full will-change-transform">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={`hero-${cur}`}
              initial={{ opacity:0, y:28 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-16 }}
              transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>

              {/* Tag */}
              <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1 }}>
                <span className="section-label mb-4 inline-flex">{s.tag}</span>
              </motion.div>

              {/* Headline */}
              <h1 className="section-title text-4xl sm:text-5xl lg:text-[3.8rem] text-white mb-5 leading-[1.05]">
                {s.h1.split(' ').map((word, i) => (
                  <motion.span key={i}
                    initial={{ opacity:0, y:20 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay: 0.15 + i * 0.06, ease:[0.22,1,0.36,1], duration:0.6 }}
                    className="inline-block mr-[0.3em]"
                    style={{ color: i === 0 ? '#38bdf8' : undefined }}>
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}
                className="text-slate-300 text-lg max-w-xl mb-8 leading-relaxed">
                {s.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65 }}
                className="flex flex-wrap gap-3 mb-10">
                <Link to="/contact" className="btn-primary magnetic">
                  Get Free Consultation <ArrowRight size={16}/>
                </Link>
                <HashLink smooth scroll={scrollWithOffset} to="/products#aac" className="btn-outline magnetic">
                  Explore Products
                </HashLink>
                <a href="https://wa.me/917675989961" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-lg font-display font-semibold text-sm uppercase tracking-wide transition-all hover:scale-105 magnetic">
                  <Phone size={14}/> WhatsApp
                </a>
              </motion.div>

              {/* Slide dots */}
              <div className="flex gap-2">
                {SLIDES.map((_,i) => (
                  <button key={i} onClick={() => setCur(i)} aria-label={`Slide ${i+1}`}
                    className={`h-1 rounded-full transition-all duration-500 ${i===cur ? 'w-8 bg-accent' : 'w-3 bg-white/25 hover:bg-white/40'}`}/>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Animated stats bar */}
      <motion.div
        initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1, duration:0.8 }}
        className="relative z-10 bg-navy-900/90 backdrop-blur-md border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
          {[
            { num:30, suf:'+', label:'Years Since 1991' },
            { num:500, suf:'+', label:'Plants Installed' },
            { num:20, suf:'+', label:'Countries Served' },
            { num:98, suf:'%', label:'Client Satisfaction' },
          ].map(s => (
            <motion.div key={s.label}
              whileHover={{ backgroundColor:'rgba(14,165,233,0.04)' }}
              className="py-4 px-5 text-center cursor-default transition-colors">
              <div className="font-display font-bold text-2xl text-accent">
                <Counter to={s.num} suffix={s.suf}/>
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

const SLIDES = [
  { bg:'/images/1_aac_plants.jpeg', tag:'AAC Block Plants', h1:'Accelerate Concept To Commissioning', sub:'Complete turnkey AAC Plant solutions. Industry-leading efficiency, quality and automation.' },
  { bg:'/images/5_precast_concrete_plants.jpeg', tag:'Precast Concrete Plants', h1:'Focus On Quality & Innovation', sub:'Precision precast engineering for modern infrastructure — from facades to structural elements.' },
  { bg:'/images/calcium-silicate_fiber-boards.png', tag:'Calcium Silicate / Fiber Boards', h1:'Cutting-Edge Board Manufacturing', sub:'High-performance Calcium Silicate and Fibre Cement Board plant solutions for modern construction.' },
  { bg:'/images/High-End-Automated-Fly-ash-brick.png', tag:'High-End Automated Fly Ash Bricks', h1:'Most Environment Friendly & Sustainable Solutions', sub:'Automated fly ash brick manufacturing — turning industrial waste into high-strength, eco-friendly products.' },
  { bg:'/images/6_concrete_block_plants.png', tag:'Concrete Block Plants', h1:'Complete Block Manufacturing Systems', sub:'High-speed vibro-press block plants for hollow, solid and paving applications.' },
  { bg:'/images/8_mixers.png', tag:'Industrial Mixers', h1:'Heavy-Duty Mixing Excellence', sub:'Planetary, twin-shaft and pan mixers engineered for AAC slurry, concrete and mortar applications.' },
]

const PRODUCTS = [
  { id:'aac',    name:'AAC Plants',                img:'/images/1_prod_aac_plant.png',                    desc:'Fully automated Autoclaved Aerated Concrete plants — 30K to 300K m³/yr' },
  { id:'crush',  name:'Stone Crushing Plants',      img:'/images/2_prod_crushers_plant.png',              desc:'Heavy-duty crushing and screening systems for aggregates and quarrying' },
  { id:'batch',  name:'Concrete Batching Plants',   img:'/images/3_prod_concrete-batching-plants.png',   desc:'High-output ready-mix and site batching plants with advanced controls' },
  { id:'drymix', name:'Dry Mix Mortar Plants',      img:'/images/4_prod_dry_mix_mortar_plants.png',      desc:'Automated tile adhesive, plastering and grouting mortar production lines' },
  { id:'precast',name:'Precast Concrete Plants',    img:'/images/5_prod_precast_concrete_plants.png',    desc:'Precision precast element manufacturing for structural and facade applications' },
  { id:'block',  name:'Concrete Block Plants',      img:'/images/6_prod_concrete-block-plants.png',     desc:'High-speed vibro-press block and brick production — hollow, solid, paver' },
  { id:'cranes', name:'Cranes',                    img:'/images/7_prod_cranes.png',                     desc:'EOT, HOT, gantry and jib cranes for industrial plant material handling' },
  { id:'mixers', name:'Mixers',                    img:'/images/8_prod_mixers.png',                     desc:'Twin-shaft, planetary and pan mixers for concrete, AAC slurry and mortar' },
  { id:'peb',    name:'PEB (Pre Eng. Buildings)',  img:'/images/9_prod_pre_engineered_buildings.png',   desc:'Pre-Engineered Building steel structures for rapid industrial deployment' },
  { id:'special',name:'Special Projects',           img:'/images/10_prod_special_projects.png',          desc:'Bespoke plant solutions and custom industrial engineering for unique requirements' },
]

const WHY = [
  { icon:Award,      title:'30+ Years Experience',      desc:'Engineering excellence since 1991. Three decades of trusted plant manufacturing and delivery.' },
  { icon:Layers,     title:'Turnkey Solutions',          desc:'Complete project from DPR, process design, procurement, manufacturing to commissioning.' },
  { icon:Cpu,        title:'Manufacturing Excellence',   desc:'In-house CNC fabrication. ISO-certified QA. Meticulous manufacturing at every stage.' },
  { icon:Globe,      title:'Global Installations',       desc:'Plants commissioned across India, Middle East, Africa, SE Asia and 20+ countries.' },
  { icon:TrendingUp, title:'R&D & Innovation',           desc:'Dedicated R&D driving proprietary autoclave designs, new materials and automation tech.' },
  { icon:Shield,     title:'Sustainability',             desc:'AAC, fly ash brick and carbon-capture tech at the core — building greener industries.' },
]

const ADVANTAGES = [
  { title:'Superior Design', img:'/images/sup_design.jpg', desc:'Every plant is engineered from first principles — optimised layouts, energy-efficient process flows and future-ready automation architecture.' },
  { title:'Meticulous Manufacturing', img:'/images/meti_mfg.jpg', desc:'In-house CNC machining, precision fabrication and rigorously tested sub-assemblies ensure zero-compromise quality before dispatch.' },
  { title:'Immaculate Quality', img:'/images/imm_quality.jpg', desc:'ISO 9001:2015 certified quality systems with 100% pre-dispatch inspection, factory acceptance tests and on-site commissioning validation.' },
]

const SERVICES_PREVIEW = [
  { icon:Settings,      title:'Setting Up AAC Plant',       desc:'Complete support for establishing new AAC block manufacturing facilities from scratch.' },
  { icon:Layers,        title:'Turnkey Solutions',           desc:'Single-point responsibility for design, supply, installation and commissioning.' },
  { icon:TrendingUp,    title:'Feasibility Study & DPR',    desc:'Comprehensive market analysis, technical feasibility and detailed project reports.' },
  { icon:Cpu,           title:'Process Design & Engg.',     desc:'Expert process engineering, equipment selection and plant layout optimisation.' },
  { icon:Shield,        title:'AMC & After-Sales',          desc:'Annual maintenance contracts and 24x7 after-sales support for all plants.' },
  { icon:GraduationCap, title:'Training Programs',          desc:'Operator certification, safety and quality control training for plant teams.' },
]

const STATS = [
  { num:'30+', label:'Years Since 1991' },
  { num:'500+', label:'Plants Installed' },
  { num:'20+', label:'Countries Served' },
  { num:'98%', label:'Client Satisfaction' },
]

// Real testimonials with live-site logo images
const TESTIMONIALS = [
  { logo:'/images/saudiaac.png', company:'Saudi AAC Blocks', text:'Buildmate commissioned AAC plants at our factory which have advanced technology processes resulting in high quality AAC blocks.' },
  { logo:'/images/ecorex.png',   company:'Ecorex',           text:'Technology, experience and reliability are the core of a concrete batching plant. A solid basis for a long-lasting partnership.' },
  { logo:'/images/elite.png',    company:'Elite',            text:'High quality standards, regular interaction and prompt solutions. We are proud to be associated with Buildmate.' },
  { logo:'/images/eko.png',      company:'Eko',             text:"Buildmate's advanced technology allows complete solutions to ensure highly efficient and optimised processes with consistent final product quality." },
  { logo:'/images/rancare.png',  company:'RanCare',          text:'One of the keys to increase productivity and quality is continuous training of the machine and maintenance personnel.' },
  { logo:'/images/duralite.png', company:'Duralite',         text:'Designed according to our specific requirements. Our experience confirms that such indigenous solutions strengthen our market position.' },
]

// Real client logos from live site
const CLIENT_LOGOS = [
  'saudiaac','ecorex','elite','eko','rancare','duralite',
  'ultratech','espec','icom','vedam','earthpaver','bepl',
  'inventa','sahay','magna','pionner','kesoram','adityabirla'
]

const NEWS_ITEMS = [
  { cat:'Exhibition', title:'EXCON 13th Edition 2025', date:'09–13 Dec 2025', location:'Bengaluru', img:'/images/Excon_13th_edition.jpg', status:'Upcoming' },
  { cat:'Conference', title:'Fly Ash Utilisation Conference 2024', date:'22–24 Feb 2024', location:'Goa', img:'/images/fly_ash_utilisation_conference_2024.jpg', status:'Past' },
  { cat:'Trade Show', title:'World of Concrete 2024', date:'23–25 Jan 2024', location:'Las Vegas, USA', img:'/images/World_of_concrete_2024.jpg', status:'Past' },
]


// ── PRODUCTS ──────────────────────────────────────────────────────
function ProductsSection() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-2">Our Products</p>
          <h2 className="section-title text-4xl text-white mb-3">Complete Industrial Plant Portfolio</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">From AAC plants to PEB structures — comprehensive turnkey plant solutions engineered for performance and longevity.</p>
        </motion.div>
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {PRODUCTS.map(p => (
            <motion.div key={p.id} variants={FV}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-navy-800 card-hover cursor-pointer">
              <div className="h-36 overflow-hidden bg-navy-700">
                <img src={p.img} alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  onError={e => { e.target.style.opacity='0.3' }}/>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/50 to-transparent"/>
              </div>
              <div className="p-3 relative z-10">
                <h3 className="font-display font-semibold text-white text-sm mb-1 leading-tight">{p.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-2 line-clamp-2">{p.desc}</p>
                <Link to={`/products#${p.id}`} className="text-accent text-xs font-display font-semibold uppercase tracking-wide flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More <ChevronRight size={11}/>
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

// ── ABOUT ─────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="py-20 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label mb-3">About Buildmate</p>
            <h2 className="section-title text-4xl text-white mb-5">Engineering Excellence Since 1991</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Buildmate Projects Pvt Ltd, established in 1991, is one of India's top manufacturers and suppliers of AAC Block Plants
              and comprehensive building material manufacturing equipment. Headquartered in Hyderabad, Telangana, we deliver world-class
              industrial plant solutions across India, the Middle East, Africa and South East Asia.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Our manufacturing facility in Gundlapochampally, Hyderabad features advanced CNC infrastructure, precision fabrication
              workshops and a dedicated R&D laboratory — enabling us to deliver complete turnkey plant solutions with unmatched quality.
              Led by CEO Mr. M. Venkata Ratnam, our engineering team of 200+ skilled professionals ensures every project is delivered
              on time, within budget and to specification.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-7">
              {[['Since 1991','Engineering heritage'],['500+ Plants','Installed globally'],['20+ Countries','Global reach'],['ISO 9001:2015','Quality certified']].map(([n,l]) => (
                <div key={n} className="p-4 bg-navy-800 rounded-lg border border-white/5">
                  <div className="font-display font-bold text-lg text-accent mb-1">{n}</div>
                  <div className="text-xs text-slate-400">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Link to="/about" className="btn-primary">Know More <ArrowRight size={15}/></Link>
              <Link to="/projects" className="btn-outline">Our Projects</Link>
            </div>
          </motion.div>
          <motion.div className="relative" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={VP} transition={{ duration:0.9 }}>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="/images/banner_whoweare.jpg" alt="Buildmate Engineering"
                className="w-full h-[400px] object-cover opacity-80"
                onError={e => { e.target.src='https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'; e.target.style.opacity='0.6' }}/>
            </div>
            <div className="absolute -bottom-4 -left-4 glass p-4 rounded-xl border border-accent/20 text-center min-w-[140px]">
              <div className="font-display font-bold text-3xl text-accent mb-1">₹2000Cr+</div>
              <div className="text-xs text-slate-300">Project Value Delivered</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── WHY CHOOSE ────────────────────────────────────────────────────
function WhyChooseSection() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-2">The Buildmate Advantage</p>
          <h2 className="section-title text-4xl text-white mb-3">Why Choose Buildmate</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Industry-leading capabilities that have made us the preferred partner for industrial plant projects worldwide.</p>
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

// ── BUILDMATE ADVANTAGES (from live site) ─────────────────────────
function AdvantagesSection() {
  return (
    <section className="py-20 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-2">Buildmate Advantages</p>
          <h2 className="section-title text-4xl text-white">Superior. Meticulous. Immaculate.</h2>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-7" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {ADVANTAGES.map(a => (
            <motion.div key={a.title} variants={FV}
              className="group bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img src={a.img} alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                  onError={e => { e.target.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=60'; e.target.style.opacity='0.4' }}/>
                <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(13,31,60,0.9), transparent)'}}/>
              </div>
              <div className="p-6">
                <h3 className="section-title text-xl text-accent mb-3">{a.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-8">
          <Link to="/about#advantages" className="btn-outline">See All Advantages <ArrowRight size={15}/></Link>
        </div>
      </div>
    </section>
  )
}

// ── SERVICES PREVIEW ──────────────────────────────────────────────
function ServicesSection() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label mb-2">Services</p>
            <h2 className="section-title text-4xl text-white">What We Offer</h2>
          </motion.div>
          <Link to="/services" className="btn-outline shrink-0">All Services <ArrowRight size={15}/></Link>
        </div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {SERVICES_PREVIEW.map(s => (
            <motion.div key={s.title} variants={FV}
              className="group p-6 bg-navy-800 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
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

// ── GLOBAL PRESENCE ───────────────────────────────────────────────
function GlobalSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950"/>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage:'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png)', backgroundSize:'cover', backgroundPosition:'center', filter:'invert(1)' }}/>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-14" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-2">Plants Under Operation</p>
          <h2 className="section-title text-4xl text-white mb-3">Trusted Across the Globe</h2>
          <p className="text-slate-400 max-w-xl mx-auto">From India to Saudi Arabia, UAE, Nigeria and beyond — Buildmate plants power industrial growth worldwide.</p>
        </motion.div>
        <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {[['500+','Plants Under Operation'],['20+','Countries Served'],['1991','Year Established'],['200+','Skilled Engineers']].map(([n,l]) => (
            <motion.div key={l} variants={FV} className="glass rounded-xl p-6 text-center">
              <div className="font-display font-bold text-4xl text-accent mb-2">{n}</div>
              <div className="text-slate-300 text-xs uppercase tracking-wider font-display">{l}</div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center">
          <Link to="/projects" className="btn-primary">View All Projects <ArrowRight size={15}/></Link>
        </div>
      </div>
    </section>
  )
}

// ── AAC USP SECTION (from live site "7 reasons why AAC") ──────────
function AACSection() {
  const usps = [
    { img:'/images/aacblock_seven_one.jpg',   title:'Light Weight',         desc:'3-4x lighter than red bricks — reduces dead load on structure and foundation costs.' },
    { img:'/images/aacblock_seven_two.jpg',   title:'Thermal Insulation',   desc:'Excellent thermal performance — reduces HVAC loads and energy consumption significantly.' },
    { img:'/images/aacblock_seven_three.jpg', title:'Fire Resistance',      desc:'Class A1 non-combustible. 4-hour fire rating for walls — meets all international safety standards.' },
    { img:'/images/aacblock_seven_four.jpg',  title:'Sound Insulation',     desc:'High STC ratings reduce sound transmission — ideal for residential, hospitality and commercial.' },
  ]
  return (
    <section className="py-20 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-2">Why AAC Blocks</p>
          <h2 className="section-title text-4xl text-white">7 Reasons Why AAC Is the Future</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3">Autoclaved Aerated Concrete blocks outperform traditional red bricks on every parameter — strength, weight, insulation, speed and sustainability.</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {usps.map(u => (
            <motion.div key={u.title} variants={FV}
              className="group bg-navy-800 rounded-xl overflow-hidden border border-white/5 card-hover">
              <div className="h-44 overflow-hidden">
                <img src={u.img} alt={u.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                  onError={e => { e.target.style.opacity='0.2' }}/>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-800/80 to-transparent"/>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-accent text-base mb-2">{u.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{u.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-6 p-5 glass rounded-xl border border-accent/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          {['Earthquake Resistant','Eco-Friendly','Easy to Work With','Cost-Effective','Faster Construction','Durable & Strong'].map(r => (
            <div key={r} className="text-xs text-slate-300 font-display uppercase tracking-wide py-2 border border-white/5 rounded-lg">
              ✓ {r}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ──────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-2">Testimonials</p>
          <h2 className="section-title text-4xl text-white">What Our Clients Say</h2>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {TESTIMONIALS.map(t => (
            <motion.div key={t.company} variants={FV}
              className="p-6 bg-navy-800 rounded-xl border border-white/5 card-hover flex flex-col gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_,i) => <span key={i} className="text-gold text-sm">★</span>)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-16 h-10 bg-white/5 rounded flex items-center justify-center overflow-hidden shrink-0">
                  <img src={t.logo} alt={t.company}
                    className="max-w-full max-h-full object-contain opacity-80"
                    onError={e => { e.target.style.display='none' }}/>
                </div>
                <span className="text-white text-sm font-display font-semibold">{t.company}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-8">
          <Link to="/customers" className="btn-outline">All Customer Stories <ArrowRight size={15}/></Link>
        </div>
      </div>
    </section>
  )
}

// ── CLIENT LOGOS ──────────────────────────────────────────────────
function ClientsSection() {
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS]
  return (
    <section className="py-14 bg-navy-950 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 text-center">
        <p className="section-label justify-center">Our Clients</p>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-8 items-center" style={{ animation:'marquee 30s linear infinite', width:'max-content' }}>
          {doubled.map((logo, i) => (
            <div key={i} className="w-28 h-14 bg-navy-800 border border-white/5 rounded-lg flex items-center justify-center shrink-0 hover:border-accent/20 transition-colors p-2">
              <img src={`/images/${logo}.png`} alt={logo}
                className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<span class="text-slate-500 text-xs font-display uppercase tracking-wide">${logo}</span>` }}/>
            </div>
          ))}
        </div>
      </div>
      <style>{'@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}' }</style>
    </section>
  )
}

// ── NEWS PREVIEW ──────────────────────────────────────────────────
function NewsSection() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label mb-2">News & Events</p>
            <h2 className="section-title text-4xl text-white">Latest Updates</h2>
          </motion.div>
          <Link to="/news" className="btn-outline shrink-0">All Events <ArrowRight size={15}/></Link>
        </div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {NEWS_ITEMS.map(n => (
            <motion.div key={n.title} variants={FV}
              className="group bg-navy-800 rounded-xl overflow-hidden border border-white/5 card-hover cursor-pointer">
              <div className="h-44 overflow-hidden relative">
                <img src={n.img} alt={n.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                  onError={e => { e.target.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=60'; e.target.style.opacity='0.4' }}/>
                {n.status === 'Upcoming' && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-display font-bold uppercase tracking-wide px-2 py-0.5 rounded">Upcoming</div>
                )}
              </div>
              <div className="p-5">
                <span className="text-xs font-display uppercase tracking-wider text-gold">{n.cat}</span>
                <h3 className="text-white font-display font-semibold mt-1 mb-1 leading-tight">{n.title}</h3>
                <p className="text-slate-400 text-xs">{n.date} · {n.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── CONTACT CTA ───────────────────────────────────────────────────
function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-gradient-radial from-accent/30 to-transparent"/>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-3">Get Started Today</p>
          <h2 className="section-title text-4xl sm:text-5xl text-white mb-5">Ready to Commission Your Plant?</h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Talk to our engineering team. We deliver from concept to commissioning — across India and worldwide.<br/>
            <span className="text-accent font-semibold">CEO: Mr. M. Venkata Ratnam</span> — mvr@buildmate.in
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">Request Consultation <ArrowRight size={16}/></Link>
            <a href="https://buildmate.in/brochures.php" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2"><Download size={15}/> Download Brochure</a>
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


// ── AAC Sister-Site Strip (Home page) ─────────────────────────
function AACSisterStrip() {
  return (
    <section className="relative py-10 overflow-hidden bg-navy-950 border-y border-accent/10">
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 to-transparent pointer-events-none"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl glass border border-accent/20">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center shrink-0 text-2xl font-display font-bold text-white shadow-lg shadow-accent/20">
              AAC
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="section-label text-xs">Dedicated Portal</span>
                <span className="text-[10px] font-display uppercase tracking-wider bg-accent/15 text-accent border border-accent/30 px-2 py-0.5 rounded-full">Sister Site</span>
              </div>
              <h3 className="font-display font-bold text-white text-lg leading-tight">
                AAC Plant Manufacturers — Dedicated AAC Resource
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Explore our specialised portal for AAC Block Plant technology, specifications and case studies.
              </p>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="https://www.aacplantmanufacturers.com/" target="_blank" rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 whitespace-nowrap">
              Visit AAC Plant Site <ExternalLink size={14}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════
// NexGiga Ecosystem Section
// ═══════════════════════════════════════════════════════
function NexGigaSection() {
  const nodes = [
    { id:'nexgiga', label:'NexGiga', sub:'Parent Ecosystem', color:'#233C82', size:'lg', x:50, y:10 },
    { id:'buildmate', label:'BuildMate', sub:'Execution Arm', color:'#D72D23', size:'md', x:20, y:55 },
    { id:'nexbuild', label:'NexBuild', sub:'Construction Tech', color:'#465A96', size:'md', x:50, y:55 },
    { id:'nextech', label:'NexTech', sub:'Digital Solutions', color:'#465A96', size:'md', x:80, y:55 },
    { id:'smart', label:'Smart Infra', sub:'Infrastructure AI', color:'#6473A5', size:'sm', x:50, y:85 },
  ]
  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-sm opacity-50"/>
      <div className="absolute inset-0 bg-gradient-radial from-brand/5 to-transparent pointer-events-none"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-16" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-3">Ecosystem</p>
          <h2 className="section-title text-4xl text-white mb-4">The NexGiga Ecosystem</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            BuildMate operates as the execution arm of the NexGiga smart infrastructure ecosystem —
            connecting engineering excellence with digital innovation, automation and AI-powered operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Ecosystem diagram */}
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}
            className="relative h-80 bg-navy-900/50 rounded-2xl border border-brand/20 overflow-hidden p-6">
            <div className="absolute inset-0 bg-grid opacity-30"/>
            {/* Center node */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-brand flex items-center justify-center shadow-brand mb-2 border-2 border-brand-light">
                <span className="font-display font-bold text-white text-sm text-center leading-tight">Nex<br/>Giga</span>
              </div>
              <div className="text-[10px] text-brand-light font-display uppercase tracking-widest">Parent Ecosystem</div>
            </div>
            {/* Connector lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="50%" y1="100" x2="22%" y2="210" stroke="rgba(35,60,130,0.4)" strokeWidth="1" strokeDasharray="4,4"/>
              <line x1="50%" y1="100" x2="50%" y2="210" stroke="rgba(35,60,130,0.4)" strokeWidth="1" strokeDasharray="4,4"/>
              <line x1="50%" y1="100" x2="78%" y2="210" stroke="rgba(35,60,130,0.4)" strokeWidth="1" strokeDasharray="4,4"/>
            </svg>
            {/* Child nodes */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-around px-4">
              {[
                {label:'BuildMate', sub:'Execution', color:'#D72D23'},
                {label:'NexBuild', sub:'Construction', color:'#465A96'},
                {label:'NexTech', sub:'Digital', color:'#6473A5'},
              ].map(n => (
                <div key={n.label} className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center border-2 shadow-lg"
                    style={{backgroundColor:`${n.color}22`, borderColor:`${n.color}66`}}>
                    <span className="font-display font-bold text-[11px] text-white text-center leading-tight">{n.label}</span>
                  </div>
                  <div className="text-[9px] text-slate-500 font-display uppercase tracking-wide">{n.sub}</div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border border-brand/10 animate-spin-slow"/>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <div className="space-y-5">
              {[
                { icon:'🏗️', title:'BuildMate — Execution Arm', desc:'Industrial plant manufacturing and turnkey project delivery. AAC, Precast, PEB, Carbon Capture and FCB plants commissioned across 20+ countries.' },
                { icon:'🏛️', title:'NexBuild — Construction Technology', desc:'Smart construction solutions integrating digital workflows, BIM, prefabrication and modern delivery methodologies.' },
                { icon:'💻', title:'NexTech — Digital Innovation', desc:'Technology solutions for smart infrastructure — IoT, AI-monitoring, digital twins and Industry 4.0 integration.' },
                { icon:'🌐', title:'Smart Infrastructure Solutions', desc:'Integrated ecosystem for intelligent communities, smart cities and future-ready urban infrastructure development.' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-4 bg-navy-800/50 rounded-xl border border-brand/10 hover:border-brand/25 transition-colors">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-display font-semibold text-white text-sm mb-1">{item.title}</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// Vision to Commissioning Journey Section
// ═══════════════════════════════════════════════════════
function VisionJourneySection() {
  const steps = [
    { icon:'💡', title:'Vision', desc:'Your ambition becomes our mission — we begin with understanding your complete project vision.' },
    { icon:'📐', title:'Planning', desc:'Feasibility study, DPR, site analysis and detailed project planning to map the optimal path.' },
    { icon:'⚙️', title:'Engineering', desc:'Process design, equipment engineering, civil design and full technical documentation.' },
    { icon:'🏭', title:'Execution', desc:'Precision manufacturing, quality control, site installation and system integration.' },
    { icon:'📊', title:'Monitoring', desc:'Commissioning, performance validation, training and ongoing AMC support.' },
  ]
  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-16" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-3">Our Approach</p>
          <h2 className="section-title text-4xl text-white mb-4">Start With a Vision</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">From concept to commissioning — Buildmate guides your project through every critical stage with engineering excellence and execution certainty.</p>
        </motion.div>
        <motion.div className="relative" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {/* Connector line */}
          <div className="absolute top-10 left-16 right-16 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent hidden lg:block"/>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.title} variants={FV}
                className="relative flex flex-col items-center text-center group">
                <motion.div
                  whileHover={{ scale:1.1, y:-4 }}
                  className="w-20 h-20 rounded-2xl bg-navy-800 border-2 border-brand/30 flex items-center justify-center text-3xl mb-4 relative z-10 group-hover:border-brand group-hover:shadow-brand transition-all duration-300">
                  {step.icon}
                  {i < steps.length-1 && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-brand/40 font-bold text-lg hidden lg:block">›</div>
                  )}
                </motion.div>
                <div className="font-display font-bold text-white text-sm mb-2 uppercase tracking-wide">{step.title}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{step.desc}</div>
                <div className="w-6 h-6 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center mt-3">
                  <span className="text-brand text-xs font-display font-bold">{String(i+1).padStart(2,'0')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// Sustainability & Carbon Innovation Section
// ═══════════════════════════════════════════════════════
function SustainabilitySection() {
  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-green-900/10 blur-3xl"/>
        <div className="absolute bottom-1/4 -left-32 w-72 h-72 rounded-full bg-brand/8 blur-3xl"/>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div className="text-center mb-16" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-3">Green Engineering</p>
          <h2 className="section-title text-4xl text-white mb-4">Sustainability & Carbon Innovation</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Buildmate is committed to engineering a sustainable future — through carbon capture, fly ash utilisation and green building material manufacturing.</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {[
            { icon:'🌿', title:'Carbon Capture', val:'40%', unit:'CO₂ Reduction', desc:'Our carbon capture plants integrate directly into manufacturing, converting CO₂ emissions into construction-grade materials.' },
            { icon:'♻️', title:'Carbon Utilization', val:'60%', unit:'Fly Ash Used', desc:'FCB plants convert industrial fly ash waste into high-strength bricks, eliminating landfill burden.' },
            { icon:'🌱', title:'Green Engineering', val:'100%', unit:'Eco-Designed', desc:'Every plant engineered with energy efficiency, minimal waste and environmental impact as core design parameters.' },
            { icon:'🏙️', title:'Sustainable Infrastructure', val:'500+', unit:'Green Plants', desc:'Over 500 plants delivered globally that use sustainable processes and low-carbon building materials.' },
          ].map(c => (
            <motion.div key={c.title} variants={FV}
              whileHover={{ y:-6 }}
              className="p-6 bg-navy-900 rounded-2xl border border-green-900/30 hover:border-green-600/40 transition-all group text-center">
              <div className="text-4xl mb-4">{c.icon}</div>
              <div className="font-display font-bold text-3xl text-green-400 mb-0.5">{c.val}</div>
              <div className="text-xs text-green-600 font-display uppercase tracking-wider mb-3">{c.unit}</div>
              <div className="font-display font-semibold text-white text-sm mb-2">{c.title}</div>
              <div className="text-slate-400 text-xs leading-relaxed">{c.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// Physical AI & Smart Technology Section
// ═══════════════════════════════════════════════════════
function PhysicalAISection() {
  const technologies = [
    {
      icon:'🤖', title:'Physical AI',
      desc:'AI-enabled physical infrastructure that learns, adapts and optimises in real time. Smart sensors and machine learning drive predictive plant operations.',
      points:['Predictive maintenance algorithms','Real-time quality control AI','Adaptive process optimisation','Anomaly detection systems']
    },
    {
      icon:'🔮', title:'Virtual Commissioning',
      desc:'Digital simulation of the complete plant before physical installation — reducing risk, accelerating deployment and guaranteeing operational targets.',
      points:['Full plant digital simulation','Risk identification before build','Operator training in virtual environment','Commissioning time reduced by 30%']
    },
    {
      icon:'🪞', title:'Living Mirror Technology',
      desc:'Digital twin of every Buildmate plant — a live virtual replica synchronized with the physical plant for real-time monitoring, analytics and performance optimisation.',
      points:['Real-time plant digital twin','Live performance dashboards','Operational analytics engine','Continuous performance optimisation']
    },
    {
      icon:'🔄', title:'Digital to Physical',
      desc:'Complete transformation from digital simulation to physical reality. Every Buildmate plant is first engineered digitally, then executed physically with precision.',
      points:['Simulation → Engineering → Execution','BIM-driven manufacturing','Digital quality assurance','Performance-guaranteed delivery']
    },
  ]
  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30"/>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand/5 to-transparent pointer-events-none"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div className="text-center mb-16" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-3">Innovation Platform</p>
          <h2 className="section-title text-4xl text-white mb-4">Engineering the Future</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Buildmate harnesses Physical AI, Digital Twins and Virtual Commissioning to deliver industrial plants that are smarter, faster and more reliable.</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-7" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {technologies.map((tech, i) => (
            <motion.div key={tech.title} variants={FV}
              className="group p-8 bg-navy-800/60 rounded-2xl border border-brand/15 hover:border-brand/40 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand/10 transition-colors"/>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-brand/15 border border-brand/30 flex items-center justify-center text-2xl group-hover:bg-brand/25 transition-colors">
                    {tech.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-red-DEFAULT font-display uppercase tracking-widest mb-0.5">Innovation {String(i+1).padStart(2,'0')}</div>
                    <h3 className="font-display font-bold text-white text-xl">{tech.title}</h3>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{tech.desc}</p>
                <ul className="space-y-2">
                  {tech.points.map(pt => (
                    <li key={pt} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0"/>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// Proven Execution — Featured Projects Section
// ═══════════════════════════════════════════════════════
function ProvenExecutionSection() {
  const projects = [
    {
      client:'UltraTech Cement',
      logo:'/images/ultratech.png',
      type:'AAC Block Plant',
      location:'Multiple — Pan India',
      capacity:'500 m³/day each',
      metric:'98%',
      metricLabel:'Plant Uptime',
      desc:"Multiple large-capacity AAC block plants for India's largest cement company. Turnkey delivery with full automation and AMC support."
    },
    {
      client:'Saudi AAC Blocks',
      logo:'/images/saudiaac.png',
      type:'AAC Manufacturing Plant',
      location:'Riyadh, Saudi Arabia',
      capacity:'500 m³/day',
      metric:'15%',
      metricLabel:'Above Target Output',
      desc:"State-of-the-art AAC plant commissioned in Saudi Arabia — advanced technology processes delivering premium quality AAC blocks for the Gulf market."
    },
    {
      client:'EKO Blocks',
      logo:'/images/eko.png',
      type:'AAC Block Plant',
      location:'Bengaluru, Karnataka',
      capacity:'200 m³/day',
      metric:'30%',
      metricLabel:'Energy Savings',
      desc:"Energy-efficient AAC plant with optimised process flow. Buildmate's advanced automation allows highly efficient production with consistent quality."
    },
  ]
  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/4 to-transparent"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-16" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
          <p className="section-label justify-center mb-3">Proven Execution</p>
          <h2 className="section-title text-4xl text-white mb-4">Delivered. Commissioned. Running.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Real projects. Real results. Measurable success across India, the Middle East and beyond.</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-7" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
          {projects.map(p => (
            <motion.div key={p.client} variants={FV}
              whileHover={{ y:-6 }}
              className="relative bg-navy-900 rounded-2xl border border-brand/20 hover:border-brand/40 transition-all duration-300 overflow-hidden group">
              {/* Top colored bar */}
              <div className="h-1 w-full bg-gradient-to-r from-brand via-brand-mid to-red-DEFAULT"/>
              <div className="p-7">
                {/* Logo */}
                <div className="w-24 h-12 mb-5 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden p-2">
                  <img src={p.logo} alt={p.client}
                    className="max-w-full max-h-full object-contain"
                    onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<span class="text-white/40 text-xs font-display">${p.client}</span>` }}/>
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-1">{p.client}</h3>
                <div className="text-red-DEFAULT text-xs font-display uppercase tracking-wider mb-3">{p.type}</div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="bg-navy-800 rounded-lg p-3">
                    <div className="text-slate-500 text-xs mb-0.5">Location</div>
                    <div className="text-white text-xs font-medium">{p.location}</div>
                  </div>
                  <div className="bg-navy-800 rounded-lg p-3">
                    <div className="text-slate-500 text-xs mb-0.5">Capacity</div>
                    <div className="text-white text-xs font-medium">{p.capacity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-brand/10 rounded-xl border border-brand/20">
                  <div className="font-display font-bold text-3xl text-brand">{p.metric}</div>
                  <div className="text-xs text-brand-light">{p.metricLabel}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// Smart Communities / Future Infrastructure Section
// ═══════════════════════════════════════════════════════
function SmartCommunitiesSection() {
  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-sm opacity-20"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/5 blur-3xl"/>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label mb-3">Future Vision</p>
            <h2 className="section-title text-4xl text-white mb-5">Building Smart Communities</h2>
            <p className="text-slate-400 leading-relaxed mb-6">Buildmate's industrial plants are the foundational infrastructure for tomorrow's smart cities — producing the sustainable, intelligent building materials that smart communities are built from.</p>
            <div className="space-y-4 mb-8">
              {[
                { icon:'🏙️', title:'Smart Cities', desc:'AAC and precast materials powering energy-efficient smart city construction.' },
                { icon:'🔌', title:'Connected Infrastructure', desc:'IoT-ready buildings enabled by precision manufacturing at Buildmate plants.' },
                { icon:'🌍', title:'Digital Communities', desc:'Sustainable materials + digital monitoring for truly intelligent urban spaces.' },
                { icon:'🧠', title:'Intelligent Urban Development', desc:'Data-driven construction using Buildmate materials and NexGiga technology.' },
              ].map(f => (
                <div key={f.title} className="flex gap-4 items-start">
                  <span className="text-xl shrink-0">{f.icon}</span>
                  <div>
                    <div className="font-display font-semibold text-white text-sm">{f.title}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-primary magnetic">Explore Future Solutions <ArrowRight size={15}/></Link>
          </motion.div>

          {/* Future city visual */}
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}
            className="relative">
            <div className="relative h-96 bg-navy-800/60 rounded-2xl border border-brand/20 overflow-hidden p-8">
              <div className="absolute inset-0 bg-grid opacity-20"/>
              {/* Animated city icon grid */}
              <div className="grid grid-cols-4 grid-rows-4 gap-3 h-full">
                {[
                  '🏢','⚡','🏗️','💧','🌿','📡','🏭','🔋',
                  '🚇','💡','🌐','♻️','🏘️','📊','🔌','🌱'
                ].map((icon, i) => (
                  <motion.div key={i}
                    initial={{ opacity:0, scale:0.5 }}
                    whileInView={{ opacity:0.7, scale:1 }}
                    viewport={{ once:true }}
                    transition={{ delay: i * 0.05, duration:0.4 }}
                    whileHover={{ opacity:1, scale:1.2 }}
                    className="bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center text-2xl cursor-default hover:bg-brand/20 transition-all">
                    {icon}
                  </motion.div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent pointer-events-none"/>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="font-display font-bold text-brand text-lg">SMART INFRASTRUCTURE 2030</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest">Powered by Buildmate + NexGiga</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


export default function Home() {
  return (
    <>
      <HeroSection/>
      <ProductsSection/>
      <AACSisterStrip/>
      <AboutSection/>
      <WhyChooseSection/>
      <AdvantagesSection/>
      <ServicesSection/>
      <GlobalSection/>
      <AACSection/>
      <TestimonialsSection/>
      <ClientsSection/>
      <NewsSection/>
      <ProvenExecutionSection/>
      <SustainabilitySection/>
      <VisionJourneySection/>
      <NexGigaSection/>
      <PhysicalAISection/>
      <SmartCommunitiesSection/>
      <ContactCTA/>
    </>
  )
}
