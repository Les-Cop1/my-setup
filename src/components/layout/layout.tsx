import React from 'react'

import { Footer, Navbar } from '@components'

import { Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col bg-zinc-50 min-h-screen">
      <div className="block">
        <Navbar />
      </div>
      <Outlet />
      <div className="mt-auto">
        <Footer content={`© ${new Date().getFullYear()} - My Setup`} />
      </div>
    </div>
  )
}
