import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Settings, Layers, FileSearch, FileText, Cpu, TrendingUp, Shield, GraduationCap, RefreshCw, Wrench } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.09}} }
const VP = { once:true, margin:'-80px' }

const services = [
  {
    icon:Settings, title:'Setting Up AAC Plant', color:'from-accent/15 to-navy-800',
    desc:'Complete support for establishing new AAC block manufacturing facilities. We handle everything from site selection, civil design, equipment specification, procurement, installation and trial runs to final handover.',
    items:['Site selection & evaluation','Civil design coordination','Equipment specification','Complete installation','Trial runs & handover','Operator training']
  },
  {
    icon:Layers, title:'Turnkey Solutions', color:'from-blue-600/15 to-navy-800',
    desc:'Single-point responsibility for the entire project — from concept to commissioning. Buildmate manages all aspects: design, procurement, fabrication, logistics, installation, commissioning and performance validation.',
    items:['Full project management','Design & engineering','Procurement & fabrication','Installation & erection','Commissioning & trials','Performance guarantee']
  },
  {
    icon:FileSearch, title:'Feasibility Study', color:'from-purple-600/15 to-navy-800',
    desc:'Comprehensive technical and commercial feasibility assessment. We evaluate market potential, raw material availability, technology options, infrastructure requirements and financial viability before you invest.',
    items:['Market analysis','Raw material assessment','Technology selection','Site evaluation','Financial modeling','ROI projections']
  },
  {
    icon:FileText, title:'Detailed Project Report (DPR)', color:'from-cyan-600/15 to-navy-800',
    desc:'Bankable Detailed Project Reports for investor presentations, bank loan applications and government approvals. Includes process design, equipment specifications, civil requirements and financial projections.',
    items:['Process flow diagrams','Equipment specifications','Civil requirements','Financial projections','Bank loan documentation','Regulatory compliance']
  },
  {
    icon:Cpu, title:'Process Design & Engineering', color:'from-green-600/15 to-navy-800',
    desc:'Expert process engineering for AAC plants and other building material manufacturing facilities. Detailed engineering, P&ID drawings, plant layout, automation design and utility requirements.',
    items:['Process engineering','P&ID drawings','Plant layout optimization','Automation architecture','Utility design','Equipment sizing']
  },
  {
    icon:TrendingUp, title:'Procurement & Project Management', color:'from-yellow-600/15 to-navy-800',
    desc:'Systematic procurement management and project execution. Vendor qualification, multi-party coordination, schedule management, quality oversight and reporting throughout the project lifecycle.',
    items:['Vendor qualification','Multi-party coordination','Schedule management','Cost control','Quality oversight','Progress reporting']
  },
  {
    icon:Shield, title:'Maintenance of AAC Block Plant', color:'from-orange-600/15 to-navy-800',
    desc:'Dedicated maintenance services for AAC block manufacturing plants. Preventive maintenance programs, breakdown response, spare parts management and plant health monitoring.',
    items:['Preventive maintenance','Breakdown response','Spare parts supply','Plant health monitoring','Reliability audits','Planned shutdowns']
  },
  {
    icon:Wrench, title:'After Sales Service', color:'from-red-600/15 to-navy-800',
    desc:'Comprehensive after-sales support for all Buildmate-supplied plants. Annual Maintenance Contracts (AMC), on-call technical support, equipment upgrades and plant performance optimisation.',
    items:['Annual Maintenance Contracts','24x7 on-call support','Equipment upgrades','Performance optimisation','Operator retraining','Documentation updates']
  },
]

export default function Services() {
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage:"url('https://buildmate.in/images/banner_services.jpg')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Services</p>
          <h1 className="section-title text-5xl text-white mb-4 max-w-2xl">Complete Engineering Service Portfolio</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">From initial feasibility to post-commissioning AMC — Buildmate partners with you through every phase of your industrial project.</p>
        </div>
      </section>
      <div className="divider"/>
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {services.map(s => (
              <motion.div key={s.title} variants={FV}
                className={`group p-8 rounded-2xl bg-gradient-to-br ${s.color} border border-white/5 hover:border-accent/30 transition-all duration-300`}>
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
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"/>{it}
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
      <section className="py-14 bg-navy-900 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <h2 className="section-title text-3xl text-white mb-4">Need a Custom Service Package?</h2>
            <p className="text-slate-400 mb-7">Talk to our engineering team about your specific requirements. We design service packages that match your operational needs and budget.</p>
            <Link to="/contact" className="btn-primary">Start a Conversation <ArrowRight size={15}/></Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
