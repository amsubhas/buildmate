import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import CustomCursor   from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

// Lazy-loaded routes for code splitting
const Home       = lazy(() => import('./pages/Home'))
const About      = lazy(() => import('./pages/About'))
const Products   = lazy(() => import('./pages/Products'))
const Services   = lazy(() => import('./pages/Services'))
const Facilities = lazy(() => import('./pages/Facilities'))
const Innovations= lazy(() => import('./pages/Innovations'))
const Projects   = lazy(() => import('./pages/Projects'))
const Customers  = lazy(() => import('./pages/Customers'))
const Blog       = lazy(() => import('./pages/Blog'))
const NewsEvents = lazy(() => import('./pages/NewsEvents'))
const Partner    = lazy(() => import('./pages/Partner'))
const WorkWithUs = lazy(() => import('./pages/WorkWithUs'))
const Contact    = lazy(() => import('./pages/Contact'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin"/>
        <div className="text-slate-400 text-sm font-display uppercase tracking-widest">Loading</div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <CustomCursor/>
        <ScrollProgress/>
        <Suspense fallback={<PageLoader/>}>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index          element={<Home/>}/>
              <Route path="about"   element={<About/>}/>
              <Route path="products"element={<Products/>}/>
              <Route path="services"element={<Services/>}/>
              <Route path="facilities" element={<Facilities/>}/>
              <Route path="innovations"element={<Innovations/>}/>
              <Route path="projects"element={<Projects/>}/>
              <Route path="customers"element={<Customers/>}/>
              <Route path="blog"    element={<Blog/>}/>
              <Route path="news"    element={<NewsEvents/>}/>
              <Route path="partner" element={<Partner/>}/>
              <Route path="work-with-us" element={<WorkWithUs/>}/>
              <Route path="contact" element={<Contact/>}/>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
