import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Cpu, Award, TrendingUp } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }
const VP = { once:true, margin:'-80px' }

const openings = [
  { dept:'Engineering',    title:'Process Engineer — AAC',         loc:'Hyderabad',    exp:'5–8 Years',  type:'Full-Time' },
  { dept:'Project Mgmt',   title:'Project Manager — Turnkey',      loc:'Hyderabad',    exp:'8–12 Years', type:'Full-Time' },
  { dept:'R&D',            title:'Research Engineer — Sustainability',loc:'Hyderabad',  exp:'3–6 Years',  type:'Full-Time' },
  { dept:'Sales',          title:'Business Development Manager',    loc:'Pan India',    exp:'5–10 Years', type:'Full-Time' },
  { dept:'Automation',     title:'Electrical & Automation Engineer', loc:'Hyderabad',   exp:'4–7 Years',  type:'Full-Time' },
  { dept:'Quality',        title:'Quality Assurance Lead',           loc:'Hyderabad',   exp:'6–9 Years',  type:'Full-Time' },
]

const perks = [
  { icon:Award,      title:'Industry Leader',      desc:"Work at India's top AAC plant manufacturer with 30+ years of engineering heritage." },
  { icon:Globe,      title:'Global Exposure',       desc:'Opportunities to work on international projects across Middle East, Africa and SE Asia.' },
  { icon:TrendingUp, title:'Career Growth',         desc:'Fast-track career progression in a growing company with ambitious expansion plans.' },
  { icon:Users,      title:'Expert Team',           desc:'Learn from experienced engineers and industry specialists in a collaborative environment.' },
]

export default function WorkWithUs() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', position:'', exp:'', message:'' })
  const [sent, setSent] = useState(false)
  const h = e => setForm(p => ({...p, [e.target.name]: e.target.value}))
  const submit = e => { e.preventDefault(); setSent(true) }
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-800"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Work With Us</p>
          <h1 className="section-title text-5xl text-white mb-4">Build the Future with Buildmate</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Join India's leading industrial plant manufacturer. Work on challenging engineering projects, grow your career and make an impact. HR: <a href="mailto:hr@buildmate.in" className="text-accent hover:underline">hr@buildmate.in</a></p>
        </div>
      </section>
      <div className="divider"/>

      {/* Perks */}
      <section className="py-16 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {perks.map(p => (
              <motion.div key={p.title} variants={FV}
                className="p-6 bg-navy-800 rounded-xl border border-white/5 text-center card-hover">
                <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <p.icon size={20} className="text-accent"/>
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Openings */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-10" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Current Openings</p>
            <h2 className="section-title text-3xl text-white">Open Positions</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {openings.map(o => (
              <motion.div key={o.title} variants={FV}
                className="p-5 bg-navy-800 rounded-xl border border-white/5 hover:border-accent/25 transition-all">
                <div className="text-xs font-display uppercase tracking-wider text-gold mb-1">{o.dept}</div>
                <h3 className="font-display font-semibold text-white mb-2">{o.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs text-slate-400 border border-white/10 px-2 py-0.5 rounded font-display">📍 {o.loc}</span>
                  <span className="text-xs text-slate-400 border border-white/10 px-2 py-0.5 rounded font-display">{o.exp}</span>
                  <span className="text-xs text-accent border border-accent/20 px-2 py-0.5 rounded font-display">{o.type}</span>
                </div>
                <a href="mailto:hr@buildmate.in" className="text-accent text-xs font-display font-semibold uppercase tracking-wide flex items-center gap-1 hover:gap-2 transition-all">
                  Apply via hr@buildmate.in <ArrowRight size={11}/>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-navy-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-8" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Apply Now</p>
            <h2 className="section-title text-3xl text-white">Send Your Application</h2>
            <p className="text-slate-400 text-sm mt-2">Or email your CV directly to <a href="mailto:hr@buildmate.in" className="text-accent hover:underline">hr@buildmate.in</a> | <a href="tel:+917675989925" className="text-accent hover:underline">+91 7675989925</a></p>
          </motion.div>
          {sent ? (
            <div className="glass p-10 rounded-2xl text-center">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="section-title text-2xl text-white mb-2">Application Sent!</h3>
              <p className="text-slate-400">Our HR team will review your application and reach out within 5 business days.</p>
            </div>
          ) : (
            <motion.form variants={FV} initial="hidden" whileInView="visible" viewport={VP}
              onSubmit={submit} className="glass p-8 rounded-2xl space-y-4">
              {[['name','Full Name','text'],['email','Email Address','email'],['phone','Phone Number','tel'],['position','Position Applied For','text'],['exp','Years of Experience','text']].map(([n,ph,t]) => (
                <input key={n} name={n} type={t} placeholder={ph} value={form[n]} onChange={h} required
                  className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"/>
              ))}
              <textarea name="message" rows={4} placeholder="Brief introduction and why you want to join Buildmate..." value={form.message} onChange={h}
                className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors resize-none"/>
              <button type="submit" className="btn-primary w-full justify-center">Submit Application <ArrowRight size={15}/></button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  )
}
