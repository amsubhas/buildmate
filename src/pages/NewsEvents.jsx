import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'

const FV = { hidden:{opacity:0,y:25}, visible:{opacity:1,y:0,transition:{duration:0.5}} }
const VP = { once:true, margin:'-80px' }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.08}} }

const events = [
  { type:"Exhibition", title:"EXCON 2024 – India Premier Construction Equipment Expo", date:"26–30 Nov 2024", location:"Bangalore, Karnataka", desc:"Buildmate participated at EXCON 2024, showcasing our latest AAC Plant technology, concrete batching systems and automation solutions to 2000+ industry visitors.", img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", status:"Past" },
  { type:"Product Launch", title:"Next-Generation AAC Plant Series – Product Launch", date:"Oct 2024", location:"Hyderabad, India", desc:"Official launch of our new high-efficiency AAC Plant series with integrated IoT monitoring, energy recovery systems and 30% improved production throughput.", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", status:"Past" },
  { type:"Conference", title:"Smart Manufacturing Summit 2024", date:"Sep 2024", location:"Hyderabad, India", desc:"Buildmate presented on Industry 4.0 Integration in Concrete and AAC Plant Manufacturing at the Smart Manufacturing Summit organized by CII.", img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80", status:"Past" },
  { type:"Trade Show", title:"Big 5 Dubai 2024 – Global Construction Event", date:"Nov 2024", location:"Dubai, UAE", desc:"International participation at Big 5 Dubai, engaging with Middle East and GCC clients on AAC plant installations and precast solutions for the region.", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", status:"Past" },
  { type:"Exhibition", title:"EXCON 2025 – Upcoming Participation", date:"Nov 2025", location:"Bangalore, India", desc:"Buildmate will be showcasing next-generation sustainable manufacturing solutions, carbon capture integration and full automation plant systems at EXCON 2025.", img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", status:"Upcoming" },
  { type:"Webinar", title:"AAC Technology and Market Trends Webinar", date:"Q1 2025", location:"Online / Virtual", desc:"Upcoming webinar on AAC Block market opportunities in India and Southeast Asia. Registration open for investors, plant owners and construction professionals.", img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80", status:"Upcoming" },
]

export default function NewsEvents() {
  const past = events.filter(e => e.status === 'Past')
  const upcoming = events.filter(e => e.status === 'Upcoming')
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">News & Events</p>
          <h1 className="section-title text-5xl text-white mb-4">Exhibitions, Launches & Industry Events</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Buildmate at industry events across India and the globe — showcasing innovation and engineering excellence.</p>
        </div>
      </section>
      <div className="divider"/>
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div className="mb-16">
              <motion.h2 variants={FV} initial="hidden" whileInView="visible" viewport={VP}
                className="section-title text-3xl text-accent mb-8">Upcoming Events</motion.h2>
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
                {upcoming.map(e => (
                  <EventCard key={e.title} event={e}/>
                ))}
              </motion.div>
            </div>
          )}
          {/* Past */}
          <motion.h2 variants={FV} initial="hidden" whileInView="visible" viewport={VP}
            className="section-title text-3xl text-white mb-8">Past Events</motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {past.map(e => (
              <EventCard key={e.title} event={e}/>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function EventCard({ event:e }) {
  return (
    <motion.div variants={{ hidden:{opacity:0,y:25}, visible:{opacity:1,y:0} }}
      className="group bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 flex">
      <div className="w-36 sm:w-44 shrink-0 overflow-hidden">
        <img src={e.img} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"/>
      </div>
      <div className="p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-display uppercase tracking-wider px-2 py-0.5 rounded border ${e.status==='Upcoming' ? 'text-green-400 border-green-400/30 bg-green-400/10' : 'text-slate-400 border-white/10'}`}>{e.status}</span>
            <span className="text-xs text-gold font-display uppercase">{e.type}</span>
          </div>
          <h3 className="font-display font-semibold text-white leading-snug mb-2">{e.title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{e.desc}</p>
        </div>
        <div className="flex flex-col gap-1 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Calendar size={10}/> {e.date}</span>
          <span className="flex items-center gap-1"><MapPin size={10}/> {e.location}</span>
        </div>
      </div>
    </motion.div>
  )
}
