import React from 'react'

import { Footer, Navbar } from '@components'
import { useAuth } from '@helpers'

import { Link, Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
  const { user } = useAuth()

  const navigation = [
    {
      label: 'Home',
      href: '/',
    },
  ]
  const navigationDisconnect = [
    {
      label: 'Login or Register',
      href: '/register',
      className: 'text-emerald-600 hover:text-emerald-500',
    },
  ]
  const navigationConnected = [
    {
      label: 'My Setup',
      href: '/setup',
    },
    {
      label: user?.username || user?.user.username ? user?.username || user?.user.username : 'My Account', //TODO: Temporary
      href: '/user',
      className: 'text-emerald-600 hover:text-emerald-500',
    },
  ]

  return (
    <div className="relative bg-zinc-50 min-h-screen">
      <Navbar
        navigation={user ? [...navigation, ...navigationConnected] : [...navigation, ...navigationDisconnect]}
        linkComponent={Link}
        backgroundColor="dark"
      />
      <Outlet />
      <Footer content={`© ${new Date().getFullYear()} - My Setup`} />
    </div>
  )
}
