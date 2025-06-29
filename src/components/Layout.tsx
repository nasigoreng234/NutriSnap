import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <main className="pb-20 pt-16">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout