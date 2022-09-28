import React from 'react'

import { Footer, Navbar } from '@components'
import { useAuth } from '@helpers'

import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()

  const navigation = [
    {
      label: t('navbar.home'),
      href: '/',
    },
  ]
  const navigationDisconnect = [
    {
      label: t('navbar.loginOrRegister'),
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
      label: user?.username || user?.user.username ? user?.username || user?.user.username : t('navbar.account'), //TODO: Temporary
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
