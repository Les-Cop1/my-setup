import React from 'react'

import { Footer, Navbar } from '@components'

import { Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
  return (
    <div className="relative bg-zinc-50 min-h-screen">
      <Navbar />
      <Outlet />
      <Footer content={`© ${new Date().getFullYear()} - My Setup`} />
    </div>
  )
}
