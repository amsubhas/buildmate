import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Award, Users, Globe, Cpu, Handshake } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.1}} }
const VP = { once:true, margin:'-80px' }

const benefits = [
  { icon:TrendingUp, title:'Exclusive Territory Rights',  desc:'Dedicated geographic territory with exclusive dealership rights for Buildmate product lines in your market.' },
  { icon:Award,      title:'Marketing Support',           desc:'Full marketing collateral, digital assets, exhibition support and Buildmate brand usage rights.' },
  { icon:Users,      title:'Technical Training',          desc:'Comprehensive product and application engineering training. Sales and after-sales support programs.' },
  { icon:Globe,      title:'Global Brand Backing',        desc:'Leverage Buildmate 30+ year industry reputation and 500+ global project references.' },
  { icon:Cpu,        title:'Pre-Sales Engineering',       desc:'Dedicated pre-sales engineering support for proposals, technical queries and customer demos.' },
  { icon:Handshake,  title:'Competitive Margins',         desc:'Industry-competitive dealer margins with performance-based incentive and bonus programs.' },
]

const programs = [
  { title:'Authorized Dealer', best:true, desc:'Full product dealership with territory exclusivity. Ideal for established industrial equipment companies seeking to expand portfolio.',
    ideal:'Industrial equipment distributors, EPC companies',
    requirements:['Min 3 yrs industrial exp.','Technical sales team','Workshop/service facility','Financial capability'] },
  { title:'Technology Partner', best:false, desc:'Technical collaboration for custom plant development, specialized applications and joint project execution with Buildmate engineering teams.',
    ideal:'Engineering consultancies, EPCs, specialized contractors',
    requirements:['Strong engineering team','Project execution track record','Technical infrastructure','Industry expertise'] },
  { title:'Regional Representative', best:false, desc:'Area representative for business development and lead generation. Commission-based with full marketing support.',
    ideal:'Individual consultants, industry professionals',
    requirements:['Industry network','B2B sales experience','Local market knowledge','Strong communication'] },
]

export default function Partner() {
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', country:'', type:'', message:'' })
  const [sent, setSent] = useState(false)
  const h = e => setForm(p => ({...p, [e.target.name]: e.target.value}))
  const submit = e => { e.preventDefault(); setSent(true) }
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-800"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Partner With Us</p>
          <h1 className="section-title text-5xl text-white mb-4">Grow Together with Buildmate</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Join our global partner network and represent world-class industrial engineering solutions in your region. Email: <a href="mailto:partnership@buildmate.in" className="text-accent hover:underline">partnership@buildmate.in</a></p>
        </div>
      </section>
      <div className="divider"/>

      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Benefits</p>
            <h2 className="section-title text-4xl text-white">Why Partner with Buildmate</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {benefits.map(b => (
              <motion.div key={b.title} variants={FV}
                className="p-6 bg-navy-800 rounded-xl border border-white/5 hover:border-accent/30 transition-all group">
                <div className="w-11 h-11 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <b.icon size={20} className="text-accent"/>
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Programs</p>
            <h2 className="section-title text-4xl text-white">Partnership Models</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {programs.map(p => (
              <motion.div key={p.title} variants={FV}
                className={`p-7 rounded-2xl border ${p.best ? 'border-accent/40 bg-gradient-to-b from-accent/10 to-navy-800' : 'border-white/5 bg-navy-800'}`}>
                {p.best && <div className="text-xs font-display uppercase tracking-wider text-accent mb-3 border border-accent/30 px-3 py-1 rounded-full inline-block">Most Popular</div>}
                <h3 className="section-title text-2xl text-white mb-3">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                <p className="text-xs text-slate-500 mb-3"><span className="text-gold">Ideal for: </span>{p.ideal}</p>
                <ul className="space-y-1.5">
                  {p.requirements.map(r => (
                    <li key={r} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"/>{r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-10" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Apply Now</p>
            <h2 className="section-title text-4xl text-white">Partnership Enquiry</h2>
            <p className="text-slate-400 mt-2 text-sm">Or email directly: <a href="mailto:partnership@buildmate.in" className="text-accent hover:underline">partnership@buildmate.in</a></p>
          </motion.div>
          {sent ? (
            <motion.div variants={FV} initial="hidden" animate="visible" className="text-center glass p-12 rounded-2xl">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="section-title text-2xl text-white mb-2">Enquiry Submitted!</h3>
              <p className="text-slate-400">Our partnership team will contact you within 2 business days at <span className="text-accent">partnership@buildmate.in</span></p>
            </motion.div>
          ) : (
            <motion.form variants={FV} initial="hidden" whileInView="visible" viewport={VP}
              onSubmit={submit} className="glass p-8 rounded-2xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[['name','Full Name','text'],['company','Company Name','text'],['email','Email','email'],['phone','Phone','tel'],['country','Country','text']].map(([n,ph,t]) => (
                  <input key={n} name={n} type={t} placeholder={ph} value={form[n]} onChange={h} required
                    className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"/>
                ))}
                <select name="type" value={form.type} onChange={h} required className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors">
                  <option value="">Partnership Type</option>
                  <option>Authorized Dealer</option><option>Technology Partner</option><option>Regional Representative</option>
                </select>
              </div>
              <textarea name="message" rows={4} placeholder="Tell us about your company, target market and interest..." value={form.message} onChange={h}
                className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors resize-none"/>
              <button type="submit" className="btn-primary w-full justify-center">Submit Enquiry <ArrowRight size={15}/></button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  )
}
