import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Globe, Cpu, CheckCircle } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }
const VP = { once:true, margin:'-80px' }

const milestones = [
  { year:'1991', title:'Company Founded', desc:'Established in Hyderabad by Mr. M. Venkata Ratnam with a vision to transform industrial manufacturing in India.' },
  { year:'2000', title:'First International Project', desc:"Commissioned first plant in the Middle East — marking the start of Buildmate's global expansion." },
  { year:'2005', title:'AAC Technology Leadership', desc:"Became one of India's foremost AAC plant manufacturers with multiple large-capacity installations." },
  { year:'2010', title:'100 Plants Milestone', desc:'Delivered 100th industrial plant installation. Expanded into Africa and South East Asia.' },
  { year:'2015', title:'ISO Certification', desc:'Achieved ISO 9001:2015 and ISO 14001 environmental management certifications.' },
  { year:'2020', title:'Digital & Automation', desc:'Integrated Industry 4.0, PLC/SCADA automation and IoT monitoring into all product lines.' },
  { year:'2025', title:'500+ Plants Global', desc:'Surpassed 500 plant installations in 20+ countries. Expanding R&D for next-gen building material technologies.' },
]

const values = [
  { icon:Award, title:'Quality First', desc:'ISO 9001:2015 certified. Every component manufactured to highest international standards with 100% pre-dispatch inspection.' },
  { icon:Globe, title:'Global Vision', desc:'Engineering solutions designed for diverse global environments — from Hyderabad to Saudi Arabia, Nigeria and beyond.' },
  { icon:Cpu, title:'Innovation', desc:'Dedicated R&D driving proprietary autoclave designs, new material processing and automation technology.' },
  { icon:CheckCircle, title:'Integrity', desc:'Transparent business practices, honest communication and reliable on-time project delivery every time.' },
]

const certs = ['ISO 9001:2015','ISO 14001:2015','CE Certification','BIS Compliance','Factory Act Compliance','OHSAS 18001']

