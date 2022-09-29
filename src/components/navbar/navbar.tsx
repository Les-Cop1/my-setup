import React, { Fragment } from 'react'

import { NavbarItem, NavbarProps } from '@components'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { classNames, useAuth } from '@helpers'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const Navbar: React.FC<NavbarProps> = () => {
  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <Link to="/">
                    <span className="sr-only">My Setup</span>
                    🏠
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    <NavbarItem to="/" label={t('navbar.home')} />
                    {user ? (
                      <NavbarItem to="/setup" label="My Setup" />
                    ) : (
                      <NavbarItem to="/login" label={t('navbar.loginOrRegister')} />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {user && (
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <UserIcon className="block h-6 w-6" aria-hidden="true" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/user"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                {t('navbar.account')}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/logout"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                {t('navbar.logout')}
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <NavbarItem to="/" label={t('navbar.home')} isMobile />
              {user ? (
                <NavbarItem to="/setup" label="My Setup" isMobile />
              ) : (
                <NavbarItem to="/login" label={t('navbar.loginOrRegister')} isMobile />
              )}
            </div>
            {user && (
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="mt-3 space-y-1 px-2">
                  <NavbarItem to="/user" label={t('navbar.account')} isMobile />
                  <NavbarItem to="/logout" label={t('navbar.logout')} isMobile />
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
