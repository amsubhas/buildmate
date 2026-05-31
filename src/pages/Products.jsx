
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { HashLink } from 'react-router-hash-link'
import { scrollWithOffset } from '../utils/scroll'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight, ExternalLink, Zap, Leaf } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:'easeOut'}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.08}} }
const VP = { once:true, margin:'-80px' }

// ── AAC Sister-Site Banner ───────────────────────────────────────
function AACSisterBanner() {
  return (
    <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}
      className="mb-12 relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage:"url('https://buildmate.in/images/1_prod_aac_plant.png')" }}/>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 to-transparent"/>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="section-label">Dedicated AAC Portal</span>
            <span className="text-xs bg-accent/20 text-accent border border-accent/30 px-2 py-0.5 rounded-full font-display uppercase tracking-wider">Sister Site</span>
          </div>
          <h3 className="section-title text-2xl text-white mb-2">
            Explore Our Dedicated AAC Plant Website
          </h3>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Visit <span className="text-accent font-semibold">aacplantmanufacturers.com</span> — our specialised portal for
            AAC Block Plant technology, specifications, capacity options, case studies and detailed technical resources.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a href="https://www.aacplantmanufacturers.com/" target="_blank" rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 whitespace-nowrap">
            Visit AAC Plant Site <ExternalLink size={15}/>
          </a>
          <Link to="/contact" className="btn-outline whitespace-nowrap">Request Quote</Link>
        </div>
      </div>
    </motion.div>
  )
}

