import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'

const FV = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const VP = { once:true, margin:'-80px' }
const SC = { hidden:{}, visible:{transition:{staggerChildren:0.08}} }

const products = [
  {
    name: 'AAC Plants', tag:'Aerated Concrete',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
    overview: 'Complete Autoclaved Aerated Concrete (AAC) block manufacturing plants from 30,000 to 300,000 m³/year. Fully automated with proprietary autoclave and slurry systems.',
    features: ['30K–300K m³/yr capacity','Fully automated control','Proprietary autoclave design','Fly ash & sand-based processing','Energy-efficient steam systems','Complete turnkey delivery'],
    applications: ['Residential construction','Commercial buildings','Industrial facilities','Infrastructure projects']
  },
  {
    name: 'Stone Crushing Plants', tag:'Aggregate Processing',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    overview: 'Heavy-duty rock and aggregate crushing systems for construction, mining and quarrying applications. Jaw, cone and VSI crushers with full screening systems.',
    features: ['50–1000 TPH capacity','Jaw, Cone and VSI crushers','Multi-stage screening','Dust suppression systems','Mobile and stationary options','PLC automation available'],
    applications: ['Road construction','Building aggregate','Railway ballast','Concrete production']
  },
  {
    name: 'Concrete Batching Plants', tag:'Ready Mix',
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80',
    overview: 'High-output ready-mix and site concrete batching plants with precise metering, automated material handling and advanced control systems.',
    features: ['30–240 m³/hr output','Twin-shaft mixer technology','Automated aggregate feeding','Cement & admixture batching','Remote monitoring','Compact footprint'],
    applications: ['Ready-mix concrete','Dam construction','Infrastructure projects','Precast production']
  },
  {
    name: 'Dry Mix Mortar Plants', tag:'Dry Mortar',
    img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=700&q=80',
    overview: 'Automated dry-mix production lines for tile adhesives, plastering, grouting and specialty construction mortars.',
    features: ['5–20 TPH production','Precision weighing systems','Automated silo filling','Multiple mortar formulations','Bagging & bulk options','Full SCADA control'],
    applications: ['Tile adhesives','Wall plaster','Joint fillers','Waterproofing compounds']
  },
  {
    name: 'Precast Concrete Plants', tag:'Precast Elements',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
    overview: 'Complete precast concrete manufacturing facilities for structural elements, facades, walls, slabs and infrastructure components.',
    features: ['Custom mold systems','High-pressure vibration','Steam curing chambers','Automated demoulding','Reinforcement handling','Quality testing lab'],
    applications: ['Building facades','Structural walls','Bridge elements','Tunnel segments']
  },
  {
    name: 'PEB Systems', tag:'Steel Structures',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
    overview: 'Pre-Engineered Building steel manufacturing plants with roll-forming, welding and fabrication lines for industrial and commercial structures.',
    features: ['Custom section profiles','CNC roll-forming','Automatic welding lines','Coating & painting systems','Engineering design support','Fast delivery'],
    applications: ['Industrial warehouses','Aircraft hangars','Sports facilities','Commercial buildings']
  },
  {
    name: 'Concrete Block Plants', tag:'Block Manufacturing',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    overview: 'High-speed hollow and solid concrete block manufacturing systems with automated curing and stacking.',
    features: ['2000–10000 blocks/hr','Vibro-press technology','Automated curing racks','Multiple block formats','Curb stone capability','Paver block production'],
    applications: ['Hollow blocks','Paving stones','Kerbstones','Solid bricks']
  },
  {
    name: 'Cranes', tag:'Material Handling',
    img: 'https://images.unsplash.com/photo-1517630800677-932d836ab680?w=700&q=80',
    overview: 'Industrial overhead, gantry and jib cranes for manufacturing plant operations, precision material handling and heavy lifts.',
    features: ['1T–100T capacity','EOT & HOT configurations','Radio remote control','Anti-collision systems','VFD drives','Explosion-proof options'],
    applications: ['Plant material handling','Steel fabrication','Precast operations','Heavy machinery lifting']
  },
  {
    name: 'Mixers', tag:'Mixing Equipment',
    img: 'https://images.unsplash.com/photo-1581092160607-ee67df1d9d52?w=700&q=80',
    overview: 'Heavy-duty planetary, twin-shaft and pan mixers for concrete, mortar, AAC slurry and specialty material production.',
    features: ['0.5–6 m³ capacity','Twin-shaft & planetary types','Polyurethane mixing tools','Wear-resistant liners','Quick discharge gate','Easy maintenance'],
    applications: ['Concrete mixing','AAC slurry','Dry mortar','Industrial materials']
  },
]

export default function Products() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160607-ee67df1d9d52?w=1600&q=80')" }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Products</p>
          <h1 className="section-title text-5xl text-white mb-4 max-w-2xl">Industrial Plant Solutions Portfolio</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">Complete range of industrial manufacturing plant equipment — designed, fabricated and commissioned to the highest global standards.</p>
        </div>
      </section>
      <div className="divider"/>

      {/* Products Grid */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={SC} initial="hidden" whileInView="visible" viewport={VP}>
            {products.map(p => (
              <motion.div key={p.name} variants={FV}
                className="bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 group">
                <div className="relative h-52 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"/>
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
                  <div className="grid grid-cols-2 gap-3 mb-5">
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
                  <Link to="/contact" className="btn-primary text-xs">Request Quote <ArrowRight size={14}/></Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
