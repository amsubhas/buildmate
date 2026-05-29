import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, User } from 'lucide-react'

const FV = { hidden:{opacity:0,y:25}, visible:{opacity:1,y:0,transition:{duration:0.5}} }
const VP = { once:true, margin:'-80px' }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.08}} }

const categories = ['All','AAC Technology','Industrial Automation','Sustainable Construction','Precast Engineering','Carbon Capture']

const posts = [
  { cat:'AAC Technology', title:'How AAC Blocks Are Revolutionizing Green Construction', excerpt:'Autoclaved Aerated Concrete is transforming the construction industry with its superior thermal insulation, lightweight properties and sustainable production process.', date:'Dec 2024', author:'Buildmate Team', read:'5 min', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { cat:'Precast Engineering', title:'Benefits of Precast Concrete in Modern Infrastructure', excerpt:'Precast concrete elements are accelerating construction timelines, improving quality consistency and reducing waste on projects from residential towers to infrastructure.', date:'Nov 2024', author:'Engineering Dept', read:'6 min', img:'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80' },
  { cat:'Industrial Automation', title:'Industry 4.0 in Concrete Plant Manufacturing', excerpt:'Smart sensors, IoT connectivity and AI-driven process optimization are transforming how concrete batching and AAC plants operate and maintain themselves.', date:'Oct 2024', author:'R&D Team', read:'7 min', img:'https://images.unsplash.com/photo-1581092160607-ee67df1d9d52?w=600&q=80' },
  { cat:'Sustainable Construction', title:'Fly Ash Utilization in AAC and FCB Production', excerpt:'Converting industrial waste fly ash into high-strength building materials reduces landfill burden, carbon emissions and production costs simultaneously.', date:'Sep 2024', author:'Buildmate Team', read:'5 min', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { cat:'Carbon Capture', title:'Carbon Capture Technology Integration in Industrial Plants', excerpt:'Emerging carbon capture and utilization systems are enabling industrial plants to convert CO₂ emissions into valuable construction materials and fuels.', date:'Aug 2024', author:'R&D Team', read:'8 min', img:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { cat:'AAC Technology', title:'AAC vs Red Brick: A Comprehensive Technical Comparison', excerpt:'An in-depth comparison of Autoclaved Aerated Concrete blocks versus traditional red clay bricks across strength, thermal, acoustic and sustainability parameters.', date:'Jul 2024', author:'Engineering Dept', read:'6 min', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
]

export default function Blog() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? posts : posts.filter(p => p.cat === active)
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Blog</p>
          <h1 className="section-title text-5xl text-white mb-4">Insights & Engineering Knowledge</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Technical articles, industry insights and innovations from our engineering team.</p>
        </div>
      </section>
      <div className="divider"/>
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-display uppercase tracking-wide transition-all ${active===c ? 'bg-accent text-white' : 'border border-white/10 text-slate-400 hover:border-accent hover:text-accent'}`}>
                {c}
              </button>
            ))}
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {filtered.map(p => (
              <motion.div key={p.title} variants={FV}
                className="group bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 flex flex-col">
                <div className="h-48 overflow-hidden shrink-0">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"/>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-display uppercase tracking-wider text-gold mb-2">{p.cat}</span>
                  <h3 className="font-display font-semibold text-white text-lg leading-snug mb-3 flex-1">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{p.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><User size={11}/> {p.author}</span>
                      <span className="flex items-center gap-1"><Clock size={11}/> {p.read} read</span>
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
