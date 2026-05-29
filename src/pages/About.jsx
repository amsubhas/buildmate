import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Globe, Cpu, CheckCircle } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const VP = { once:true, margin:'-80px' }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }

const milestones = [
  { year:'1992', title:'Company Founded', desc:'Established in Hyderabad with a vision to transform industrial manufacturing.' },
  { year:'2000', title:'First International Project', desc:'Commissioned first plant in the Middle East, marking global expansion.' },
  { year:'2008', title:'100 Plants Milestone', desc:'Delivered 100th industrial plant installation across multiple countries.' },
  { year:'2015', title:'ISO Certification', desc:'Achieved ISO 9001:2015 and ISO 14001 environmental certifications.' },
  { year:'2020', title:'Digital Transformation', desc:'Integrated Industry 4.0, automation and IoT into product offerings.' },
  { year:'2024', title:'500+ Plants Global', desc:'Surpassed 500 plant installations across 20+ countries worldwide.' },
]

const values = [
  { icon:Award, title:'Quality First', desc:'Every component manufactured to the highest international standards.' },
  { icon:Globe, title:'Global Vision', desc:'Engineering solutions designed for diverse global environments.' },
  { icon:Cpu, title:'Innovation', desc:'Continuous R&D to stay ahead of industrial technology trends.' },
  { icon:CheckCircle, title:'Integrity', desc:'Transparent business practices and reliable project delivery.' },
]

const certs = ['ISO 9001:2015','ISO 14001:2015','CE Certification','BIS Compliance','Factory Act Compliance','OHSAS 18001']

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-28 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">About Us</p>
          <h1 className="section-title text-5xl text-white mb-4 max-w-2xl">Engineering the Future of Industrial Infrastructure</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">Three decades of precision engineering, delivering world-class industrial plant solutions globally.</p>
        </div>
      </section>
      <div className="divider"/>

      {/* Overview */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
              <p className="section-label mb-3">Company Overview</p>
              <h2 className="section-title text-3xl text-white mb-5">Buildmate Projects Pvt Ltd</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Buildmate Projects Pvt Ltd is a leading industrial engineering company based in Hyderabad, India. Since our founding, we have been at the forefront of manufacturing plant design, fabrication, and commissioning for the construction materials industry.</p>
              <p className="text-slate-400 leading-relaxed mb-4">Our state-of-the-art manufacturing facility in Gundlapochampally, Hyderabad, encompasses advanced CNC machining centers, fabrication workshops, assembly halls and a dedicated R&D laboratory — enabling us to deliver precision-engineered solutions with unmatched quality control.</p>
              <p className="text-slate-400 leading-relaxed mb-6">From AAC Plants and Concrete Batching Systems to Precast Solutions and PEB Structures — we deliver complete turnkey industrial plants that meet the most demanding project requirements.</p>
              <Link to="/contact" className="btn-primary">Get In Touch <ArrowRight size={15}/></Link>
            </motion.div>
            <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP} className="relative">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80" alt="Buildmate" className="rounded-xl border border-white/10 opacity-80 w-full"/>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[['Hyderabad','Headquarters'],['Telangana, India','Location'],['500+ Plants','Delivered'],['20+ Nations','Global Reach']].map(([n,l]) => (
                  <div key={n} className="glass p-3 rounded-lg text-center">
                    <div className="font-display font-bold text-accent text-lg">{n}</div>
                    <div className="text-slate-400 text-xs">{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          {[
            { title:'Our Vision', text:'To be the most trusted industrial engineering partner globally — delivering innovative, sustainable, and high-performance manufacturing plant solutions that empower industries and communities.' },
            { title:'Our Mission', text:'To provide end-to-end turnkey industrial plant solutions with unwavering commitment to quality, innovation, and customer satisfaction — accelerating our clients from concept to commissioning.' }
          ].map(v => (
            <motion.div key={v.title} variants={FV} initial="hidden" whileInView="visible" viewport={VP}
              className="p-8 bg-navy-800 rounded-xl border border-white/5">
              <h3 className="section-title text-2xl text-accent mb-4">{v.title}</h3>
              <p className="text-slate-300 leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Our Journey</p>
            <h2 className="section-title text-4xl text-white">Three Decades of Excellence</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/20 hidden md:block"/>
            <motion.div className="space-y-8" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
              {milestones.map((m,i) => (
                <motion.div key={m.year} variants={FV}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${i%2===0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i%2===0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <div className="glass p-5 rounded-xl inline-block text-left">
                      <div className="text-accent font-display font-bold text-lg mb-1">{m.year}</div>
                      <div className="text-white font-display font-semibold mb-1">{m.title}</div>
                      <div className="text-slate-400 text-sm">{m.desc}</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-accent border-2 border-navy-950 z-10 shrink-0"/>
                  <div className="flex-1"/>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Our Values</p>
            <h2 className="section-title text-4xl text-white">What Drives Us</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {values.map(v => (
              <motion.div key={v.title} variants={FV}
                className="p-6 bg-navy-800 rounded-xl border border-white/5 text-center card-hover">
                <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-accent"/>
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-10" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Certifications</p>
            <h2 className="section-title text-3xl text-white">Internationally Certified</h2>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center gap-4" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {certs.map(c => (
              <motion.div key={c} variants={FV}
                className="px-6 py-3 glass rounded-full border border-accent/20 text-sm font-display font-semibold text-slate-200 uppercase tracking-wide">
                {c}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
