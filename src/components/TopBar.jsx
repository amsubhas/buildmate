import { Phone, Mail, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TopBar() {
  return (
    <div className="bg-navy-950 border-b border-white/5 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-10">
        <div className="flex items-center gap-6 text-slate-400">
          <a href="tel:+917675989961" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone size={13} />
            <span className="hidden sm:inline">+91 7675 989 961</span>
            <span className="sm:hidden">Call Us</span>
          </a>
          <a href="mailto:mvr@buildmate.in" className="hidden md:flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail size={13} />
            mvr@buildmate.in
          </a>
          <a href="mailto:marketing@buildmate.in" className="hidden lg:flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail size={13} />
            marketing@buildmate.in
          </a>
        </div>
        <Link to="/contact" className="flex items-center gap-1 text-accent text-xs font-semibold font-display uppercase tracking-wide hover:text-accent-light transition-colors">
          Request Inquiry <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}
