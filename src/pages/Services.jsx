import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, FileSearch, FileText, Cpu, Layers, TrendingUp, Shield, GraduationCap, RefreshCw } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const VP = { once:true, margin:'-80px' }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }

const services = [
  { icon:FileSearch, title:'Feasibility Study', color:'from-blue-600/20 to-blue-900/10', desc:'Comprehensive market analysis and technical feasibility assessment to validate your project before investment. Includes ROI projections, site evaluation and technology selection.', items:['Site analysis','Market assessment','Technology selection','Financial modeling','ROI projections'] },
  { icon:FileText, title:'Detailed Project Reports', color:'from-purple-600/20 to-purple-900/10', desc:'Detailed engineering and financial project reports for investors, banks and government approvals. DPR includes process design, equipment specs, civil requirements and financial projections.', items:['Process flow diagrams','Equipment specifications','Civil requirements','Financial projections','Bank loan documentation'] },
  { icon:Cpu, title:'Engineering Consultancy', color:'from-cyan-600/20 to-cyan-900/10', desc:'Expert engineering guidance throughout your project. Our team of senior engineers provides technical solutions for complex manufacturing challenges.', items:['Process engineering','Equipment design','Automation planning','Safety engineering','QA systems design'] },
  { icon:Layers, title:'Turnkey Solutions', color:'from-accent/20 to-accent/5', desc:'Complete plant delivery on a turnkey basis — from design and fabrication to installation and commissioning. Single-point responsibility for entire project delivery.', items:['Full project management','Design & fabrication','Installation & erection','Commissioning & trials','Performance guarantee'] },
  { icon:TrendingUp, title:'Capacity Optimization', color:'from-green-600/20 to-green-900/10', desc:'Maximize your existing plant throughput with process engineering, automation upgrades and operational improvements.', items:['Process analysis','Bottleneck identification','Equipment upgrades','Automation integration','Training & handover'] },
  { icon:Shield, title:'AMC Support', color:'from-orange-600/20 to-orange-900/10', desc:'Annual maintenance contracts ensuring maximum uptime, preventive maintenance and rapid response to breakdowns.', items:['Preventive maintenance','24/7 response support','Spare parts supply','Performance monitoring','Reliability audits'] },
  { icon:GraduationCap, title:'Training Programs', color:'from-yellow-600/20 to-yellow-900/10', desc:'Comprehensive operator and management training ensuring your team operates plants at peak efficiency and safety.', items:['Operator certification','Safety training','Quality control','Process optimization','Management programs'] },
  { icon:RefreshCw, title:'Plant Modernization', color:'from-red-600/20 to-red-900/10', desc:'Upgrade and retrofit existing plants with modern technology, automation and control systems to extend operational life and improve efficiency.', items:['Technology assessment','Retrofit engineering','PLC/SCADA upgrades','Process improvements','Performance validation'] },
]

export default function Services() {
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Services</p>
          <h1 className="section-title text-5xl text-white mb-4 max-w-2xl">Complete Engineering Service Portfolio</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">From initial feasibility to post-commissioning support — we partner with you through every phase of your industrial project.</p>
        </div>
      </section>
      <div className="divider"/>
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {services.map(s => (
              <motion.div key={s.title} variants={FV}
                className={`group p-8 rounded-2xl bg-gradient-to-br ${s.color} bg-navy-800 border border-white/5 hover:border-accent/30 transition-all duration-300`}>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-navy-900/70 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:border-accent/40 transition-colors">
                    <s.icon size={24} className="text-accent"/>
                  </div>
                  <div className="flex-1">
                    <h3 className="section-title text-2xl text-white mb-3">{s.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <ul className="space-y-1.5 mb-5">
                      {s.items.map(it => (
                        <li key={it} className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"/>
                          {it}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="text-accent text-xs font-display font-semibold uppercase tracking-wide flex items-center gap-1 hover:gap-2 transition-all">
                      Enquire Now <ArrowRight size={12}/>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-16 bg-navy-900 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <h2 className="section-title text-4xl text-white mb-4">Need a Custom Solution?</h2>
            <p className="text-slate-400 mb-8">Our engineering team is ready to discuss your specific requirements and design the perfect solution for your project.</p>
            <Link to="/contact" className="btn-primary">Start a Conversation <ArrowRight size={15}/></Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
