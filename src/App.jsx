import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Services from './pages/Services'
import Facilities from './pages/Facilities'
import Innovations from './pages/Innovations'
import Projects from './pages/Projects'
import Customers from './pages/Customers'
import Blog from './pages/Blog'
import NewsEvents from './pages/NewsEvents'
import Partner from './pages/Partner'
import WorkWithUs from './pages/WorkWithUs'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="innovations" element={<Innovations />} />
          <Route path="projects" element={<Projects />} />
          <Route path="customers" element={<Customers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="news" element={<NewsEvents />} />
          <Route path="partner" element={<Partner />} />
          <Route path="work-with-us" element={<WorkWithUs />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
