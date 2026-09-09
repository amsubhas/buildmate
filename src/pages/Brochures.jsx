import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, Eye, ArrowRight, FileText } from 'lucide-react'

const FV = { hidden:{opacity:0,y:28}, visible:{opacity:1,y:0,transition:{duration:0.55,ease:[0.22,1,0.36,1]}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.07}} }
const VP = { once:true, margin:'-60px' }

const BROCHURES = [
  { id:'aac-plants', title:'AAC Plants', subtitle:'Autoclaved Aerated Concrete Manufacturing', category:'Manufacturing Plants', img:'/images/1_prod_aac_plant.png', pdf:'/brochures/pdf/Buildmate_01-AAC-Plants.pdf', pages:5, desc:'Buildmate branded technical brochure covering AAC plant engineering, production systems, equipment and project delivery.', highlights:['AAC plant solutions','Plant engineering','Production systems','Project delivery'], tag:'Flagship Product' },
  { id:'dry-mix-mortar', title:'Dry Mix Mortar Plants', subtitle:'Automated Dry Mortar Production', category:'Manufacturing Plants', img:'/images/4_prod_dry_mix_mortar_plants.png', pdf:'/brochures/pdf/Buildmate_02-Dry-Mix-Mortar-Plants.pdf', pages:5, desc:'Buildmate branded technical brochure covering dry mix mortar plant concepts, controlled dosing, handling and production configurations.', highlights:['5-50 TPH range','Tower or horizontal','Production systems','Automation'], tag:'Dry Mix' },
  { id:'precast-plants', title:'Precast Concrete Plants', subtitle:'Facades, Walls & Structural Elements', category:'Manufacturing Plants', img:'/images/5_prod_precast_concrete_plants.png', pdf:'/brochures/pdf/Buildmate_03-Precast-Concrete-Plants.pdf', pages:5, desc:'Buildmate branded technical brochure covering precast plant solutions, moulding, casting and handling systems.', highlights:['Precast systems','Casting solutions','Mould systems','Turnkey delivery'], tag:'Precast' },
  { id:'concrete-block-brick-plants', title:'Concrete Block / Brick Plants', subtitle:'Automated Concrete Product Manufacturing', category:'Manufacturing Plants', img:'/images/6_prod_concrete-block-plants.png', pdf:'/brochures/pdf/Buildmate_04-Concrete-Block-Brick-Plants.pdf', pages:5, desc:'Buildmate branded brochure for concrete block and brick plant solutions, production systems and applications.', highlights:['Block production','Brick systems','Automation','Product flexibility'], tag:'Block Plants' },
  { id:'stone-crushing', title:'Stone Crushing Plants', subtitle:'Aggregate Processing Systems', category:'Processing Equipment', img:'/images/2_prod_crushers_plant.png', pdf:'/brochures/pdf/Buildmate_05-Stone-Crushing-Plants.pdf', pages:5, desc:'Buildmate branded technical brochure covering stone crushing and aggregate processing plant solutions.', highlights:['Crushing systems','Screening','Material processing','Plant engineering'], tag:'Crushing' },
  { id:'concrete-blocks', title:'Concrete Blocks', subtitle:'Concrete Product Range', category:'Product Catalogue', img:'/images/6_concrete_block_plants.jpeg', pdf:'/brochures/pdf/Buildmate_06-Concrete-Blocks.pdf', pages:5, desc:'Buildmate branded product brochure covering concrete block products, characteristics and applications.', highlights:['Product range','Applications','Block products','Technical details'], tag:'Catalogue' },
  { id:'precast-elements', title:'Precast Concrete Elements', subtitle:'Structural & Architectural Elements', category:'Product Catalogue', img:'/images/5_precast_concrete_plants.jpeg', pdf:'/brochures/pdf/Buildmate_07-Precast-Concrete-Elements.pdf', pages:5, desc:'Buildmate branded product brochure covering precast concrete elements for architectural and structural applications.', highlights:['Walls & facades','Beams & elements','Staircases','Custom products'], tag:'Catalogue' },
  { id:'concrete-batching', title:'Concrete Batching Plants', subtitle:'Concrete Production Systems', category:'Manufacturing Plants', img:'/images/3_prod_concrete-batching-plants.png', pdf:'/brochures/pdf/Buildmate_08-Concrete-Batching-Plants.pdf', pages:5, desc:'Buildmate branded technical brochure covering batching plant configurations, mixing and material handling systems.', highlights:['Batching systems','Mixing solutions','Material handling','Plant layouts'], tag:'Batching' },
  { id:'cranes-pebs', title:'Cranes & PEBs', subtitle:'Material Handling & Steel Structures', category:'Equipment & Structures', img:'/images/7_prod_cranes.png', pdf:'/brochures/pdf/Buildmate_09-Cranes-and-PEBs.pdf', pages:5, desc:'Buildmate branded brochure covering crane systems and Pre-Engineered Building solutions for industrial facilities.', highlights:['Cranes','PEB systems','Industrial structures','Engineering solutions'], tag:'Equipment' },
  { id:'mixers', title:'Mixers', subtitle:'Industrial Mixing Solutions', category:'Equipment', img:'/images/8_prod_mixers.png', pdf:'/brochures/pdf/Buildmate_10-Mixers.pdf', pages:5, desc:'Buildmate branded technical brochure covering industrial mixer solutions and applications.', highlights:['Industrial mixers','Concrete mixing','Mortar mixing','Process applications'], tag:'Mixing' },
  { id:'special-projects', title:'Special Projects', subtitle:'Custom Industrial Engineering Solutions', category:'Special Projects', img:'/images/10_prod_special_projects.png', pdf:'/brochures/pdf/Buildmate_11-Special-Projects.pdf', pages:5, desc:'Buildmate branded brochure covering special project engineering and tailored industrial plant solutions.', highlights:['Custom projects','Engineering support','Tailored solutions','Project execution'], tag:'Special Projects' },
]

