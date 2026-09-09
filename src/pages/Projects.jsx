import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Settings, ArrowRight } from 'lucide-react'

const FV = { hidden:{opacity:0,y:25}, visible:{opacity:1,y:0,transition:{duration:0.55}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.07}} }
const VP = { once:true, margin:'-80px' }

// Real projects from buildmate.in/plants-under-operation.php
const OPERATION = [
  { name:'Ultratech AAC',             location:'Lucknow, Uttar Pradesh',  type:'AAC Plant',  cap:'500 m³/day',  logo:'ultratech' },
  { name:'Aditya Birla AAC',          location:'Multiple, India',         type:'AAC Plant',  cap:'400 m³/day',  logo:'adityabirla' },
  { name:'Kesoram Industries',        location:'Hyderabad, Telangana',     type:'AAC Plant',  cap:'300 m³/day',  logo:'kesoram' },
  { name:'Saudi AAC Blocks',          location:'Riyadh, Saudi Arabia',     type:'AAC Plant',  cap:'500 m³/day',  logo:'saudiaac' },
  { name:'Ecorex',                    location:'UAE',                      type:'Batching',   cap:'60 m³/hr',    logo:'ecorex' },
  { name:'Elite Industries',          location:'Hyderabad, Telangana',     type:'Block Plant',cap:'5000 blk/hr', logo:'elite' },
  { name:'Eko Blocks',               location:'Bengaluru, Karnataka',     type:'AAC Plant',  cap:'200 m³/day',  logo:'eko' },
  { name:'RanCare',                  location:'Chennai, Tamil Nadu',      type:'Batching',   cap:'30 m³/hr',    logo:'rancare' },
  { name:'Duralite',                 location:'Nigeria, West Africa',     type:'AAC Plant',  cap:'300 m³/day',  logo:'duralite' },
  { name:'BEPL',                     location:'Pune, Maharashtra',        type:'Precast',    cap:'Custom',      logo:'bepl' },
  { name:'Inventa',                  location:'Gujarat',                   type:'Dry Mix',    cap:'10 TPH',      logo:'inventa' },
  { name:'Sahay Industries',         location:'Rajasthan',                 type:'Block Plant',cap:'3000 blk/hr', logo:'sahay' },
  { name:'Magna',                    location:'Karnataka',                  type:'AAC Plant',  cap:'150 m³/day',  logo:'magna' },
  { name:'Pioneer Industries',       location:'Madhya Pradesh',            type:'Block Plant',cap:'4000 blk/hr', logo:'pionner' },
  { name:'EarthPavers',              location:'Andhra Pradesh',            type:'Block Plant',cap:'Paver Brick',  logo:'earthpaver' },
  { name:'ICOM',                     location:'Middle East',               type:'Batching',   cap:'90 m³/hr',    logo:'icom' },
  { name:'Vedam Industries',         location:'Telangana',                  type:'AAC Plant',  cap:'200 m³/day',  logo:'vedam' },
  { name:'ESPEC',                    location:'South India',                type:'Precast',    cap:'Custom',      logo:'espec' },
]

const EXECUTION = [
  { name:'New AAC Plant — Phase II',      location:'Pune, Maharashtra',    type:'AAC Plant',  cap:'600 m³/day',  status:'Civil Works' },
  { name:'Concrete Batching Complex',     location:'Hyderabad, Telangana', type:'Batching',   cap:'120 m³/hr',   status:'Equipment Supply' },
  { name:'Precast Manufacturing Facility',location:'Mumbai, Maharashtra',  type:'Precast',    cap:'Custom',       status:'Commissioning' },
  { name:'Dry Mix Mortar Plant',          location:'Coimbatore, TN',       type:'Dry Mix',    cap:'15 TPH',       status:'Installation' },
  { name:'PEB Manufacturing Line',        location:'Gujarat',               type:'PEB',        cap:'Custom',       status:'Fabrication' },
  { name:'Fly Ash Brick Plant',           location:'Odisha',                type:'Block Plant',cap:'8000 blk/hr',  status:'Equipment Supply' },
]

const TABS = ['Under Operation','Under Execution','Gallery']

