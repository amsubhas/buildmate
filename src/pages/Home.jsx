import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronRight, Award, Globe, Cpu, Layers, Shield, TrendingUp, Users, Settings, GraduationCap, RefreshCw, Phone, Download } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:'easeOut'}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.09}} }
const VP = { once:true, margin:'-80px' }

// ── Real images from buildmate.in ──
const SLIDES = [
  { bg:'https://buildmate.in/images/1_aac_plants.jpg', tag:'AAC Block Plants', h1:'Accelerate Concept To Commissioning', sub:'Complete turnkey AAC Plant solutions. Industry-leading efficiency, quality and automation.' },
  { bg:'https://buildmate.in/images/5_precast_concrete_plants.jpg', tag:'Precast Concrete Plants', h1:'Focus On Quality & Innovation', sub:'Precision precast engineering for modern infrastructure — from facades to structural elements.' },
  { bg:'https://buildmate.in/images/calcium-silicate_fiber-boards.png', tag:'Calcium Silicate / Fiber Boards', h1:'Cutting-Edge Board Manufacturing', sub:'High-performance Calcium Silicate and Fibre Cement Board plant solutions for modern construction.' },
  { bg:'https://buildmate.in/images/High-End-Automated-Fly-ash-brick.png', tag:'High-End Automated Fly Ash Bricks', h1:'Most Environment Friendly & Sustainable Solutions', sub:'Automated fly ash brick manufacturing — turning industrial waste into high-strength, eco-friendly products.' },
  { bg:'https://buildmate.in/images/6_concrete_block_plants.jpg', tag:'Concrete Block Plants', h1:'Complete Block Manufacturing Systems', sub:'High-speed vibro-press block plants for hollow, solid and paving applications.' },
  { bg:'https://buildmate.in/images/8_mixers.jpg', tag:'Industrial Mixers', h1:'Heavy-Duty Mixing Excellence', sub:'Planetary, twin-shaft and pan mixers engineered for AAC slurry, concrete and mortar applications.' },
]

const PRODUCTS = [
  { id:'aac',    name:'AAC Plants',                img:'https://buildmate.in/images/1_prod_aac_plant.png',                    desc:'Fully automated Autoclaved Aerated Concrete plants — 30K to 300K m³/yr' },
  { id:'crush',  name:'Stone Crushing Plants',      img:'https://buildmate.in/images/2_prod_crushers_plant.png',              desc:'Heavy-duty crushing and screening systems for aggregates and quarrying' },
  { id:'batch',  name:'Concrete Batching Plants',   img:'https://buildmate.in/images/3_prod_concrete-batching-plants.png',   desc:'High-output ready-mix and site batching plants with advanced controls' },
  { id:'drymix', name:'Dry Mix Mortar Plants',      img:'https://buildmate.in/images/4_prod_dry_mix_mortar_plants.png',      desc:'Automated tile adhesive, plastering and grouting mortar production lines' },
  { id:'precast',name:'Precast Concrete Plants',    img:'https://buildmate.in/images/5_prod_precast_concrete_plants.png',    desc:'Precision precast element manufacturing for structural and facade applications' },
  { id:'block',  name:'Concrete Block Plants',      img:'https://buildmate.in/images/6_prod_concrete-block-plants.png',     desc:'High-speed vibro-press block and brick production — hollow, solid, paver' },
  { id:'cranes', name:'Cranes',                    img:'https://buildmate.in/images/7_prod_cranes.png',                     desc:'EOT, HOT, gantry and jib cranes for industrial plant material handling' },
  { id:'mixers', name:'Mixers',                    img:'https://buildmate.in/images/8_prod_mixers.png',                     desc:'Twin-shaft, planetary and pan mixers for concrete, AAC slurry and mortar' },
  { id:'peb',    name:'PEB (Pre Eng. Buildings)',  img:'https://buildmate.in/images/9_prod_pre_engineered_buildings.png',   desc:'Pre-Engineered Building steel structures for rapid industrial deployment' },
  { id:'special',name:'Special Projects',           img:'https://buildmate.in/images/10_prod_special_projects.png',          desc:'Bespoke plant solutions and custom industrial engineering for unique requirements' },
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
  { title:'Superior Design', img:'https://buildmate.in/images/sup_design.jpg', desc:'Every plant is engineered from first principles — optimised layouts, energy-efficient process flows and future-ready automation architecture.' },
  { title:'Meticulous Manufacturing', img:'https://buildmate.in/images/meti_mfg.jpg', desc:'In-house CNC machining, precision fabrication and rigorously tested sub-assemblies ensure zero-compromise quality before dispatch.' },
  { title:'Immaculate Quality', img:'https://buildmate.in/images/imm_quality.jpg', desc:'ISO 9001:2015 certified quality systems with 100% pre-dispatch inspection, factory acceptance tests and on-site commissioning validation.' },
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
  { logo:'https://buildmate.in/images/saudiaac.png', company:'Saudi AAC Blocks', text:'Buildmate commissioned AAC plants at our factory which have advanced technology processes resulting in high quality AAC blocks.' },
  { logo:'https://buildmate.in/images/ecorex.png',   company:'Ecorex',           text:'Technology, experience and reliability are the core of a concrete batching plant. A solid basis for a long-lasting partnership.' },
  { logo:'https://buildmate.in/images/elite.png',    company:'Elite',            text:'High quality standards, regular interaction and prompt solutions. We are proud to be associated with Buildmate.' },
  { logo:'https://buildmate.in/images/eko.png',      company:'Eko',             text:"Buildmate's advanced technology allows complete solutions to ensure highly efficient and optimised processes with consistent final product quality." },
  { logo:'https://buildmate.in/images/rancare.png',  company:'RanCare',          text:'One of the keys to increase productivity and quality is continuous training of the machine and maintenance personnel.' },
  { logo:'https://buildmate.in/images/duralite.png', company:'Duralite',         text:'Designed according to our specific requirements. Our experience confirms that such indigenous solutions strengthen our market position.' },
]

