
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, FlaskConical, Wrench, GraduationCap, Settings, TrendingUp, RefreshCw } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }
const VP = { once:true, margin:'-80px' }

// Exact 6 services from client's handwritten brief — with live-site descriptions
const SERVICES = [
  {
    id:'rd', num:'01', icon:FlaskConical, color:'from-accent/15',
    title:'Unique R&D',
    headline:'Proprietary Research & Development',
    img:'/images/aacblock_seven_one.jpg',
    desc:'Buildmate operates a dedicated in-house R&D division focused on advancing AAC block technology, optimising plant processes and developing new sustainable building material solutions. Our proprietary autoclave designs and fly ash formulations are outcomes of continuous R&D investment.',
    items:[
      'Proprietary AAC formulation research',
      'Autoclave design optimisation',
      'Fly ash & sustainable material R&D',
      'Process efficiency studies',
      'New product development',
      'Energy consumption reduction research',
      'Carbon capture material R&D',
    ],
    cta:'Discuss R&D Collaboration'
  },
  {
    id:'amc', num:'02', icon:Wrench, color:'from-orange-500/15',
    title:'AMC / Support',
    headline:'Annual Maintenance Contracts & After-Sales Support',
    img:'/images/meti_mfg.jpg',
    desc:'Comprehensive Annual Maintenance Contracts (AMC) ensuring maximum plant uptime and optimal performance. Our service teams provide 24x7 technical support, preventive maintenance schedules, breakdown response and spare parts supply for all Buildmate plants.',
    items:[
      'Annual Maintenance Contracts (AMC)',
      '24x7 technical support helpdesk',
      'Preventive maintenance schedules',
      'Rapid breakdown response',
      'Spare parts supply & inventory',
      'Plant performance monitoring',
      'Reliability audits & reporting',
    ],
    cta:'Get AMC Quote'
  },
  {
    id:'training', num:'03', icon:GraduationCap, color:'from-yellow-500/15',
    title:'Training',
    headline:'Operator & Management Training Programs',
    img:'/images/imm_quality.jpg',
    desc:'Structured training programs for plant operators, maintenance teams and management personnel. Our training ensures your team can run the plant at peak efficiency, maintain quality standards and handle operational challenges independently.',
    items:[
      'Plant operator certification programs',
      'Safety & hazard awareness training',
      'Quality control procedures',
      'Process optimisation techniques',
      'Maintenance & troubleshooting',
      'Management & production planning',
      'On-site & residential training options',
    ],
    cta:'Enquire About Training'
  },
  {
    id:'custom', num:'04', icon:Settings, color:'from-purple-500/15',
    title:'Custom Machinery',
    headline:'Bespoke Industrial Equipment Design & Manufacture',
    img:'/images/sup_design.jpg',
    desc:'Buildmate designs and manufactures custom industrial machinery for unique manufacturing requirements that standard off-the-shelf solutions cannot address. From special autoclaves to custom mixing systems and bespoke material handling equipment.',
    items:[
      'Custom autoclave design & fabrication',
      'Special mixing & slurry systems',
      'Bespoke material handling equipment',
      'Non-standard plant components',
      'Retrofit engineering for existing plants',
      'Special molds & tooling',
      'Prototype development & testing',
    ],
    cta:'Discuss Custom Requirement'
  },
  {
    id:'upgradation', num:'05', icon:TrendingUp, color:'from-green-500/15',
    title:'Plant Upgradation',
    headline:'Capacity Expansion & Technology Upgradation',
    img:'/images/1_prod_aac_plant.png',
    desc:'Upgrade existing manufacturing plants to increase production capacity, improve product quality or add new product lines. Our engineers assess your current plant, identify bottlenecks and design targeted upgradation packages.',
    items:[
      'Capacity expansion engineering',
      'Bottleneck identification & resolution',
      'Equipment replacement & upgrade',
      'Automation level improvement',
      'Quality system upgradation',
      'New product line addition',
      'Energy efficiency upgradation',
    ],
    cta:'Plant Upgrade Assessment'
  },
  {
    id:'modernization', num:'06', icon:RefreshCw, color:'from-cyan-500/15',
    title:'Modernization',
    headline:'Industry 4.0 & Digital Modernization',
    img:'/images/9_prod_pre_engineered_buildings.png',
    desc:'Transform legacy manufacturing plants with Industry 4.0 technology — PLC/SCADA upgrades, IoT sensor integration, real-time monitoring dashboards and AI-based quality control. Keep your plant competitive without complete replacement.',
    items:[
      'PLC/SCADA system replacement',
      'IoT sensor integration',
      'Real-time monitoring dashboards',
      'Remote access & diagnostics',
      'Predictive maintenance systems',
      'Digital twin implementation',
      'MIS & production reporting systems',
    ],
    cta:'Modernization Consultation'
  },
]

export default function Services() {
  return (
    <div>
      {/* Banner */}
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage:"url('/images/banner_services.jpg')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Services</p>
          <h1 className="section-title text-5xl text-white mb-4 max-w-2xl">Engineering Services Portfolio</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">
            Six specialised service offerings — from proprietary R&D and custom machinery to plant modernization and AMC support.
          </p>
          {/* Quick-jump pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {SERVICES.map(s => (
              <a key={s.id} href={`#${s.id}`}
                className="text-xs font-display uppercase tracking-wide px-3 py-1.5 glass border border-white/10 text-slate-300 hover:border-accent hover:text-accent transition-all rounded-lg">
                {s.num} {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>
      <div className="divider"/>

      {/* Services — alternating layout */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {SERVICES.map((s, i) => (
            <motion.div id={s.id} key={s.id}
              variants={FV} initial="hidden" whileInView="visible" viewport={VP}
              className={`grid lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/25 transition-all duration-300 bg-gradient-to-br ${s.color} bg-navy-800`}>
              {/* Image — alternates left/right */}
              <div className={`lg:col-span-2 h-56 lg:h-auto overflow-hidden ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
                <img src={s.img} alt={s.title}
                  className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500"
                  onError={e => { const f=e.target.src; if(!f.includes('buildmate.in')){e.target.src=f.replace(//images//,'/images/')}else{e.target.style.opacity='0.2'} }}/>
              </div>
              {/* Content */}
              <div className="lg:col-span-3 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-navy-900/70 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <s.icon size={24} className="text-accent"/>
                  </div>
                  <div>
                    <div className="text-xs font-display uppercase tracking-widest text-slate-500">Service {s.num}</div>
                    <h2 className="section-title text-2xl text-white leading-tight">{s.title}</h2>
                    <div className="text-sm text-accent font-display">{s.headline}</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="grid grid-cols-2 gap-1.5 mb-5">
                  {s.items.map(it => (
                    <div key={it} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"/>{it}
                    </div>
                  ))}
                </div>
                <div>
                  <Link to="/contact" className="btn-primary text-xs inline-flex">
                    {s.cta} <ArrowRight size={13}/>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy-900 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <h2 className="section-title text-3xl text-white mb-4">Need a Custom Service Package?</h2>
            <p className="text-slate-400 mb-7">Combine R&D, AMC, training and modernization into one partnership program tailored to your plant.</p>
            <Link to="/contact" className="btn-primary">Start a Conversation <ArrowRight size={15}/></Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