export default function Projects() {
  const [tab, setTab] = useState(0)
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage:"url('/images/5_precast_concrete_plants.jpg')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Projects</p>
          <h1 className="section-title text-5xl text-white mb-4">Plants Under Operation & Execution</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">500+ plants commissioned across 20+ countries. See our real-world installations and ongoing projects.</p>
        </div>
      </section>
      <div className="divider"/>

      {/* Stats */}
      <div className="bg-navy-900 py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[['500+','Plants Commissioned'],['20+','Countries'],['18+','Projects Executing'],['1991','Established']].map(([n,l]) => (
            <div key={l} className="text-center">
              <div className="font-display font-bold text-3xl text-accent">{n}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-16 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Tabs */}
          <div className="flex gap-2 flex-wrap mb-10">
            {TABS.map((t,i) => (
              <button key={t} onClick={() => setTab(i)}
                className={`px-5 py-2 rounded-lg font-display font-semibold text-sm uppercase tracking-wide transition-all ${tab===i ? 'bg-accent text-white' : 'border border-white/10 text-slate-400 hover:border-accent hover:text-accent'}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Under Operation */}
          {tab === 0 && (
            <motion.div variants={SC} initial="hidden" animate="visible">
              <p className="text-slate-400 text-sm mb-6">Buildmate plants currently under operation across India and international markets:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {OPERATION.map(p => (
                  <motion.div key={p.name} variants={FV}
                    className="flex items-center gap-4 p-4 bg-navy-800 rounded-xl border border-white/5 hover:border-accent/25 transition-all group">
                    <div className="w-14 h-10 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-white/5 group-hover:border-accent/20 transition-colors">
                      <img src={`/images/${p.logo}.png`} alt={p.name}
                        className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity p-1"
                        onError={e => { e.target.style.display='none' }}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-display font-semibold truncate">{p.name}</div>
                      <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                        <MapPin size={10}/> {p.location}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] text-accent border border-accent/20 px-1.5 py-0.5 rounded font-display uppercase">{p.type}</span>
                        <span className="text-[10px] text-slate-500">{p.cap}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-slate-500 text-xs mt-6 text-center">And many more installations across India, Middle East, Africa and South East Asia</p>
            </motion.div>
          )}

          {/* Under Execution */}
          {tab === 1 && (
            <motion.div variants={SC} initial="hidden" animate="visible">
              <p className="text-slate-400 text-sm mb-6">Projects currently under execution — in various stages from fabrication to commissioning:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {EXECUTION.map(p => (
                  <motion.div key={p.name} variants={FV}
                    className="p-5 bg-navy-800 rounded-xl border border-white/5 hover:border-accent/25 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-display font-semibold text-white text-sm leading-tight">{p.name}</h3>
                      <span className="text-[10px] bg-green-500/10 border border-green-500/30 text-green-400 px-2 py-0.5 rounded font-display uppercase shrink-0">{p.status}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
                      <MapPin size={10}/> {p.location}
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] text-accent border border-accent/20 px-1.5 py-0.5 rounded font-display uppercase">{p.type}</span>
                      <span className="text-[10px] text-slate-500 border border-white/5 px-1.5 py-0.5 rounded">{p.cap}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Gallery */}
          {tab === 2 && (
            <motion.div variants={SC} initial="hidden" animate="visible">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {['1_aac_plants','2_prod_crushers_plant','3_prod_concrete-batching-plants','4_prod_dry_mix_mortar_plants',
                  '5_prod_precast_concrete_plants','6_prod_concrete-block-plants','7_prod_cranes','8_prod_mixers',
                  '9_prod_pre_engineered_buildings','10_prod_special_projects','aacblock_seven_one','aacblock_seven_two'].map(img => (
                  <motion.div key={img} variants={FV}
                    className="aspect-square overflow-hidden rounded-xl border border-white/5 hover:border-accent/30 transition-all group">
                    <img src={`/images/${img}.${img.includes('aacblock') ? 'jpg' : 'jpg'}`}
                      alt={img.replace(/_/g,' ')}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                      onError={e => { e.target.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=60'; e.target.style.opacity='0.3' }}/>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