const CATS = ['All', ...Array.from(new Set(BROCHURES.map(b => b.category)))]

function BrochureCard({ b }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.article variants={FV} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="group relative bg-navy-900 rounded-2xl border border-white/8 overflow-hidden flex flex-col"
      style={{boxShadow:hover?'0 24px 60px rgba(0,0,0,.5)':'0 4px 20px rgba(0,0,0,.3)',transform:hover?'translateY(-6px)':'none',transition:'all .35s cubic-bezier(.23,1,.32,1)'}}>
      <div className="h-1 w-full bg-gradient-to-r from-[#192D78] via-[#2F4590] to-[#C8281E]"/>
      <div className="relative h-44 overflow-hidden bg-navy-800">
        <img src={b.img} alt={b.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700" style={{transform:hover?'scale(1.06)':'scale(1)',opacity:.65}}/>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/35 to-transparent"/>
        <div className="absolute top-3 left-3"><span className="text-[10px] font-display font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white border border-white/20 bg-[#192D78]/85">{b.tag}</span></div>
        <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] text-white/70 font-display"><FileText size={10}/><span>{b.pages} pages</span></div>
        <div className="absolute bottom-3 left-4 right-4"><div className="text-[10px] font-display uppercase tracking-widest text-white/60 mb-0.5">{b.category}</div><h3 className="font-display font-bold text-white text-lg leading-tight">{b.title}</h3></div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">{b.desc}</p>
        <div className="grid grid-cols-2 gap-1.5 mb-5">
          {b.highlights.map(h => <div key={h} className="flex items-center gap-1.5 text-[11px] text-slate-300"><span className="w-1.5 h-1.5 rounded-full bg-[#C8281E] shrink-0"/>{h}</div>)}
        </div>
        <div className="flex gap-2">
          <a href={b.pdf} target="_blank" rel="noopener noreferrer" download className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gradient-to-r from-[#192D78] to-[#2F4590] text-white text-xs font-display font-bold uppercase tracking-wider transition-all hover:opacity-90 hover:scale-[1.02]"><Download size={13}/> View / Download</a>
          <Link to={`/products#${b.id.split('-')[0]}`} className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-display font-bold uppercase tracking-wider border border-white/15 text-slate-300 hover:border-white/40 hover:text-white transition-all"><Eye size={13}/> View</Link>
        </div>
      </div>
    </motion.article>
  )
}

export default function Brochures() {
  const [activeCat, setActiveCat] = useState('All')
  const filtered = activeCat === 'All' ? BROCHURES : BROCHURES.filter(b => b.category === activeCat)
  return (
    <div>
      <section className="relative py-24 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"/>
        <div className="absolute inset-0 bg-gradient-to-br from-[#192D78]/25 to-[#C8281E]/10"/>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-cover bg-center hidden lg:block" style={{backgroundImage:"url('/images/1_prod_aac_plant.png')"}}/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Resource Library</p>
          <h1 className="section-title text-5xl text-white mb-4">Technical Brochures &amp;<br/><span className="text-[#C8281E]">Product Catalogues</span></h1>
          <p className="text-slate-300 max-w-xl leading-relaxed mb-6">Download the Buildmate branded technical brochure collection with product information, process content and engineering references.</p>
          <div className="flex flex-wrap gap-3">
            <a href="/brochures/Buildmate-Brochures-2026.zip" download className="btn-primary flex items-center gap-2"><Download size={15}/> Download All Brochures</a>
            <Link to="/contact" className="btn-outline">Request Printed Copy</Link>
          </div>
          <div className="flex flex-wrap gap-6 mt-8">
            {[['11','Product Brochures'],['55','Technical Pages'],['Free','Download'],['PDF','Format']].map(([n,l]) => <div key={l} className="flex items-center gap-2"><span className="font-display font-bold text-2xl text-[#192D78]">{n}</span><span className="text-slate-400 text-xs uppercase tracking-wide font-display">{l}</span></div>)}
          </div>
        </div>
      </section>
      <div className="divider"/>
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATS.map(cat => <button key={cat} onClick={() => setActiveCat(cat)} className="px-5 py-2 rounded-full text-sm font-display font-semibold uppercase tracking-wide transition-all" style={activeCat===cat?{background:'linear-gradient(135deg,#192D78,#2F4590)',color:'#fff',boxShadow:'0 4px 16px rgba(25,45,120,.4)'}:{background:'transparent',color:'#94a3b8',border:'1px solid rgba(255,255,255,.1)'}}>{cat}</button>)}
          </div>
          <AnimatePresence mode="wait"><motion.div key={activeCat} variants={SC} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">{filtered.map(b => <BrochureCard key={b.id} b={b}/>)}</motion.div></AnimatePresence>
        </div>
      </section>
      <section className="py-16 bg-navy-900 border-t border-white/5"><div className="max-w-4xl mx-auto px-4 sm:px-6 text-center"><h2 className="section-title text-3xl text-white mb-4">Need a Custom Technical Proposal?</h2><p className="text-slate-400 mb-8 max-w-xl mx-auto">Our engineering team can prepare a customised technical proposal for your project requirements.</p><div className="flex flex-wrap justify-center gap-3"><Link to="/contact" className="btn-primary">Request Custom Proposal <ArrowRight size={15}/></Link><a href="https://wa.me/917675989961" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-lg font-display font-bold text-sm uppercase tracking-wide transition-all hover:scale-105">WhatsApp Us</a></div></div></section>
    </div>
  )
}
