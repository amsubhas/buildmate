import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }
const VP = { once:true, margin:'-80px' }

const facilities = [
  { title:'Manufacturing Units', img:'https://buildmate.in/images/meti_mfg.jpg',
    desc:'Our main manufacturing facility at Gundlapochampally, Hyderabad spans 50,000+ sq.ft. with heavy fabrication bays, structural workshops, assembly areas and quality inspection zones capable of handling large-format industrial equipment.',
    specs:['50,000+ sq.ft. area','Heavy structural fabrication','Multi-ton overhead cranes','Precision assembly halls','Dedicated finishing lines'] },
  { title:'CNC Machining Centre', img:'https://buildmate.in/images/sup_design.jpg',
    desc:'State-of-the-art CNC machining and precision fabrication centre with advanced multi-axis turning, milling, drilling and laser cutting equipment for exact-tolerance components.',
    specs:['Multi-axis CNC turning','Precision milling centres','CNC laser cutting','CMM inspection','Tight tolerance machining'] },
  { title:'QA & Testing Systems', img:'https://buildmate.in/images/imm_quality.jpg',
    desc:'ISO 9001:2015 certified quality management. Comprehensive material testing, weld inspection (NDT), dimensional verification and performance validation systems.',
    specs:['ISO 9001:2015 certified','Material testing lab','NDT weld inspection','Dimensional metrology','100% pre-dispatch test'] },
  { title:'R&D Laboratory', img:'https://buildmate.in/images/aacblock_seven_one.jpg',
    desc:'Dedicated research and development laboratory for AAC product innovation, process optimisation, raw material development and next-generation automation technology research.',
    specs:['AAC process simulation','Material formulation testing','Autoclave research','Automation prototyping','New product development'] },
  { title:'Assembly & Pre-Commissioning', img:'https://buildmate.in/images/1_prod_aac_plant.png',
    desc:'Full plant mock-up and pre-dispatch assembly facility. Complete factory acceptance tests (FAT), system integration verification and training runs before delivery to client sites.',
    specs:['Full plant pre-assembly','System integration test','FAT facilities','Pre-dispatch inspection','Customer witnessing'] },
  { title:'Automation & Controls Division', img:'https://buildmate.in/images/9_prod_pre_engineered_buildings.png',
    desc:'Dedicated automation engineering with in-house PLC/SCADA programming, control panel fabrication, field instrumentation design and Industry 4.0 IoT integration.',
    specs:['PLC/SCADA programming','Control panel fabrication','IoT & cloud integration','Remote monitoring setup','HMI screen development'] },
]

export default function Facilities() {
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage:"url('https://buildmate.in/images/meti_mfg.jpg')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Facilities</p>
          <h1 className="section-title text-5xl text-white mb-4">World-Class Manufacturing Infrastructure</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Our Hyderabad facility houses advanced CNC and fabrication capabilities enabling precision engineering at international quality standards.</p>
        </div>
      </section>
      <div className="divider"/>
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-16" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {[['50,000+','Sq.ft. Facility'],['200+','Skilled Workforce'],['30+','CNC Machines'],['ISO 9001:2015','Certified QMS']].map(([n,l]) => (
              <motion.div key={l} variants={FV} className="glass p-5 rounded-xl text-center">
                <div className="font-display font-bold text-2xl text-accent mb-1">{n}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">{l}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {facilities.map(f => (
              <motion.div key={f.title} variants={FV}
                className="bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img src={f.img} alt={f.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                    onError={e => { e.target.src='https://images.unsplash.com/photo-1581092160607-ee67df1d9d52?w=600&q=60'; e.target.style.opacity='0.4' }}/>
                </div>
                <div className="p-6">
                  <h3 className="section-title text-xl text-white mb-3">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                  <ul className="space-y-1.5">
                    {f.specs.map(s => (
                      <li key={s} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"/>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <Link to="/contact" className="btn-primary">Schedule a Facility Visit <ArrowRight size={15}/></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