// ── Product card component ───────────────────────────────────────
function ProductCard({ p, index }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    const gx = Math.round(x * 100 + 50)
    const gy = Math.round(y * 100 + 50)
    card.style.transform     = `perspective(1000px) rotateY(${x*10}deg) rotateX(${-y*7}deg) scale(1.015) translateZ(0)`
    card.style.background    = `radial-gradient(circle at ${gx}% ${gy}%, rgba(14,165,233,0.08), rgba(13,31,60,0.7) 60%)`
    card.style.boxShadow     = `${-x*20}px ${-y*16}px 40px rgba(0,0,0,0.4), 0 0 30px rgba(14,165,233,${0.08+Math.abs(x)*0.1})`
    card.style.borderColor   = `rgba(14,165,233,${0.2+Math.abs(x)*0.2})`
  }
  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform   = ''
    card.style.background  = ''
    card.style.boxShadow   = ''
    card.style.borderColor = ''
    card.style.transition  = 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease'
    setTimeout(() => { if (card) card.style.transition = '' }, 500)
  }

  return (
    <motion.div ref={cardRef} id={p.id} variants={FV}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="bg-navy-800 rounded-2xl overflow-hidden border border-white/5 transition-all will-change-transform group"
      style={{ transformStyle:'preserve-3d', cursor:'default' }}>
      <div className="relative h-52 overflow-hidden">
        <img src={p.img} alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
          onError={e => { e.target.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=60'; e.target.style.opacity='0.4' }}/>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-800 to-transparent"/>
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="text-xs font-display uppercase tracking-wider text-gold bg-navy-900/80 px-3 py-1 rounded-full border border-white/10">
            {p.tag}
          </span>
          {p.badge && (
            <span className="text-xs font-display uppercase tracking-wider bg-accent/20 text-accent border border-accent/30 px-3 py-1 rounded-full">
              {p.badge}
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="section-title text-2xl text-white">{p.name}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.overview}</p>

        {/* Sub-categories (Precast Facades/Walls, Materials) */}
        {p.subcats && (
          <div className="flex flex-wrap gap-2 mb-4">
            {p.subcats.map(s => (
              <span key={s} className="text-xs font-display uppercase tracking-wide px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-lg">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-xs font-display uppercase tracking-wider text-accent mb-2">Key Features</p>
            <ul className="space-y-1">
              {p.features.slice(0,4).map(f => (
                <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                  <ChevronRight size={12} className="text-accent mt-0.5 shrink-0"/> {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-display uppercase tracking-wider text-gold mb-2">Applications</p>
            <ul className="space-y-1">
              {p.applications.map(a => (
                <li key={a} className="flex items-start gap-2 text-xs text-slate-300">
                  <ChevronRight size={12} className="text-gold mt-0.5 shrink-0"/> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {p.id === 'aac' ? (
            <a href="https://www.aacplantmanufacturers.com/" target="_blank" rel="noopener noreferrer"
              className="btn-primary text-xs flex items-center gap-1.5">
              AAC Plant Details <ExternalLink size={12}/>
            </a>
          ) : (
            <Link to="/contact" className="btn-primary text-xs">Request Quote <ArrowRight size={13}/></Link>
          )}
          <a href="https://buildmate.in/enquiry.php" target="_blank" rel="noopener noreferrer"
            className="btn-outline text-xs">Product Enquiry</a>
        </div>
      </div>
    </motion.div>
  )
}

// ── All products data ────────────────────────────────────────────
const CLIENT_BRIEF_PRODUCTS = [
  {
    id:'aac', name:'AAC Plants', tag:'Autoclaved Aerated Concrete', badge:'Flagship',
    img:'https://buildmate.in/images/1_prod_aac_plant.png',
    overview:"Complete Autoclaved Aerated Concrete (AAC) block manufacturing plants from 30,000 to 300,000 m³/year. Fully automated with proprietary autoclave and slurry preparation systems. India's leading AAC plant manufacturer since 1991.",
    features:['30K–300K m³/yr capacity','Fully automated PLC/SCADA','Proprietary autoclave design','Fly ash & sand-based processing','Energy-efficient steam curing','Complete turnkey delivery'],
    applications:['Residential construction','Commercial buildings','Green building projects','Affordable housing','Industrial facilities']
  },
  {
    id:'precast', name:'Precast Concrete Plants', tag:'Precast Solutions',
    subcats:['Precast Facades','Precast Walls','Structural Elements','Precast Slabs'],
    img:'https://buildmate.in/images/5_prod_precast_concrete_plants.png',
    overview:'Complete precast concrete manufacturing facilities for facades, walls, structural elements and infrastructure components. Includes precision mold systems, vibration tables and steam curing chambers.',
    features:['Custom mold systems','High-pressure vibration','Steam curing chambers','Automated demoulding','Reinforcement handling','Precast facades & walls'],
    applications:['Building facades','Precast walls','Bridge elements','Tunnel segments','Structural slabs']
  },
  {
    id:'peb', name:'PEB (Pre-Engineered Buildings)', tag:'Steel Structures',
    img:'https://buildmate.in/images/9_prod_pre_engineered_buildings.png',
    overview:'Pre-Engineered Building steel manufacturing plants with roll-forming, welding and CNC cutting lines for rapid industrial and commercial structures.',
    features:['Custom section profiles','CNC roll-forming lines','Automatic welding systems','Coating & painting lines','Engineering design support','Fast delivery programs'],
    applications:['Industrial warehouses','Aircraft hangars','Sports facilities','Commercial buildings','Cold storage']
  },
  {
    id:'carbon', name:'Carbon Capture Plants', tag:'Sustainable Technology', badge:'Green',
    img:'https://buildmate.in/images/calcium-silicate_fiber-boards.png',
    overview:'Next-generation CO₂ capture and utilisation systems integrated into industrial manufacturing processes. Converts carbon emissions into construction-grade materials, enabling net-zero production.',
    features:['CO₂ capture & utilisation','Industrial emission reduction','Construction material conversion','Net-zero manufacturing','ESG compliance ready','Modular integration design'],
    applications:['AAC & FCB plants','Cement industries','Power plant integration','Industrial emission control','Net-zero factories']
  },
  {
    id:'fcb', name:'FCB Plants', tag:'Fly Ash Calcium Brick',
    img:'https://buildmate.in/images/High-End-Automated-Fly-ash-brick.png',
    overview:'High-end automated Fly Ash Calcium Brick (FCB) manufacturing plants — converting industrial fly ash waste into high-strength, environmentally friendly building bricks at scale.',
    features:['Fly ash utilisation 60%+','High-strength output blocks','Fully automated pressing','Steam autoclave curing','Zero waste production','ISO quality standards'],
    applications:['High-strength bricks','Eco-friendly construction','Fly ash waste utilisation','Green building materials','Export markets']
  },
]

const EXTRA_PRODUCTS = [
  {
    id:'crushing', name:'Stone Crushing Plants', tag:'Aggregate Processing',
    img:'https://buildmate.in/images/2_prod_crushers_plant.png',
    overview:'Heavy-duty rock and aggregate crushing systems for construction, mining and quarrying. Jaw, cone and VSI crushers with multi-stage screening.',
    features:['50–1000 TPH capacity','Jaw, Cone & VSI crushers','Multi-stage screening','Dust suppression systems','PLC automation'],
    applications:['Road construction','Concrete aggregate','Railway ballast','Building construction']
  },
  {
    id:'batching', name:'Concrete Batching Plants', tag:'Ready Mix',
    img:'https://buildmate.in/images/3_prod_concrete-batching-plants.png',
    overview:'High-output ready-mix and site concrete batching plants with precise metering, automated material handling and advanced SCADA control.',
    features:['30–240 m³/hr output','Twin-shaft mixer','Automated aggregate feed','Cement & admixture batching','Remote monitoring'],
    applications:['Ready-mix concrete','Infrastructure','Dam construction','Precast production']
  },
  {
    id:'drymix', name:'Dry Mix Mortar Plants', tag:'Dry Mortar',
    img:'https://buildmate.in/images/4_prod_dry_mix_mortar_plants.png',
    overview:'Automated dry-mix mortar production for tile adhesives, wall plastering and grouting mortar. Advanced weighing and bagging systems.',
    features:['5–20 TPH production','Precision weighing','Automated silo filling','Bagging & bulk options','Full SCADA control'],
    applications:['Tile adhesives','Wall plaster','Joint fillers','Waterproofing']
  },
  {
    id:'block', name:'Concrete Block Plants', tag:'Block Manufacturing',
    img:'https://buildmate.in/images/6_prod_concrete-block-plants.png',
    overview:'High-speed concrete hollow block, solid block and paving brick manufacturing with vibro-press technology and automated curing rack systems.',
    features:['2000–10000 blocks/hr','Vibro-press technology','Automated curing racks','Multiple block formats','Paver capability'],
    applications:['Hollow blocks','Paving stones','Kerbstones','Solid bricks']
  },
  {
    id:'cranes', name:'Cranes', tag:'Material Handling',
    img:'https://buildmate.in/images/7_prod_cranes.png',
    overview:'Industrial overhead, gantry and jib cranes for manufacturing plant operations and precision material handling.',
    features:['1T–100T capacity','EOT & HOT types','Radio remote control','Anti-collision systems','VFD drives'],
    applications:['Plant material handling','Precast operations','Steel fabrication','Heavy machinery']
  },
  {
    id:'mixers', name:'Mixers', tag:'Mixing Equipment',
    img:'https://buildmate.in/images/8_prod_mixers.png',
    overview:'Heavy-duty planetary, twin-shaft and pan mixers for AAC slurry, concrete and specialty material production.',
    features:['0.5–6 m³ capacity','Twin-shaft & planetary','Wear-resistant liners','Quick discharge gate','Easy maintenance'],
    applications:['AAC slurry','Concrete mixing','Dry mortar','Industrial materials']
  },
  {
    id:'special', name:'Special Projects', tag:'Custom Engineering',
    img:'https://buildmate.in/images/10_prod_special_projects.png',
    overview:'Bespoke plant solutions including calcium silicate board plants, fibre cement board lines and custom industrial engineering.',
    features:['Calcium silicate board lines','Fibre cement board systems','Fire-rated panel production','Custom process engineering','Novel material solutions'],
    applications:['Board manufacturing','Novel building materials','Export markets','Custom requirements']
  },
]

export default function Products() {
  return (
    <div>
      {/* Banner */}
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage:"url('https://buildmate.in/images/1_aac_plants.jpg')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/50"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Products</p>
          <h1 className="section-title text-5xl text-white mb-4 max-w-2xl">Industrial Plant Solutions Portfolio</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">
            Complete range — AAC, Precast, PEB, Carbon Capture, FCB, Materials and more.
            Designed, fabricated and commissioned globally since 1991.
          </p>
        </div>
      </section>
      <div className="divider"/>

      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* ── AAC Sister-Site Banner ── */}
          <AACSisterBanner/>

          {/* ── Section heading: PLANTS (from client brief) ── */}
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP} className="mb-8">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/30"/>
              <h2 className="section-title text-3xl text-white tracking-widest uppercase px-4">Plants</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/30"/>
            </div>
            <p className="text-slate-400 text-sm text-center mt-2">Core client-specified product lines from the Buildmate portfolio</p>
          </motion.div>

          {/* ── Client-brief products (AAC, Precast, PEB, Carbon, FCB) ── */}
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {CLIENT_BRIEF_PRODUCTS.map((p,i) => <ProductCard key={p.id} p={p} index={i}/>)}
          </motion.div>

          {/* ── Materials Section ── */}
          <section id="materials">
            <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP} className="mb-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-green-500/30"/>
                <h2 className="section-title text-3xl text-white tracking-widest uppercase px-4">Materials</h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-green-500/30"/>
              </div>
              <p className="text-slate-400 text-sm text-center mt-2">Raw material supply for AAC, precast and construction applications</p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
              {[
                {
                  icon:'🪨', name:'Lime', color:'from-amber-600/15',
                  desc:'High-purity quicklime and hydrated lime supply specifically processed for AAC block manufacturing. Consistent quality with reliable supply chain management to keep your plant running.',
                  specs:['High reactivity quicklime','Hydrated lime (Ca(OH)₂)','AAC-grade purity','Consistent particle size','Reliable bulk supply','Quality certificates'],
                  uses:['AAC block production','FCB manufacturing','Soil stabilisation','Construction mortar']
                },
                {
                  icon:'🌫️', name:'Fly Ash', color:'from-slate-500/15',
                  desc:'Processed Class C & Class F fly ash for AAC, FCB and precast applications. Fly ash utilisation reduces carbon footprint, enhances product quality and lowers raw material costs.',
                  specs:['Class C & Class F grades','Controlled fineness','Low carbon content','High pozzolanicity','Bulk tanker supply','BIS-compliant quality'],
                  uses:['AAC slurry component','FCB bricks (60%+)','Concrete replacement','Carbon capture feedstock']
                }
              ].map(m => (
                <motion.div key={m.name} variants={FV}
                  className={`p-8 rounded-2xl bg-gradient-to-br ${m.color} bg-navy-800 border border-white/5 hover:border-accent/25 transition-all group`}>
                  <div className="flex items-start gap-5">
                    <div className="text-4xl">{m.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="section-title text-2xl text-white">{m.name}</h3>
                        <span className="text-xs font-display uppercase tracking-wider text-slate-500 border border-white/10 px-2 py-0.5 rounded">Material Supply</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-5">{m.desc}</p>
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        <div>
                          <p className="text-xs font-display uppercase tracking-wider text-accent mb-2">Specifications</p>
                          <ul className="space-y-1">
                            {m.specs.map(s => (
                              <li key={s} className="flex items-center gap-2 text-xs text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"/>{s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-display uppercase tracking-wider text-gold mb-2">Used In</p>
                          <ul className="space-y-1">
                            {m.uses.map(u => (
                              <li key={u} className="flex items-center gap-2 text-xs text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"/>{u}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Link to="/contact" className="btn-primary text-xs">Enquire Supply <ArrowRight size={13}/></Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── Other Equipment (from live site) ── */}
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP} className="mb-8">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-500/30"/>
              <h2 className="section-title text-2xl text-white tracking-widest uppercase px-4">Other Equipment</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-500/30"/>
            </div>
            <p className="text-slate-400 text-sm text-center mt-2">Additional industrial equipment from the Buildmate portfolio</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {EXTRA_PRODUCTS.map((p,i) => <ProductCard key={p.id} p={p} index={i}/>)}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
