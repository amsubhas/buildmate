import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, Eye, X, ArrowRight, FileText, ExternalLink } from 'lucide-react'

const FV = { hidden:{opacity:0,y:28}, visible:{opacity:1,y:0,transition:{duration:0.55,ease:[0.22,1,0.36,1]}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.07}} }
const VP = { once:true, margin:'-60px' }

const BROCHURES = [
  {
    id:'aac-plants',
    title:'AAC Plants',
    subtitle:'Autoclaved Aerated Concrete Manufacturing',
    category:'Manufacturing Plants',
    img:'/images/1_prod_aac_plant.png',
    pdf:'/brochures/pdf/AAC PLANTS-n.pdf',
    color:'#233C82',
    accent:'#465A96',
    pages:'16',
    desc:'Complete technical guide to Buildmate AAC Block Plant technology — capacity options from 30,000 to 300,000 m\u00b3/year, process flow, automation systems, project references and commissioning details.',
    highlights:['Capacity: 30K\u2013300K m\u00b3/yr','Fully automated PLC/SCADA','Proprietary autoclave design','Complete turnkey delivery'],
    tag:'Flagship Product',
  },
  {
    id:'precast-plants',
    title:'Precast Concrete Plants',
    subtitle:'Facades, Walls & Structural Elements',
    category:'Manufacturing Plants',
    img:'/images/5_prod_precast_concrete_plants.png',
    pdf:'/brochures/pdf/PRECAST CONCRETE PLANT-n.pdf',
    color:'#1a3060',
    accent:'#233C82',
    pages:'12',
    desc:'Precision precast concrete manufacturing facilities for facades, structural walls, bridge elements and infrastructure components with advanced mold and curing systems.',
    highlights:['Custom mold systems','Steam curing chambers','Automated demoulding','Precast facades & walls'],
    tag:'Structural',
  },
  {
    id:'concrete-batching',
    title:'Concrete Batching Plants',
    subtitle:'Ready-Mix & Site Concrete Production',
    category:'Manufacturing Plants',
    img:'/images/3_prod_concrete-batching-plants.png',
    pdf:'/brochures/pdf/Concrete Batching Plant.pdf',
    color:'#1e2d50',
    accent:'#233C82',
    pages:'10',
    desc:'High-output ready-mix and site concrete batching plants with precise metering, twin-shaft mixers, automated material handling and advanced SCADA control systems.',
    highlights:['30\u2013240 m\u00b3/hr output','Twin-shaft mixer','Automated aggregate feed','Remote monitoring'],
    tag:'Batching',
  },
  {
    id:'dry-mix-mortar',
    title:'Dry Mix Mortar Plants',
    subtitle:'Tile Adhesive, Plaster & Grout Production',
    category:'Manufacturing Plants',
    img:'/images/4_prod_dry_mix_mortar_plants.png',
    pdf:'/brochures/pdf/DRY READY MIX MORTOR PLANT-n.pdf',
    color:'#152545',
    accent:'#233C82',
    pages:'10',
    desc:'Automated dry-mix mortar production lines for tile adhesives, wall plastering, waterproofing compounds and grouting mortars with advanced weighing and bagging systems.',
    highlights:['5\u201320 TPH production','Precision weighing','Automated silo filling','Full SCADA control'],
    tag:'Dry Mix',
  },
  {
    id:'concrete-block-plants',
    title:'Concrete Block Plants',
    subtitle:'Hollow, Solid & Paving Brick Manufacturing',
    category:'Manufacturing Plants',
    img:'/images/6_prod_concrete-block-plants.png',
    pdf:'/brochures/pdf/CONCRETE BLOCK PLANT-n.pdf',
    color:'#1a2a40',
    accent:'#233C82',
    pages:'10',
    desc:'High-speed vibro-press concrete block manufacturing systems for hollow blocks, solid blocks, paving stones and kerbstones with automated curing rack systems.',
    highlights:['2,000\u201310,000 blocks/hr','Vibro-press technology','Multiple block formats','Paver capability'],
    tag:'Block Plants',
  },
  {
    id:'stone-crushing',
    title:'Stone Crushing Plants',
    subtitle:'Aggregate Processing & Quarrying Systems',
    category:'Processing Equipment',
    img:'/images/2_prod_crushers_plant.png',
    pdf:'/brochures/pdf/StoneCrushingPlants.pdf',
    color:'#1e3050',
    accent:'#233C82',
    pages:'8',
    desc:'Heavy-duty rock and aggregate crushing systems for construction, mining and quarrying applications including jaw, cone and VSI crushers with multi-stage screening.',
    highlights:['50\u20131000 TPH capacity','Jaw, Cone & VSI crushers','Multi-stage screening','Dust suppression'],
    tag:'Crushing',
  },
  {
    id:'cranes-peb',
    title:'Cranes & PEB Systems',
    subtitle:'Material Handling & Steel Structures',
    category:'Equipment & Structures',
    img:'/images/7_prod_cranes.png',
    pdf:'/brochures/pdf/Cranes,PEBs.pdf',
    color:'#0d1f42',
    accent:'#233C82',
    pages:'14',
    desc:'Industrial overhead and gantry cranes combined with Pre-Engineered Building steel structure manufacturing plants for complete industrial facility solutions.',
    highlights:['1T\u2013100T cranes','EOT & HOT types','PEB roll-forming lines','CNC fabrication'],
    tag:'Equipment',
  },
  {
    id:'concrete-blocks-elements',
    title:'Concrete Blocks Catalogue',
    subtitle:'Product Range & Specifications',
    category:'Product Catalogue',
    img:'/images/6_prod_concrete-block-plants.png',
    pdf:'/brochures/ConcreteBlocks.pdf',
    color:'#122550',
    accent:'#465A96',
    pages:'8',
    desc:'Complete product catalogue covering the full range of concrete block and brick types manufactured on Buildmate plants, including technical specifications and quality standards.',
    highlights:['Full product range','Technical specs','Quality standards','Application guide'],
    tag:'Catalogue',
  },
  {
    id:'precast-elements',
    title:'Precast Concrete Elements',
    subtitle:'Structural & Architectural Product Range',
    category:'Product Catalogue',
    img:'/images/5_prod_precast_concrete_plants.png',
    pdf:'/brochures/PrecastConcreteElements.pdf',
    color:'#1a2f5e',
    accent:'#465A96',
    pages:'12',
    desc:'Comprehensive catalogue of precast concrete elements manufactured on Buildmate plants including facades, structural walls, slabs, beams and infrastructure components.',
    highlights:['Facades & walls','Structural elements','Bridge components','Custom molds'],
    tag:'Catalogue',
  },
]

