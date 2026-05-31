import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'

const FV = { hidden:{opacity:0,y:25}, visible:{opacity:1,y:0,transition:{duration:0.55}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.08}} }
const VP = { once:true, margin:'-80px' }

const events = [
  {
    type:'Exhibition', status:'Upcoming',
    title:'EXCON 13th Edition 2025',
    date:'09–13 December 2025', location:'Bengaluru, Karnataka, India',
    img:'/images/Excon_13th_edition.jpg',
    desc:"Buildmate will participate at EXCON 2025 — India's largest construction equipment exhibition. Visit us to see our latest AAC Plant technology, concrete batching systems and automation solutions."
  },
  {
    type:'Conference', status:'Past',
    title:'Fly Ash Utilisation Conference 2024',
    date:'22–24 February 2024', location:'Goa, India',
    img:'/images/fly_ash_utilisation_conference_2024.jpg',
    desc:'Buildmate presented innovations in fly ash utilisation for AAC and FCB manufacturing. Key insights on sustainable building material production from fly ash waste.'
  },
  {
    type:'Trade Show', status:'Past',
    title:'World of Concrete 2024',
    date:'23–25 January 2024', location:'Las Vegas, Nevada, USA',
    img:'/images/World_of_concrete_2024.jpg',
    desc:'International participation at World of Concrete 2024 — engaging with global concrete industry leaders on advanced batching plant technology and precast solutions.'
  },
  {
    type:'Exhibition', status:'Past',
    title:'EXCON 2023 — 12th Edition',
    date:'12–16 December 2023', location:'Bengaluru, Karnataka, India',
    img:'/images/Excon_13th_edition.jpg',
    desc:'Buildmate showcased the full product lineup including AAC Plants, Concrete Batching Plants, Block Plants and material handling equipment to thousands of industry visitors.'
  },
  {
    type:'Exhibition', status:'Past',
    title:'Bombay Exhibition Center',
    date:'18–20 October 2023', location:'Mumbai, Maharashtra, India',
    img:'/images/fly_ash_utilisation_conference_2024.jpg',
    desc:"Participation at the Bombay Exhibition Center construction event showcasing Buildmate's latest innovations in industrial plant manufacturing and automation technology."
  },
  {
    type:'Trade Show', status:'Past',
    title:'Gujarat Conex 2023',
    date:'21–23 September 2023', location:'Gujarat, India',
    img:'/images/World_of_concrete_2024.jpg',
    desc:'Buildmate at Gujarat Conex — demonstrating concrete production solutions, batching plants and mixer technology for the rapidly growing Gujarat construction market.'
  },
  {
    type:'Exhibition', status:'Past',
    title:'Bauma Conexpo India 2023',
    date:'31 Jan – 3 Feb 2023', location:'Greater Noida, Delhi NCR, India',
    img:'/images/Excon_13th_edition.jpg',
    desc:"Major presence at Bauma Conexpo India showcasing Buildmate's complete range of AAC plants, crushing, batching and precast solutions to pan-India audience."
  },
  {
    type:'Exhibition', status:'Past',
    title:'EXCON 2022 — 11th Edition',
    date:'17–21 May 2022', location:'Bengaluru, Karnataka, India',
    img:'/images/fly_ash_utilisation_conference_2024.jpg',
    desc:"Buildmate's participation at EXCON 2022 highlighted energy-efficient AAC plant technology and sustainable building material manufacturing equipment."
  },
  {
    type:'Exhibition', status:'Past',
    title:'EXCON 2019 — 10th Edition',
    date:'11–14 December 2019', location:'Bengaluru, Karnataka, India',
    img:'/images/Excon_13th_edition.jpg',
    desc:'Buildmate celebrated its 10th EXCON participation showcasing three decades of AAC plant manufacturing heritage and engineering innovation.'
  },
]

export default function NewsEvents() {
  const upcoming = events.filter(e => e.status === 'Upcoming')
  const past = events.filter(e => e.status === 'Past')
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage:"url('/images/Excon_13th_edition.jpg')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">News & Events</p>
          <h1 className="section-title text-5xl text-white mb-4">Exhibitions, Launches & Industry Events</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Buildmate at industry events across India and the globe — showcasing innovation and engineering excellence since 1991.</p>
        </div>
      </section>
      <div className="divider"/>
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {upcoming.length > 0 && (
            <div className="mb-14">
              <motion.h2 variants={FV} initial="hidden" whileInView="visible" viewport={VP}
                className="section-title text-3xl text-accent mb-8">Upcoming Events</motion.h2>
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
                {upcoming.map(e => <EventCard key={e.title} event={e}/>)}
              </motion.div>
            </div>
          )}
          <motion.h2 variants={FV} initial="hidden" whileInView="visible" viewport={VP}
            className="section-title text-3xl text-white mb-8">Past Events</motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {past.map(e => <EventCard key={e.title} event={e}/>)}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function EventCard({ event:e }) {
  return (
    <motion.div variants={{ hidden:{opacity:0,y:20}, visible:{opacity:1,y:0} }}
      className="group bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/25 transition-all duration-300 flex">
      <div className="w-36 sm:w-48 shrink-0 overflow-hidden">
        <img src={e.img} alt={e.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-65"
          onError={e2 => { e2.target.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=60'; e2.target.style.opacity='0.3' }}/>
      </div>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {e.status === 'Upcoming' && (
              <span className="text-xs bg-green-500/15 border border-green-500/30 text-green-400 px-2 py-0.5 rounded font-display uppercase font-bold">Upcoming</span>
            )}
            <span className="text-xs text-gold font-display uppercase tracking-wider">{e.type}</span>
          </div>
          <h3 className="font-display font-semibold text-white leading-snug mb-2">{e.title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">{e.desc}</p>
        </div>
        <div className="flex flex-col gap-1 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><Calendar size={10} className="text-accent"/> {e.date}</span>
          <span className="flex items-center gap-1.5"><MapPin size={10} className="text-accent"/> {e.location}</span>
        </div>
      </div>
    </motion.div>
  )
}
