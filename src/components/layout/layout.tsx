import React from 'react'

import { Footer, Navbar } from '@components'

import { Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="block">
        <Navbar />
      </div>
      <div className="mb-auto">
        <Outlet />
      </div>
      <Footer content={`© ${new Date().getFullYear()} - mySetup`} backgroundColor="white" />
    </div>
  )
}
