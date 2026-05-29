import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const VP = { once:true, margin:'-80px' }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }

const facilities = [
  { title:'Manufacturing Units', img:'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&q=80', desc:'Our main manufacturing facility spans 50,000+ sq.ft. with heavy fabrication bays, assembly areas and quality inspection zones capable of handling large-format industrial equipment.', specs:['50,000+ sq.ft. area','Heavy structural fabrication','Multi-ton overhead cranes','Precision assembly halls'] },
  { title:'CNC Machining Centre', img:'https://images.unsplash.com/photo-1581092160607-ee67df1d9d52?w=700&q=80', desc:'State-of-the-art CNC machining and precision fabrication center with advanced multi-axis turning, milling and drilling equipment for exact-tolerance components.', specs:['Multi-axis CNC turning','Precision milling','Laser cutting systems','Coordinate measuring'] },
  { title:'QA & Testing Systems', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80', desc:'ISO-certified quality assurance systems with comprehensive material testing, weld inspection, dimensional verification and performance validation capabilities.', specs:['ISO 9001:2015 certified','Material testing lab','NDT weld inspection','Dimensional metrology'] },
  { title:'R&D Laboratory', img:'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=700&q=80', desc:'Dedicated research and development laboratory for product innovation, process optimization, material development and automation technology research.', specs:['Process simulation','Material testing','Automation prototyping','Product development'] },
  { title:'Assembly Facilities', img:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80', desc:'Spacious assembly halls for complete plant mock-up, pre-dispatch testing and system integration verification before delivery to client sites.', specs:['Full plant pre-assembly','System integration tests','Pre-dispatch inspection','FAT facilities'] },
  { title:'Automation Division', img:'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80', desc:'Dedicated automation engineering division with PLC/SCADA programming, panel fabrication, field instrumentation and Industry 4.0 integration capabilities.', specs:['PLC/SCADA systems','Panel fabrication','IoT integration','Remote monitoring'] },
]

export default function Facilities() {
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Facilities</p>
          <h1 className="section-title text-5xl text-white mb-4">World-Class Manufacturing Infrastructure</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Our Hyderabad facility houses advanced manufacturing capabilities that enable precision engineering at global quality standards.</p>
        </div>
      </section>
      <div className="divider"/>
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Stats */}
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-16" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {[['50,000+','Sq.ft. Facility'],['200+','Skilled Workforce'],['30+','CNC Machines'],['ISO 9001','Certified']].map(([n,l]) => (
              <motion.div key={l} variants={FV} className="glass p-5 rounded-xl text-center">
                <div className="font-display font-bold text-2xl text-accent mb-1">{n}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">{l}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {facilities.map(f => (
              <motion.div key={f.title} variants={FV} className="bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-800 to-transparent" style={{position:'relative',marginTop:'-12rem',height:'12rem'}}/>
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
