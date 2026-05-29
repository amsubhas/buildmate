import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ArrowRight } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const VP = { once:true, margin:'-80px' }

const departments = [
  { name:'Sales & Enquiries', email:'mvr@buildmate.in', phone:'+91 7675 989 961', icon:'💼' },
  { name:'Marketing', email:'marketing@buildmate.in', phone:'+91 7675 989 911', icon:'📢' },
  { name:'Purchase', email:'purchase@buildmate.in', phone:'+91 7675 989 907', icon:'🛒' },
  { name:'HR Department', email:'hr@buildmate.in', phone:'+91 7675 989 961', icon:'👥' },
]

export default function Contact() {
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', product:'', message:'' })
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
          <p className="text-slate-300 max-w-xl leading-relaxed">Reach out to our team for project enquiries, technical consultations or general information.</p>
        </div>
      </section>
      <div className="divider"/>

      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
                <h2 className="section-title text-3xl text-white mb-6">Contact Information</h2>

                {/* Address */}
                <div className="glass p-5 rounded-xl mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={16} className="text-accent"/>
                    </div>
                    <div>
                      <div className="text-white font-display font-semibold mb-1">Head Office</div>
                      <div className="text-slate-400 text-sm leading-relaxed">
                        Sy No 60, 61, 62,<br/>
                        Gundlapochampally Village,<br/>
                        Medchal Road, Hyderabad – 500014<br/>
                        Telangana, India
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass p-5 rounded-xl mb-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-accent shrink-0"/>
                    <div>
                      <a href="tel:+917675989961" className="text-white text-sm hover:text-accent transition-colors block">+91 7675 989 961</a>
                      <a href="tel:+917675989911" className="text-slate-400 text-sm hover:text-accent transition-colors block">+91 7675 989 911</a>
                      <a href="tel:+917675989907" className="text-slate-400 text-sm hover:text-accent transition-colors block">+91 7675 989 907</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={15} className="text-accent shrink-0 mt-0.5"/>
                    <div>
                      <a href="mailto:mvr@buildmate.in" className="text-white text-sm hover:text-accent transition-colors block">mvr@buildmate.in</a>
                      <a href="mailto:marketing@buildmate.in" className="text-slate-400 text-sm hover:text-accent transition-colors block">marketing@buildmate.in</a>
                      <a href="mailto:purchase@buildmate.in" className="text-slate-400 text-sm hover:text-accent transition-colors block">purchase@buildmate.in</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={15} className="text-accent shrink-0"/>
                    <span className="text-slate-300 text-sm">Mon–Sat: 9:00 AM – 6:30 PM IST</span>
                  </div>
                </div>

                <a href="https://wa.me/917675989961" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-display font-semibold text-sm uppercase tracking-wide transition-colors">
                  <MessageCircle size={17}/> Chat on WhatsApp
                </a>
              </motion.div>

              {/* Departments */}
              <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
                <h3 className="font-display font-semibold text-white text-lg mb-4 uppercase tracking-wide">Departments</h3>
                <div className="space-y-3">
                  {departments.map(d => (
                    <div key={d.name} className="glass p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{d.icon}</span>
                        <span className="text-white font-display font-semibold text-sm">{d.name}</span>
                      </div>
                      <a href={`mailto:${d.email}`} className="text-accent text-xs hover:text-accent-light block transition-colors">{d.email}</a>
                      <a href={`tel:${d.phone.replace(/\s/g,'')}`} className="text-slate-400 text-xs hover:text-white block transition-colors">{d.phone}</a>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
                {sent ? (
                  <div className="glass p-14 rounded-2xl text-center h-full flex flex-col items-center justify-center">
                    <div className="text-6xl mb-5">✓</div>
                    <h3 className="section-title text-2xl text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400">Our team will respond within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="btn-outline mt-6">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="glass p-8 rounded-2xl">
                    <h2 className="section-title text-2xl text-white mb-6">Send Us a Message</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      {[['name','Your Full Name','text'],['company','Company Name','text'],['email','Email Address','email'],['phone','Phone Number','tel']].map(([n,ph,t]) => (
                        <div key={n}>
                          <label className="text-xs font-display uppercase tracking-wider text-slate-400 block mb-1.5">{ph}</label>
                          <input name={n} type={t} placeholder={ph} value={form[n]} onChange={h} required
                            className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-accent focus:outline-none transition-colors"/>
                        </div>
                      ))}
                    </div>
                    <div className="mb-5">
                      <label className="text-xs font-display uppercase tracking-wider text-slate-400 block mb-1.5">Product / Service Interest</label>
                      <select name="product" value={form.product} onChange={h} className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors">
                        <option value="">Select Product or Service</option>
                        <option>AAC Plants</option>
                        <option>Stone Crushing Plants</option>
                        <option>Concrete Batching Plants</option>
                        <option>Dry Mix Mortar Plants</option>
                        <option>Precast Concrete Plants</option>
                        <option>PEB Systems</option>
                        <option>Concrete Block Plants</option>
                        <option>Cranes</option>
                        <option>Mixers</option>
                        <option>Engineering Services</option>
                        <option>AMC / Support</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="text-xs font-display uppercase tracking-wider text-slate-400 block mb-1.5">Your Message</label>
                      <textarea name="message" rows={5} placeholder="Describe your project requirements, capacity needed, location and any other relevant details..." value={form.message} onChange={h} required
                        className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-accent focus:outline-none transition-colors resize-none"/>
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center text-sm">
                      <Send size={15}/> Send Inquiry
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Map placeholder */}
              <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}
                className="mt-6 glass rounded-2xl overflow-hidden h-52 flex items-center justify-center border border-accent/10">
                <div className="text-center text-slate-500">
                  <MapPin size={28} className="mx-auto mb-2 text-accent/40"/>
                  <p className="text-sm">Gundlapochampally, Medchal Road</p>
                  <p className="text-xs">Hyderabad – 500014, Telangana</p>
                  <a href="https://maps.google.com/?q=Gundlapochampally+Hyderabad" target="_blank" rel="noopener noreferrer"
                    className="text-accent text-xs mt-2 flex items-center justify-center gap-1 hover:text-accent-light">
                    Open in Google Maps <ArrowRight size={11}/>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