// Real client logos from live site
const CLIENT_LOGOS = [
  'saudiaac','ecorex','elite','eko','rancare','duralite',
  'ultratech','espec','icom','vedam','earthpaver','bepl',
  'inventa','sahay','magna','pionner','kesoram','adityabirla'
]

const NEWS_ITEMS = [
  { cat:'Exhibition', title:'EXCON 13th Edition 2025', date:'09–13 Dec 2025', location:'Bengaluru', img:'https://buildmate.in/images/Excon_13th_edition.jpg', status:'Upcoming' },
  { cat:'Conference', title:'Fly Ash Utilisation Conference 2024', date:'22–24 Feb 2024', location:'Goa', img:'https://buildmate.in/images/fly_ash_utilisation_conference_2024.jpg', status:'Past' },
  { cat:'Trade Show', title:'World of Concrete 2024', date:'23–25 Jan 2024', location:'Las Vegas, USA', img:'https://buildmate.in/images/World_of_concrete_2024.jpg', status:'Past' },
]

// ── HERO ──────────────────────────────────────────────────────────
function HeroSection() {
  const [cur, setCur] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c+1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])
  const s = SLIDES[cur]
  return (
    <section className="relative h-screen min-h-[620px] overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div key={cur}
          initial={{ opacity:0, scale:1.04 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
          transition={{ duration:1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage:`url('${s.bg}')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-transparent"/>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent"/>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div key={`c${cur}`}
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
            transition={{ duration:0.65 }} className="max-w-3xl">
            <span className="section-label mb-3">{s.tag}</span>
            <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-tight">{s.h1}</h1>
            <p className="text-slate-300 text-lg max-w-xl mb-8 leading-relaxed">{s.sub}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Get Free Consultation <ArrowRight size={16}/></Link>
              <Link to="/products" className="btn-outline">Explore Products</Link>
              <a href="https://wa.me/917675989961" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded font-display font-semibold text-sm uppercase tracking-wide transition-colors">
                <Phone size={14}/> WhatsApp
              </a>
            </div>
            <div className="flex gap-2 mt-8">
              {SLIDES.map((_,i) => (
                <button key={i} onClick={() => setCur(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i===cur ? 'w-8 bg-accent' : 'w-4 bg-white/30'}`}/>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 bg-navy-900/85 backdrop-blur-md border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
          {STATS.map(s => (
            <div key={s.label} className="py-3 px-5 text-center">
              <div className="font-display font-bold text-2xl text-accent">{s.num}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

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
              <img src="https://buildmate.in/images/banner_whoweare.jpg" alt="Buildmate Engineering"
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
              <div className="h-48 overflow-hidden relative">
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
    { img:'https://buildmate.in/images/aacblock_seven_one.jpg',   title:'Light Weight',         desc:'3-4x lighter than red bricks — reduces dead load on structure and foundation costs.' },
    { img:'https://buildmate.in/images/aacblock_seven_two.jpg',   title:'Thermal Insulation',   desc:'Excellent thermal performance — reduces HVAC loads and energy consumption significantly.' },
    { img:'https://buildmate.in/images/aacblock_seven_three.jpg', title:'Fire Resistance',      desc:'Class A1 non-combustible. 4-hour fire rating for walls — meets all international safety standards.' },
    { img:'https://buildmate.in/images/aacblock_seven_four.jpg',  title:'Sound Insulation',     desc:'High STC ratings reduce sound transmission — ideal for residential, hospitality and commercial.' },
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
              <div className="h-44 overflow-hidden relative">
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
              <img src={`https://buildmate.in/images/${logo}.png`} alt={logo}
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

export default function Home() {
  return (
    <>
      <HeroSection/>
      <ProductsSection/>
      <AboutSection/>
      <WhyChooseSection/>
      <AdvantagesSection/>
      <ServicesSection/>
      <GlobalSection/>
      <AACSection/>
      <TestimonialsSection/>
      <ClientsSection/>
      <NewsSection/>
      <ContactCTA/>
    </>
  )
}
