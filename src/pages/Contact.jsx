import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ArrowRight } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const VP = { once:true, margin:'-80px' }

const departments = [
  { icon:'👔', name:'CEO & Sales',       email:'mvr@buildmate.in',          phone:'+91 7675 989 961', contact:'Mr. M. Venkata Ratnam' },
  { icon:'📢', name:'Marketing',         email:'marketing@buildmate.in',     phone:'+91 7675 989 911', contact:'Marketing Team' },
  { icon:'🛒', name:'Purchase',          email:'purchase@buildmate.in',      phone:'+91 7675 989 907 / 908', contact:'Purchase Dept' },
  { icon:'🤝', name:'Partnerships',       email:'partnership@buildmate.in',   phone:'+91 7675 989 961', contact:'Business Dev' },
  { icon:'👥', name:'HR / Careers',       email:'hr@buildmate.in',            phone:'+91 7675 989 925', contact:'HR Department' },
]

export default function Contact() {
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', country:'', product:'', message:'' })
  const [sent, setSent] = useState(false)
  const h = e => setForm(p => ({...p, [e.target.name]: e.target.value}))
  const submit = e => { e.preventDefault(); setSent(true) }

  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-800"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Contact Us</p>
          <h1 className="section-title text-5xl text-white mb-4">Let's Build Something Great Together</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Reach out for project enquiries, technical consultations, partnerships or any information about our products and services.</p>
        </div>
      </section>
      <div className="divider"/>

      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info Panel */}
            <div className="lg:col-span-2 space-y-5">
              <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
                <h2 className="section-title text-2xl text-white mb-5">Contact Information</h2>

                <div className="glass p-5 rounded-xl mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><MapPin size={16} className="text-accent"/></div>
                    <div>
                      <div className="text-white font-display font-semibold mb-1">Buildmate Projects Pvt Ltd</div>
                      <div className="text-slate-400 text-sm leading-relaxed">
                        Sy No 60, 61, 62,<br/>Gundlapochampally Village,<br/>Medchal Road,<br/>Hyderabad – 500014<br/>Telangana, India
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass p-5 rounded-xl mb-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone size={14} className="text-accent shrink-0 mt-0.5"/>
                    <div className="text-sm">
                      <a href="tel:+917675989961" className="text-white hover:text-accent transition-colors block">+91 7675 989 961</a>
                      <a href="tel:+917675989911" className="text-slate-400 hover:text-accent transition-colors block">+91 7675 989 911</a>
                      <a href="tel:+917675989907" className="text-slate-400 hover:text-accent transition-colors block">+91 7675 989 907 / 908</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={14} className="text-accent shrink-0 mt-0.5"/>
                    <div className="text-sm">
                      <a href="mailto:mvr@buildmate.in" className="text-white hover:text-accent block transition-colors">mvr@buildmate.in <span className="text-slate-500 text-xs">(CEO)</span></a>
                      <a href="mailto:marketing@buildmate.in" className="text-slate-400 hover:text-accent block transition-colors">marketing@buildmate.in</a>
                      <a href="mailto:purchase@buildmate.in" className="text-slate-400 hover:text-accent block transition-colors">purchase@buildmate.in</a>
                      <a href="mailto:partnership@buildmate.in" className="text-slate-400 hover:text-accent block transition-colors">partnership@buildmate.in</a>
                      <a href="mailto:hr@buildmate.in" className="text-slate-400 hover:text-accent block transition-colors">hr@buildmate.in</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="text-accent shrink-0"/>
                    <span className="text-slate-300 text-sm">Mon–Sat: 9:00 AM – 6:30 PM IST</span>
                  </div>
                </div>

                <a href="https://wa.me/917675989961" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-display font-semibold text-sm uppercase tracking-wide transition-colors">
                  <MessageCircle size={16}/> Chat on WhatsApp
                </a>
                <a href="https://buildmate.in/brochures.php" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full btn-outline mt-3 py-3">
                  📥 Download E-Brochures
                </a>
              </motion.div>

              <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
                <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-3">Departments</h3>
                <div className="space-y-2">
                  {departments.map(d => (
                    <div key={d.name} className="glass p-3.5 rounded-xl">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span>{d.icon}</span>
                        <span className="text-white font-display font-semibold text-sm">{d.name}</span>
                        <span className="text-slate-500 text-xs ml-1">— {d.contact}</span>
                      </div>
                      <a href={`mailto:${d.email}`} className="text-accent text-xs hover:text-accent-light block transition-colors">{d.email}</a>
                      <a href={`tel:${d.phone.replace(/[\s/]/g,'')}`} className="text-slate-400 text-xs hover:text-white block transition-colors">{d.phone}</a>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Map placeholder */}
              <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}
                className="glass rounded-2xl overflow-hidden h-44 flex flex-col items-center justify-center border border-accent/10">
                <MapPin size={24} className="mb-2 text-accent/40"/>
                <p className="text-sm text-slate-500">Gundlapochampally, Medchal Road</p>
                <p className="text-xs text-slate-600">Hyderabad – 500014, Telangana</p>
                <a href="https://maps.google.com/?q=Gundlapochampally+Hyderabad+500014" target="_blank" rel="noopener noreferrer"
                  className="text-accent text-xs mt-2 flex items-center gap-1 hover:text-accent-light">
                  Open in Google Maps <ArrowRight size={10}/>
                </a>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
                {sent ? (
                  <div className="glass p-14 rounded-2xl text-center h-full flex flex-col items-center justify-center">
                    <div className="text-6xl mb-5">✓</div>
                    <h3 className="section-title text-2xl text-white mb-2">Enquiry Sent!</h3>
                    <p className="text-slate-400 mb-2">Our team will respond within 24 hours.</p>
                    <p className="text-slate-500 text-sm">Alternatively call <a href="tel:+917675989961" className="text-accent">+91 7675 989 961</a></p>
                    <button onClick={() => setSent(false)} className="btn-outline mt-6">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="glass p-8 rounded-2xl">
                    <h2 className="section-title text-2xl text-white mb-6">Send Us a Message</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {[['name','Your Full Name','text'],['company','Company Name','text'],['email','Email Address','email'],['phone','Phone Number','tel'],['country','Country','text']].map(([n,ph,t]) => (
                        <div key={n}>
                          <label className="text-xs font-display uppercase tracking-wider text-slate-400 block mb-1.5">{ph}</label>
                          <input name={n} type={t} placeholder={ph} value={form[n]} onChange={h} required
                            className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-accent focus:outline-none transition-colors"/>
                        </div>
                      ))}
                      <div>
                        <label className="text-xs font-display uppercase tracking-wider text-slate-400 block mb-1.5">Product / Service Interest</label>
                        <select name="product" value={form.product} onChange={h} className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-accent focus:outline-none transition-colors">
                          <option value="">Select Product or Service</option>
                          <option>AAC Plants</option><option>Stone Crushing Plants</option>
                          <option>Concrete Batching Plants</option><option>Dry Mix Mortar Plants</option>
                          <option>Precast Concrete Plants</option><option>PEB Systems</option>
                          <option>Concrete Block Plants</option><option>Cranes</option><option>Mixers</option>
                          <option>Special Projects</option><option>Engineering Services</option>
                          <option>AMC / After Sales</option><option>Partnership</option><option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-5">
                      <label className="text-xs font-display uppercase tracking-wider text-slate-400 block mb-1.5">Your Message</label>
                      <textarea name="message" rows={5} placeholder="Describe your project — product type, capacity needed, location, timeline and any other requirements..." value={form.message} onChange={h} required
                        className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-accent focus:outline-none transition-colors resize-none"/>
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center text-sm">
                      <Send size={15}/> Send Enquiry
                    </button>
                    <p className="text-slate-500 text-xs text-center mt-3">
                      Or call <a href="tel:+917675989961" className="text-accent">+91 7675 989 961</a> · <a href="mailto:mvr@buildmate.in" className="text-accent">mvr@buildmate.in</a>
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
