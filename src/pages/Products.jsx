import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:'easeOut'}} }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.08}} }
const VP = { once:true, margin:'-80px' }

const products = [
  {
    id:'aac', name:'AAC Plants', tag:'Autoclaved Aerated Concrete',
    img:'https://buildmate.in/images/1_prod_aac_plant.png',
    banner:'https://buildmate.in/images/banner_aacplants.jpg',
    overview:"Complete Autoclaved Aerated Concrete (AAC) block manufacturing plants from 30,000 to 300,000 m³/year. Fully automated with proprietary autoclave and slurry preparation systems. Buildmate is India's leading AAC plant manufacturer.",
    features:['30K–300K m³/yr capacity','Fully automated PLC/SCADA control','Proprietary autoclave design','Fly ash & sand-based processing','Energy-efficient steam curing','Complete turnkey delivery','High-strength cutting wire system','Auto-release agent spraying'],
    applications:['Residential construction','Commercial buildings','Industrial facilities','Green building projects','Affordable housing']
  },
  {
    id:'crushing', name:'Stone Crushing Plants', tag:'Aggregate Processing',
    img:'https://buildmate.in/images/2_prod_crushers_plant.png',
    banner:'https://buildmate.in/images/banner_stonecrushing.jpg',
    overview:'Heavy-duty rock and aggregate crushing systems for construction, mining and quarrying. Jaw, cone and VSI crushers with full screening and material handling systems.',
    features:['50–1000 TPH capacity','Jaw, Cone and VSI crushers','Multi-stage screening','Dust suppression systems','Mobile & stationary options','PLC automation available'],
    applications:['Road construction','Concrete aggregate','Railway ballast','Building construction']
  },
  {
    id:'batching', name:'Concrete Batching Plants', tag:'Ready Mix Concrete',
    img:'https://buildmate.in/images/3_prod_concrete-batching-plants.png',
    banner:'https://buildmate.in/images/banner_concretebatching.jpg',
    overview:'High-output ready-mix and site concrete batching plants with precise metering, automated material handling and advanced SCADA control systems.',
    features:['30–240 m³/hr output','Twin-shaft mixer technology','Automated aggregate feeding','Cement & admixture batching','Remote monitoring & control','Compact footprint designs'],
    applications:['Ready-mix concrete','Infrastructure projects','Dam construction','Precast production']
  },
  {
    id:'drymix', name:'Dry Mix Mortar Plants', tag:'Dry Mortar Production',
    img:'https://buildmate.in/images/4_prod_dry_mix_mortar_plants.png',
    banner:'https://buildmate.in/images/banner_drymortar.jpg',
    overview:'Automated dry-mix mortar production lines for tile adhesives, wall plastering, grouting and specialty construction mortars. Advanced weighing and bagging systems.',
    features:['5–20 TPH production','Precision weighing systems','Automated silo filling','Multiple mortar formulations','Bagging & bulk dispatch','Full SCADA control'],
    applications:['Tile adhesives','Wall plaster','Joint fillers','Waterproofing compounds']
  },
  {
    id:'precast', name:'Precast Concrete Plants', tag:'Precast Elements',
    img:'https://buildmate.in/images/5_prod_precast_concrete_plants.png',
    banner:'https://buildmate.in/images/banner_precast.jpg',
    overview:'Complete precast concrete manufacturing facilities for structural elements, facades, walls, slabs and infrastructure components. Precision molds and curing systems.',
    features:['Custom mold systems','High-pressure vibration tables','Steam curing chambers','Automated demoulding','Reinforcement handling','QA testing integration'],
    applications:['Building facades','Structural walls','Bridge elements','Tunnel segments','Precast slabs']
  },
  {
    id:'block', name:'Concrete Block / Brick Plants', tag:'Block Manufacturing',
    img:'https://buildmate.in/images/6_prod_concrete-block-plants.png',
    banner:'https://buildmate.in/images/banner_blockplants.jpg',
    overview:'High-speed concrete hollow block, solid block and paving brick manufacturing systems. Vibro-press technology with automated curing rack systems.',
    features:['2000–10000 blocks/hr','Vibro-press technology','Automated curing racks','Multiple block formats','Kerb stone capability','Paver & interlocking brick'],
    applications:['Hollow blocks','Paving stones','Kerbstones','Solid bricks','Fly ash bricks']
  },
  {
    id:'cranes', name:'Cranes', tag:'Material Handling Equipment',
    img:'https://buildmate.in/images/7_prod_cranes.png',
    banner:'https://buildmate.in/images/banner_cranes.jpg',
    overview:'Industrial overhead, gantry and jib cranes for AAC plant operations, precast handling, heavy fabrication and precision material movement in manufacturing environments.',
    features:['1T–100T capacity','EOT & HOT configurations','Radio remote control','Anti-collision systems','Variable frequency drives','Explosion-proof options'],
    applications:['AAC plant handling','Precast operations','Steel fabrication','Heavy machinery lifting','Warehouse logistics']
  },
  {
    id:'mixers', name:'Mixers', tag:'Industrial Mixing Equipment',
    img:'https://buildmate.in/images/8_prod_mixers.png',
    banner:'https://buildmate.in/images/banner_mixers.jpg',
    overview:'Heavy-duty planetary, twin-shaft and pan mixers for AAC slurry preparation, concrete, mortar and specialty material production. Wear-resistant liners and quick-discharge gates.',
    features:['0.5–6 m³ capacity','Twin-shaft & planetary types','Polyurethane mixing tools','Wear-resistant liners','Quick discharge gate','Easy maintenance design'],
    applications:['AAC slurry mixing','Concrete production','Dry mortar mixing','Industrial materials']
  },
  {
    id:'peb', name:'PEB (Pre Engineered Buildings)', tag:'Steel Structures',
    img:'https://buildmate.in/images/9_prod_pre_engineered_buildings.png',
    banner:'https://buildmate.in/images/banner_peb.jpg',
    overview:'Pre-Engineered Building steel structure manufacturing plants. Complete roll-forming, welding, CNC cutting and coating lines for industrial and commercial PEB structures.',
    features:['Custom section profiles','CNC roll-forming lines','Automatic welding systems','Coating & painting systems','Engineering design support','Fast delivery programs'],
    applications:['Industrial warehouses','Aircraft hangars','Sports facilities','Commercial buildings','Cold storage']
  },
  {
    id:'special', name:'Special Projects', tag:'Custom Engineering',
    img:'https://buildmate.in/images/10_prod_special_projects.png',
    banner:'https://buildmate.in/images/1_aac_plants.jpg',
    overview:'Bespoke plant solutions and custom industrial engineering projects. Calcium silicate board plants, fibre cement board lines, high-end automated fly ash brick plants and other special manufacturing solutions.',
    features:['Calcium silicate board plants','Fibre cement board lines','Automated fly ash brick plants','Custom process engineering','Special material handling','Unique project solutions'],
    applications:['Board manufacturing','Fly ash utilisation','Carbon capture systems','Novel building materials','Export markets']
  },
]

