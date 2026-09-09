import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, User } from 'lucide-react'

const FV = { hidden:{opacity:0,y:25}, visible:{opacity:1,y:0,transition:{duration:0.55}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.08}} }
const VP = { once:true, margin:'-80px' }

const CATS = ['All','AAC Technology','Industrial Automation','Sustainable Construction','Precast Engineering','Block Plants']

const posts = [
  { cat:'AAC Technology', title:'How AAC Blocks Are Revolutionizing Green Construction in India', excerpt:'Autoclaved Aerated Concrete is transforming construction with superior thermal insulation, lightweight properties and a sustainable production process that uses fly ash waste.', date:'Dec 2024', author:'Buildmate Team', read:'5 min', img:'/images/aacblock_seven_one.jpg' },
  { cat:'Precast Engineering', title:'Benefits of Precast Concrete in Modern High-Rise Construction', excerpt:'Precast concrete elements are accelerating timelines, improving quality consistency and reducing waste on projects from residential towers to bridges and infrastructure.', date:'Nov 2024', author:'Engineering Dept', read:'6 min', img:'/images/5_prod_precast_concrete_plants.png' },
  { cat:'Industrial Automation', title:'Industry 4.0 in Concrete and AAC Plant Manufacturing', excerpt:'Smart sensors, IoT connectivity and AI-driven process optimisation are transforming how AAC and concrete batching plants operate, maintain themselves and deliver quality.', date:'Oct 2024', author:'R&D Team', read:'7 min', img:'/images/9_prod_pre_engineered_buildings.png' },
  { cat:'Sustainable Construction', title:'Fly Ash Utilisation in AAC and FCB Block Production', excerpt:'Converting industrial waste fly ash into high-strength building blocks reduces landfill burden, lowers carbon emissions and cuts production costs simultaneously.', date:'Sep 2024', author:'Buildmate Team', read:'5 min', img:'/images/High-End-Automated-Fly-ash-brick.png' },
  { cat:'AAC Technology', title:'AAC vs Red Brick: A Comprehensive Technical Comparison', excerpt:'An in-depth comparison of Autoclaved Aerated Concrete blocks versus traditional red clay bricks across strength, thermal, acoustic and sustainability parameters.', date:'Jul 2024', author:'Engineering Dept', read:'6 min', img:'/images/aacblock_seven_two.jpg' },
  { cat:'Block Plants', title:'Choosing the Right Concrete Block Plant: Vibro-Press vs Hydraulic', excerpt:'A technical guide to selecting between vibro-press and hydraulic block manufacturing systems based on output, block types, quality requirements and budget.', date:'Jun 2024', author:'Engineering Dept', read:'5 min', img:'/images/6_prod_concrete-block-plants.png' },
  { cat:'Industrial Automation', title:'SCADA Systems for AAC Plant Monitoring and Control', excerpt:'How modern SCADA and PLC systems are enabling remote monitoring, real-time quality control and predictive maintenance in AAC block manufacturing plants.', date:'May 2024', author:'Automation Team', read:'6 min', img:'/images/8_prod_mixers.png' },
  { cat:'Precast Engineering', title:'Calcium Silicate Boards: Production Technology and Applications', excerpt:'A technical deep-dive into calcium silicate board manufacturing processes, raw material selection, pressing and curing technology and market applications.', date:'Apr 2024', author:'R&D Team', read:'7 min', img:'/images/calcium-silicate_fiber-boards.png' },
]

export default function Blog() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? posts : posts.filter(p => p.cat === active)
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-800"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Blog</p>
          <h1 className="section-title text-5xl text-white mb-4">Insights & Engineering Knowledge</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Technical articles, industry insights and AAC/precast engineering knowledge from the Buildmate team.</p>
        </div>
      </section>
      <div className="divider"/>
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-display uppercase tracking-wide transition-all ${active===c ? 'bg-accent text-white' : 'border border-white/10 text-slate-400 hover:border-accent hover:text-accent'}`}>
                {c}
              </button>
            ))}
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {filtered.map(p => (
              <motion.div key={p.title} variants={FV}
                className="group bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all flex flex-col">
                <div className="h-48 overflow-hidden shrink-0">
                  <img src={p.img} alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                    onError={e => { e.target.style.display='none' }}/>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-display uppercase tracking-wider text-gold mb-2">{p.cat}</span>
                  <h3 className="font-display font-semibold text-white text-lg leading-snug mb-3 flex-1">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{p.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><User size={10}/> {p.author}</span>
                      <span className="flex items-center gap-1"><Clock size={10}/> {p.read}</span>
                    </div>
                    <span>{p.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
