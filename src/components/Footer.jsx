import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Linkedin, Youtube, Twitter, Send } from 'lucide-react'
import { useState } from 'react'

const products = ['AAC Plants','Stone Crushing Plants','Concrete Batching Plants','Dry Mix Mortar Plants','Precast Concrete Plants','PEB Systems','Concrete Block Plants']
const services = ['Engineering Consultancy','Turnkey Solutions','AMC Support','Plant Modernization','Training Programs','Capacity Optimization']
const quick = [['Home','/'],['About Us','/about'],['Products','/products'],['Services','/services'],['Facilities','/facilities'],['News & Events','/news'],['Blog','/blog'],['Partner With Us','/partner'],['Contact Us','/contact']]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer className="bg-navy-950 border-t border-white/5">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 border-y border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="section-label mb-1">Ready to Build?</p>
            <h3 className="section-title text-2xl text-white">Start Your Project with Buildmate</h3>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/contact" className="btn-primary">Get Free Consultation</Link>
            <a href="tel:+917675989961" className="btn-outline">Call Us Now</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center"
                style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }}>
                <span className="text-white font-display font-bold text-sm">B</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">BUILD<span className="text-gold">MATE</span></div>
                <div className="text-[10px] text-slate-400 tracking-widest uppercase">Projects Pvt Ltd</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              30+ years of engineering excellence delivering premium industrial plant solutions globally. From concept to commissioning, we build the future.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-400 mb-5">
              <a href="tel:+917675989961" className="flex items-center gap-2 hover:text-accent transition-colors"><Phone size={13}/> +91 7675 989 961</a>
              <a href="tel:+917675989911" className="flex items-center gap-2 hover:text-accent transition-colors"><Phone size={13}/> +91 7675 989 911</a>
              <a href="mailto:mvr@buildmate.in" className="flex items-center gap-2 hover:text-accent transition-colors"><Mail size={13}/> mvr@buildmate.in</a>
              <a href="mailto:marketing@buildmate.in" className="flex items-center gap-2 hover:text-accent transition-colors"><Mail size={13}/> marketing@buildmate.in</a>
              <div className="flex items-start gap-2"><MapPin size={13} className="mt-0.5 shrink-0"/> <span>Sy No 60-62, Gundlapochampally, Medchal Rd, Hyderabad 500014, Telangana</span></div>
            </div>
            <div className="flex gap-2">
              {[['#',Linkedin],['#',Facebook],['#',Youtube],['#',Twitter]].map(([href,Icon],i) => (
                <a key={i} href={href} className="w-9 h-9 border border-white/10 rounded flex items-center justify-center text-slate-400 hover:border-accent hover:text-accent transition-colors">
                  <Icon size={15}/>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-semibold uppercase tracking-wider text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quick.map(([label,to]) => (
                <li key={to}><Link to={to} className="text-slate-400 text-sm hover:text-accent transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-display font-semibold uppercase tracking-wider text-sm mb-4">Products</h4>
            <ul className="space-y-2">
              {products.map(p => (
                <li key={p}><Link to="/products" className="text-slate-400 text-sm hover:text-accent transition-colors">{p}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services + Newsletter */}
          <div>
            <h4 className="text-white font-display font-semibold uppercase tracking-wider text-sm mb-4">Services</h4>
            <ul className="space-y-2 mb-6">
              {services.map(s => (
                <li key={s}><Link to="/services" className="text-slate-400 text-sm hover:text-accent transition-colors">{s}</Link></li>
              ))}
            </ul>
            <h4 className="text-white font-display font-semibold uppercase tracking-wider text-sm mb-3">Newsletter</h4>
            <p className="text-slate-400 text-xs mb-2 leading-relaxed">Stay updated with our latest projects and insights.</p>
            <div className="flex">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-navy-800 border border-white/10 rounded-l px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-accent"/>
              <button onClick={() => { if(email){ setSent(true); setEmail('') } }}
                className="bg-accent hover:bg-accent-dark px-3 py-2 rounded-r text-white transition-colors">
                <Send size={14}/>
              </button>
            </div>
            {sent && <p className="text-accent text-xs mt-1">Subscribed!</p>}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© 2025 Buildmate Projects Pvt Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">|</span>
            <a href="https://sharvasit.in" target="_blank" rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-500 transition-colors text-[11px]">
              Website by Sharva's IT
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
