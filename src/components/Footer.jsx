import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'

const PRODUCTS = [
  ['AAC Plants','/products#aac'],['Stone Crushing Plants','/products#crushing'],
  ['Concrete Batching Plants','/products#batching'],['Dry Mix Mortar Plants','/products#drymix'],
  ['Precast Concrete Plants','/products#precast'],['Concrete Block/Brick Plants','/products#block'],
  ['Cranes','/products#cranes'],['Mixers','/products#mixers'],
  ['PEB (Pre Engineered Buildings)','/products#peb'],['Special Projects','/products#special'],
]
const QUICK = [
  ['Home','/'],['Who We Are','/about'],['Products','/products'],['Services','/services'],
  ['Facilities','/facilities'],['Projects','/projects'],['Customers','/customers'],
  ['News & Events','/news'],['Blog','/blog'],['Partner With Us','/partner'],
  ['Work With Us','/work-with-us'],['Contact Us','/contact'],
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer className="bg-navy-950 border-t border-white/5">
      {/* CTA */}
      <div className="bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 border-y border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="section-label mb-1">Ready to Build?</p>
            <h3 className="section-title text-2xl text-white">Start Your Project with Buildmate</h3>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap justify-center">
            <Link to="/contact" className="btn-primary">Get Free Consultation</Link>
            <a href="tel:+917675989961" className="btn-outline">Call Us Now</a>
            <a href="https://wa.me/917675989961" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded font-display font-semibold text-sm uppercase tracking-wide transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/5">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="https://buildmate.in/images/Buildmate_logo_rbg.png" alt="Buildmate"
                className="h-12 w-auto object-contain" onError={e=>e.target.style.display='none'}/>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Since 1991 — Buildmate Projects Pvt Ltd is India's leading manufacturer and supplier of AAC Block Plants
              and comprehensive building material manufacturing equipment. Concept to commissioning, worldwide.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-400 mb-5">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="mt-0.5 shrink-0 text-accent"/>
                <span>Sy No 60-62, Gundlapochampally, Medchal Road, Hyderabad 500014, Telangana, India</span>
              </div>
              <div className="grid grid-cols-1 gap-1 mt-1 pl-5">
                <div>
                  <span className="text-slate-500 text-xs">CEO: </span>
                  <a href="mailto:mvr@buildmate.in" className="hover:text-accent transition-colors">Mr. M. Venkata Ratnam — mvr@buildmate.in</a>
                </div>
                <div>
                  <span className="text-slate-500 text-xs">Marketing: </span>
                  <a href="tel:+917675989961" className="hover:text-accent transition-colors">+91 7675989961 / 11</a>
                  <span className="mx-1 text-slate-600">·</span>
                  <a href="mailto:marketing@buildmate.in" className="hover:text-accent transition-colors">marketing@buildmate.in</a>
                </div>
                <div>
                  <span className="text-slate-500 text-xs">Purchase: </span>
                  <a href="tel:+917675989907" className="hover:text-accent transition-colors">+91 7675989907 / 08</a>
                  <span className="mx-1 text-slate-600">·</span>
                  <a href="mailto:purchase@buildmate.in" className="hover:text-accent transition-colors">purchase@buildmate.in</a>
                </div>
                <div>
                  <span className="text-slate-500 text-xs">HR: </span>
                  <a href="tel:+917675989925" className="hover:text-accent transition-colors">+91 7675989925</a>
                  <span className="mx-1 text-slate-600">·</span>
                  <a href="mailto:hr@buildmate.in" className="hover:text-accent transition-colors">hr@buildmate.in</a>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {[
                ['https://www.linkedin.com/company/buildmate-projects','in'],
                ['https://www.facebook.com/buildmate','f'],
                ['https://twitter.com/buildmate_india','𝕏'],
                ['https://www.youtube.com/channel/UCkSOsjcSnxxPxJjAJGJW00w/videos','▶'],
              ].map(([href,icon]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 rounded flex items-center justify-center text-slate-400 text-sm font-bold hover:border-accent hover:text-accent transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-display font-semibold uppercase tracking-wider text-sm mb-4">Quick Links</h4>
            <ul className="space-y-1.5">
              {QUICK.map(([label,to]) => (
                <li key={to}><Link to={to} className="text-slate-400 text-xs hover:text-accent transition-colors font-display uppercase tracking-wide">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-display font-semibold uppercase tracking-wider text-sm mb-4">Products</h4>
            <ul className="space-y-1.5">
              {PRODUCTS.map(([label,to]) => (
                <li key={to}><Link to={to} className="text-slate-400 text-xs hover:text-accent transition-colors font-display uppercase tracking-wide">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services + Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-display font-semibold uppercase tracking-wider text-sm mb-4">Services</h4>
            <ul className="space-y-1.5 mb-6">
              {[['Setting Up AAC Plant','/services'],['Turnkey Solutions','/services'],
                ['Feasibility Study','/services'],['Detailed Project Report','/services'],
                ['Process Design & Engineering','/services'],['Construction Management','/services'],
                ['AAC Plant Maintenance','/services'],['After Sales Service','/services']].map(([l,t]) => (
                <li key={l}><Link to={t} className="text-slate-400 text-xs hover:text-accent transition-colors font-display uppercase tracking-wide">{l}</Link></li>
              ))}
            </ul>
            <h4 className="text-white font-display font-semibold uppercase tracking-wider text-sm mb-3">Newsletter</h4>
            <div className="flex">
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-navy-800 border border-white/10 rounded-l px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-accent"/>
              <button onClick={() => { if(email){ setSent(true); setEmail('') } }}
                className="bg-accent hover:bg-accent-dark px-3 py-2 rounded-r text-white transition-colors text-xs font-display font-bold">
                {sent ? '✓' : 'GO'}
              </button>
            </div>
            {sent && <p className="text-accent text-xs mt-1">Subscribed!</p>}
            <div className="mt-4 text-xs text-slate-500">
              <a href="https://buildmate.in/brochures.php" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-accent transition-colors mb-1">
                📥 Download E-Brochures
              </a>
              <a href="https://buildmate.in/enquiry.php" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-accent transition-colors">
                📋 Product Enquiry Form
              </a>
            </div>
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 flex-wrap">
          <p>© 1991–2025 <strong className="text-slate-400">Buildmate Projects Pvt Ltd</strong>. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Contact</Link>
            <Link to="/partner" className="hover:text-slate-400 transition-colors">Partner With Us</Link>
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