const CATS = ['All', ...Array.from(new Set(BROCHURES.map(b => b.category)))]

function BrochureCard({ b }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.div variants={FV}
      className="group relative bg-navy-900 rounded-2xl border border-white/8 overflow-hidden flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        boxShadow: hover ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${b.color}55` : '0 4px 20px rgba(0,0,0,0.3)',
        transform: hover ? 'translateY(-6px)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)',
      }}>

      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${b.color}, ${b.accent}, #D72D23)` }}/>

      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-navy-800 flex-shrink-0">
        <img
          src={b.img}
          alt={b.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hover ? 'scale(1.06)' : 'scale(1)', opacity: 0.65 }}
          onError={e => {
            e.target.onerror = null
            e.target.src = 'https://buildmate.in/images/' + b.img.replace('/images/','')
          }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${b.color}ee 0%, ${b.color}44 50%, transparent 100%)` }}/>

        {/* Tag badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-display font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white border border-white/20"
            style={{ background: `${b.color}cc`, backdropFilter:'blur(8px)' }}>
            {b.tag}
          </span>
        </div>

        {/* Page count */}
        <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] text-white/60 font-display">
          <FileText size={10}/>
          <span>{b.pages} pages</span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="text-[10px] font-display uppercase tracking-widest text-white/60 mb-0.5">{b.category}</div>
          <h3 className="font-display font-bold text-white text-lg leading-tight">{b.title}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">{b.desc}</p>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-1.5 mb-5">
          {b.highlights.map(h => (
            <div key={h} className="flex items-center gap-1.5 text-[11px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: b.color }}/>
              {h}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <a
            href={b.pdf}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-white text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${b.color}, ${b.accent})` }}
            onClick={e => {
              const fullUrl = window.location.origin + b.pdf
              e.currentTarget.href = fullUrl
            }}
          >
            <Download size={13}/> Download PDF
          </a>
          <Link
            to={`/products#${b.id.split('-')[0]}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-display font-bold uppercase tracking-wider border border-white/15 text-slate-300 hover:border-white/40 hover:text-white transition-all duration-200">
            <Eye size={13}/> View
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function Brochures() {
  const [activeCat, setActiveCat] = useState('All')
  const filtered = activeCat === 'All' ? BROCHURES : BROCHURES.filter(b => b.category === activeCat)

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-24 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"/>
        <div className="absolute inset-0" style={{ background:'linear-gradient(135deg, rgba(35,60,130,0.25) 0%, rgba(215,45,35,0.08) 100%)' }}/>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-cover bg-center hidden lg:block"
          style={{ backgroundImage:"url('/images/1_prod_aac_plant.png')" }}/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Resource Library</p>
          <h1 className="section-title text-5xl text-white mb-4">
            Technical Brochures &amp;<br/>
            <span style={{ color:'#D72D23' }}>Product Catalogues</span>
          </h1>
          <p className="text-slate-300 max-w-xl leading-relaxed mb-6">
            Download detailed technical brochures for all Buildmate products — specifications, capacity ranges,
            process flows, project references and commissioning details.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/brochures/pdf/AAC PLANTS-n.pdf" download
              className="btn-primary flex items-center gap-2">
              <Download size={15}/> Download All Brochures
            </a>
            <Link to="/contact" className="btn-outline">Request Printed Copy</Link>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[['9','Product Brochures'],['50+','Technical Pages'],['Free','Download'],['PDF','Format']].map(([n,l]) => (
              <div key={l} className="flex items-center gap-2">
                <span className="font-display font-bold text-2xl" style={{ color:'#233C82' }}>{n}</span>
                <span className="text-slate-400 text-xs uppercase tracking-wide font-display">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider"/>

      {/* Brochures grid */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Category filter */}
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}
            className="flex flex-wrap gap-2 mb-10">
            {CATS.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                className="px-5 py-2 rounded-full text-sm font-display font-semibold uppercase tracking-wide transition-all duration-250"
                style={activeCat===cat
                  ? { background:'linear-gradient(135deg,#233C82,#465A96)', color:'#fff', boxShadow:'0 4px 16px rgba(35,60,130,0.4)' }
                  : { background:'transparent', color:'#94a3b8', border:'1px solid rgba(255,255,255,0.1)' }
                }>
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCat}
              variants={SC} initial="hidden" animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map(b => <BrochureCard key={b.id} b={b}/>)}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-navy-900 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <h2 className="section-title text-3xl text-white mb-4">Need a Custom Technical Proposal?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Our engineering team can prepare a customised technical proposal and quotation for your specific project requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary">Request Custom Proposal <ArrowRight size={15}/></Link>
              <a href="https://wa.me/917675989961" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-lg font-display font-bold text-sm uppercase tracking-wide transition-all hover:scale-105">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