export default function Products() {
  return (
    <div>
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage:"url('https://buildmate.in/images/1_aac_plants.jpg')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/50"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Products</p>
          <h1 className="section-title text-5xl text-white mb-4 max-w-2xl">Industrial Plant Solutions Portfolio</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">
            Complete range of industrial manufacturing plant equipment — designed, fabricated and commissioned to the highest global standards since 1991.
          </p>
        </div>
      </section>
      <div className="divider"/>

      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {products.map(p => (
              <motion.div key={p.id} id={p.id} variants={FV}
                className="bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 group">
                <div className="relative h-52 overflow-hidden">
                  <img src={p.img} alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                    onError={e => { e.target.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=60'; e.target.style.opacity='0.4' }}/>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-800 to-transparent"/>
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-display uppercase tracking-wider text-gold bg-navy-900/80 px-3 py-1 rounded-full border border-white/10">{p.tag}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="section-title text-2xl text-white">{p.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.overview}</p>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <p className="text-xs font-display uppercase tracking-wider text-accent mb-2">Key Features</p>
                      <ul className="space-y-1">
                        {p.features.slice(0,4).map(f => (
                          <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                            <ChevronRight size={12} className="text-accent mt-0.5 shrink-0"/> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-display uppercase tracking-wider text-gold mb-2">Applications</p>
                      <ul className="space-y-1">
                        {p.applications.map(a => (
                          <li key={a} className="flex items-start gap-2 text-xs text-slate-300">
                            <ChevronRight size={12} className="text-gold mt-0.5 shrink-0"/> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link to="/contact" className="btn-primary text-xs">Request Quote <ArrowRight size={13}/></Link>
                    <a href="https://buildmate.in/enquiry.php" target="_blank" rel="noopener noreferrer" className="btn-outline text-xs">Product Enquiry</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
