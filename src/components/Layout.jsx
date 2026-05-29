import { Outlet, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <div className="min-h-screen bg-navy-950 text-slate-200">
      <TopBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
