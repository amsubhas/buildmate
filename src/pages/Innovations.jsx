import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Zap, Leaf, BarChart3 } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }
const VP = { once:true, margin:'-80px' }

const innovations = [
  { icon:Cpu, title:'Smart Automation & IoT', img:'https://www.buildmate.in/images/9_prod_pre_engineered_buildings.png',
    desc:'Next-generation PLC/SCADA systems with IoT connectivity for real-time plant monitoring, predictive maintenance alerts and remote diagnostics. Full Industry 4.0 integration.',
    points:['Real-time production dashboards','Predictive maintenance AI','Remote diagnostics & control','Cloud data logging & analytics','Mobile plant monitoring app'] },
  { icon:Leaf, title:'Sustainable Manufacturing', img:'https://www.buildmate.in/images/High-End-Automated-Fly-ash-brick.png',
    desc:'Fly ash utilisation technology, carbon capture systems and energy-efficient autoclave designs that dramatically reduce the environmental footprint of building material manufacturing.',
    points:['Fly ash AAC & brick plants','Carbon capture integration','Steam energy recovery','Zero liquid discharge','Solar-ready plant designs'] },
  { icon:Zap, title:'High-Efficiency Autoclave Technology', img:'https://www.buildmate.in/images/1_prod_aac_plant.png',
    desc:'Proprietary autoclave design with superior insulation, optimised steam distribution and advanced pressure-temperature control — delivering consistent AAC block quality at lower energy consumption.',
    points:['Proprietary insulation design','Optimised steam distribution','Advanced PTC systems','15% lower energy vs industry','Extended autoclave lifecycle'] },
  { icon:BarChart3, title:'Calcium Silicate & Fibre Board Plants', img:'https://www.buildmate.in/images/calcium-silicate_fiber-boards.png',
    desc:'Cutting-edge calcium silicate board and fibre cement board manufacturing plants — serving high-performance, fire-resistant building panel markets with fully automated production lines.',
    points:['Calcium silicate board lines','Fibre cement board systems','Fire-rated panel production','Automated sheet cutting','Quality testing integration'] },
]

export default function Innovations() {
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage:"url('https://www.buildmate.in/images/9_prod_pre_engineered_buildings.png')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Innovation</p>
          <h1 className="section-title text-5xl text-white mb-4 max-w-2xl">R&D and Engineering Innovation</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Three decades of continuous innovation in building material plant technology — from proprietary autoclave designs to Industry 4.0 automation and sustainable manufacturing solutions.</p>
        </div>
      </section>
      <div className="divider"/>
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="space-y-12" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {innovations.map((inn, i) => (
              <motion.div key={inn.title} variants={FV}
                className={`grid lg:grid-cols-2 gap-10 items-center ${i%2===1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i%2===1 ? 'order-last lg:order-first' : ''}>
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mb-4">
                    <inn.icon size={22} className="text-accent"/>
                  </div>
                  <h2 className="section-title text-3xl text-white mb-4">{inn.title}</h2>
                  <p className="text-slate-400 leading-relaxed mb-5">{inn.desc}</p>
                  <ul className="space-y-2">
                    {inn.points.map(p => (
                      <li key={p} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"/>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`rounded-2xl overflow-hidden border border-white/10 ${i%2===1 ? 'order-first lg:order-last' : ''}`}>
                  <img src={inn.img} alt={inn.title}
                    className="w-full h-72 object-cover opacity-70"
                    onError={e => { e.target.src='https://images.unsplash.com/photo-1581092160607-ee67df1d9d52?w=700&q=60'; e.target.style.opacity='0.4' }}/>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
