import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TopBar  from './TopBar'
import Navbar  from './Navbar'
import Footer  from './Footer'

export default function Layout() {
  const { pathname, hash } = useLocation()

  // Scroll to top on route change (unless hash link)
  useEffect(() => {
    if (!hash) window.scrollTo({ top:0, behavior:'instant' })
  }, [pathname, hash])

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200">
      {/* Skip to content link for accessibility */}
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] btn-primary text-xs">
        Skip to main content
      </a>
      <TopBar/>
      <Navbar/>
      <main id="main-content" tabIndex={-1}>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