export default function About() {
  return (
    <div>
      {/* Banner */}
      <section className="relative py-28 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage:"url('https://buildmate.in/images/banner_whoweare.jpg')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Who We Are</p>
          <h1 className="section-title text-5xl text-white mb-4 max-w-2xl">Engineering the Future of Industrial Infrastructure</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">Three decades of precision engineering delivering world-class industrial plant solutions globally — since 1991.</p>
        </div>
      </section>
      <div className="divider"/>

      {/* Company Overview */}
      <section id="company" className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
              <p className="section-label mb-3">Company Overview</p>
              <h2 className="section-title text-3xl text-white mb-5">Buildmate Projects Pvt Ltd</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Buildmate Projects Pvt Ltd, founded in 1991 by Mr. M. Venkata Ratnam, is one of India's premier manufacturers
                and suppliers of AAC Block Plants and comprehensive building material manufacturing equipment.
                Headquartered in Gundlapochampally, Hyderabad, Telangana, we serve clients across India, the Middle East,
                Africa and South East Asia.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                Our state-of-the-art manufacturing facility spans 50,000+ sq.ft. with advanced CNC machining centres,
                heavy fabrication workshops, precision assembly halls and a dedicated R&D laboratory.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                From AAC Plants and Concrete Batching Systems to Precast Solutions and PEB Structures — we deliver complete
                turnkey industrial plants that meet the most demanding requirements across the globe.
              </p>
              <Link to="/contact" className="btn-primary">Get In Touch <ArrowRight size={15}/></Link>
            </motion.div>
            <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Since 1991','Established'],
                  ['500+ Plants','Installed globally'],
                  ['20+ Countries','Global reach'],
                  ['200+ Engineers','Skilled team'],
                  ['ISO 9001','Quality certified'],
                  ['50,000 sq.ft.','Facility area'],
                ].map(([n,l]) => (
                  <div key={n} className="glass p-4 rounded-xl text-center">
                    <div className="font-display font-bold text-xl text-accent mb-1">{n}</div>
                    <div className="text-xs text-slate-400">{l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 glass rounded-xl border border-accent/10">
                <div className="font-display font-semibold text-white text-sm mb-1">CEO & Founder</div>
                <div className="text-accent text-base font-display font-bold">Mr. M. Venkata Ratnam</div>
                <a href="mailto:mvr@buildmate.in" className="text-slate-400 text-xs hover:text-accent transition-colors">mvr@buildmate.in</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section id="believe" className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}
            className="p-8 bg-navy-800 rounded-2xl border border-white/5">
            <h3 className="section-title text-2xl text-accent mb-4">Our Vision</h3>
            <p className="text-slate-300 leading-relaxed">
              To be the most trusted industrial engineering partner globally — delivering innovative, sustainable and
              high-performance manufacturing plant solutions that empower industries and communities across the world.
            </p>
          </motion.div>
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}
            className="p-8 bg-navy-800 rounded-2xl border border-white/5">
            <h3 className="section-title text-2xl text-gold mb-4">Our Mission</h3>
            <p className="text-slate-300 leading-relaxed">
              To provide end-to-end turnkey industrial plant solutions with unwavering commitment to quality, innovation and
              customer satisfaction — accelerating clients from concept to commissioning with excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Buildmate Advantages */}
      <section id="advantages" className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Buildmate Advantages</p>
            <h2 className="section-title text-4xl text-white">Superior. Meticulous. Immaculate.</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-7" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {[
              { title:'Superior Design', img:'https://buildmate.in/images/sup_design.jpg', desc:'Every plant is engineered from first principles. Optimised layouts, energy-efficient process flows and future-ready automation architecture. 3D modelling and simulation before fabrication.' },
              { title:'Meticulous Manufacturing', img:'https://buildmate.in/images/meti_mfg.jpg', desc:'In-house CNC machining, precision fabrication and rigorously tested sub-assemblies ensure zero-compromise quality at every stage — from raw material to finished equipment.' },
              { title:'Immaculate Quality', img:'https://buildmate.in/images/imm_quality.jpg', desc:'ISO 9001:2015 certified quality management. 100% pre-dispatch inspection, factory acceptance tests and on-site commissioning validation. Quality documented at every step.' },
            ].map(a => (
              <motion.div key={a.title} variants={FV}
                className="group bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300">
                <div className="h-52 overflow-hidden relative">
                  <img src={a.img} alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                    onError={e => { e.target.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=60'; e.target.style.opacity='0.3' }}/>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-800/80 to-transparent"/>
                </div>
                <div className="p-6">
                  <h3 className="section-title text-xl text-accent mb-3">{a.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Our Journey</p>
            <h2 className="section-title text-4xl text-white">Three Decades of Excellence</h2>
          </motion.div>
          <motion.div className="space-y-6 relative" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            <div className="absolute left-[18px] sm:left-1/2 top-0 bottom-0 w-px bg-accent/20 hidden sm:block"/>
            {milestones.map((m,i) => (
              <motion.div key={m.year} variants={FV}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${i%2===0 ? 'sm:flex-row':'sm:flex-row-reverse'}`}>
                <div className={`flex-1 ${i%2===0?'sm:text-right sm:pr-10':'sm:text-left sm:pl-10'}`}>
                  <div className="glass p-5 rounded-xl inline-block text-left w-full sm:w-auto max-w-sm">
                    <div className="text-accent font-display font-bold text-lg">{m.year}</div>
                    <div className="text-white font-display font-semibold">{m.title}</div>
                    <div className="text-slate-400 text-sm mt-1">{m.desc}</div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-accent border-2 border-navy-950 z-10 shrink-0 hidden sm:block"/>
                <div className="flex-1 hidden sm:block"/>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Core Values</p>
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
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-navy-900">
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
