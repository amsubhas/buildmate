import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const FV = { hidden:{opacity:0,y:25}, visible:{opacity:1,y:0,transition:{duration:0.55}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.07}} }
const VP = { once:true, margin:'-80px' }

// All 18 real testimonials with buildmate.in logo images
const TESTIMONIALS = [
  { logo:'saudiaac',   company:'Saudi AAC Blocks',  location:'Saudi Arabia', text:'Buildmate commissioned AAC plants at our factory which have advanced technology processes resulting in high quality AAC blocks.' },
  { logo:'ecorex',     company:'Ecorex',            location:'UAE',          text:'Technology, experience and reliability are the core of a concrete batching plant. A solid basis for a long-lasting partnership.' },
  { logo:'elite',      company:'Elite Industries',  location:'India',        text:'High quality standards, regular interaction and prompt solutions. We are proud to be associated with Buildmate.' },
  { logo:'eko',        company:'Eko Blocks',        location:'India',        text:'Buildmate advanced technology allows complete solutions to ensure highly efficient and optimised processes with consistent final product quality.' },
  { logo:'rancare',    company:'RanCare',           location:'India',        text:'One of the keys to increase productivity and quality is continuous training of the machine and maintenance personnel.' },
  { logo:'duralite',   company:'Duralite',          location:'Africa',       text:'Designed according to our specific requirements. Our experience confirms that such indigenous solutions strengthen our market position.' },
  { logo:'ultratech',  company:'Ultratech Cement',  location:'India',        text:'Buildmate commissioned AAC plants with advanced technology resulting in high quality products. Excellent engineering and after-sales support.' },
  { logo:'espec',      company:'ESPEC',             location:'South India',  text:'Technology, experience and reliability are the core of every plant Buildmate delivers. A truly long-lasting partnership.' },
  { logo:'icom',       company:'ICOM',              location:'Middle East',  text:'High quality standards, prompt solutions and always available support. Proud to be a Buildmate customer.' },
  { logo:'vedam',      company:'Vedam Industries',  location:'Telangana',    text:'Buildmate advanced technology allows complete optimised processes. Their engineering team always goes the extra mile.' },
  { logo:'earthpaver', company:'Earth Pavers',      location:'AP, India',    text:'Continuous training and maintenance support from the Buildmate team has been key to our productivity growth.' },
  { logo:'bepl',       company:'BEPL',              location:'Maharashtra',  text:'Designed to our specific requirements — their solution has strengthened our competitive market position significantly.' },
  { logo:'inventa',    company:'Inventa',           location:'Gujarat',      text:'Buildmate plants are built with advanced technology and quality processes. Very reliable partner for our expansion.' },
  { logo:'sahay',      company:'Sahay Industries',  location:'Rajasthan',    text:'Excellent engineering support and timely delivery. The plant performance has exceeded our initial targets.' },
  { logo:'magna',      company:'Magna',             location:'Karnataka',    text:'High quality equipment, professional team and best-in-class after-sales support. Highly recommend Buildmate.' },
  { logo:'pionner',    company:'Pioneer Industries',location:'MP, India',    text:'Buildmate delivered a fully automated block plant that runs with minimal downtime. Great product, great team.' },
  { logo:'kesoram',    company:'Kesoram Industries',location:'Hyderabad',    text:'Our AAC plant from Buildmate produces consistently high-quality blocks. Excellent design and engineering quality.' },
  { logo:'adityabirla',company:'Aditya Birla Group',location:'Pan India',    text:"A world-class manufacturing partner. Buildmate's AAC plants deliver unmatched throughput and product quality." },
]

export default function Customers() {
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage:"url('/images/banner_whoweare.jpg')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Customers</p>
          <h1 className="section-title text-5xl text-white mb-4">Our Clients & Testimonials</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Trusted by industry leaders across India, Middle East, Africa and South East Asia. Here is what our clients say about working with Buildmate.</p>
        </div>
      </section>
      <div className="divider"/>

      {/* Client Logo Grid */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-10" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Trusted By</p>
            <h2 className="section-title text-3xl text-white">Our Clients</h2>
          </motion.div>
          <motion.div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {TESTIMONIALS.map(t => (
              <motion.div key={t.company} variants={FV}
                className="aspect-[3/2] bg-navy-800 border border-white/5 rounded-xl flex items-center justify-center p-3 hover:border-accent/25 transition-all group">
                <img src={`/images/${t.logo}.png`} alt={t.company}
                  className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<span class="text-slate-400 text-xs font-display text-center uppercase tracking-wide">${t.company}</span>` }}/>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <p className="section-label justify-center mb-2">Testimonials</p>
            <h2 className="section-title text-4xl text-white">What Our Clients Say</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {TESTIMONIALS.map(t => (
              <motion.div key={t.company} variants={FV}
                className="p-6 bg-navy-800 rounded-xl border border-white/5 hover:border-accent/20 transition-all flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_,i) => <span key={i} className="text-gold text-sm">★</span>)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-16 h-10 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-white/5 p-1">
                    <img src={`/images/${t.logo}.png`} alt={t.company}
                      className="max-w-full max-h-full object-contain opacity-80"
                      onError={e => { e.target.style.display='none' }}/>
                  </div>
                  <div>
                    <div className="text-white text-sm font-display font-semibold">{t.company}</div>
                    <div className="text-slate-500 text-xs">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-900 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={FV} initial="hidden" whileInView="visible" viewport={VP}>
            <h2 className="section-title text-4xl text-white mb-4">Join Our Global Client Network</h2>
            <p className="text-slate-400 mb-8">Become part of the 500+ companies who trust Buildmate for their industrial plant requirements.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary">Get a Quote <ArrowRight size={15}/></Link>
              <Link to="/projects" className="btn-outline">View Projects</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
