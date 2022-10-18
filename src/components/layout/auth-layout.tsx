import React, { Fragment, useEffect, useState } from 'react'

import { getRooms as getRoomsAPI } from '@api'
import { Footer, SidebarItem } from '@components'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { classNames } from '@helpers'
import { Bars3BottomLeftIcon, HomeIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Squares2X2Icon } from '@heroicons/react/24/solid'
import { AddRoom } from '@pages'
import { IRoom } from '@types'

import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom'

export const AuthLayout: React.FC = () => {
  const { t } = useTranslation()

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const [isSlideOverOpen, setIsSlideOverOpen] = useState<boolean>(false)
  const [rooms, setRooms] = useState<IRoom[]>([])

  const getRooms = () => {
    getRoomsAPI().then((result) => {
      const { success, error, data } = result
      if (success && data) {
        setRooms(data.rooms)
      } else {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getRooms()
  }, [])

  const userNavigation = [
    { name: t('My account'), href: '/user' },
    { name: t('Logout'), href: '/logout' },
  ]

  return (
    <div className="flex flex-col bg-zinc-50 min-h-screen">
      <div>
        <Transition.Root show={isSidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setIsSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-slate-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-slate-800 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <Link to="/" className="text-3xl">
                      <span className="sr-only">My Setup</span>
                      🏠
                    </Link>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      <SidebarItem label={t('Overview')} to="/setup" icon={Squares2X2Icon} isMobile />
                      <SidebarItem label={t('Rooms')} to="#" icon={HomeIcon} isMobile />
                      <div className="pl-5">
                        {rooms.map((item) => (
                          <SidebarItem label={item.name} to={`room/${item._id}`} key={item._id} isMobile />
                        ))}
                        <SidebarItem label={t('Add room')} to="#" icon={PlusCircleIcon} isMobile />
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-slate-700">
            <div className="flex h-16 flex-shrink-0 items-center bg-slate-800 px-4">
              <Link to="/" className="text-3xl">
                <span className="sr-only">My Setup</span>
                🏠
              </Link>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4">
                <SidebarItem label={t('Overview')} to="/setup" icon={Squares2X2Icon} />
                <SidebarItem label={t('Rooms')} to="#" icon={HomeIcon} />
                <div className="pl-5">
                  {rooms.map((item) => (
                    <SidebarItem label={item.name} to={`room/${item._id}`} key={item._id} />
                  ))}
                  <SidebarItem
                    label={t('Add room')}
                    to="#"
                    icon={PlusCircleIcon}
                    onClick={() => {
                      setIsSlideOverOpen(true)
                    }}
                  />
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-h-screen md:pl-64 bg-white">
          <div className="block">
            <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 shadow">
              <button
                type="button"
                className="border-r border-slate-200 px-4 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex flex-1 justify-between px-4">
                <div />
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
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
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-slate-100' : '',
                                  'block px-4 py-2 text-sm text-slate-700',
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-50 ">
            <div className="mx-auto max-w-7xl">
              <AddRoom
                getRooms={getRooms}
                isOpen={isSlideOverOpen}
                onClose={() => {
                  setIsSlideOverOpen(false)
                }}
              />
              <Outlet context={[getRooms]} />
            </div>
          </div>

          <div className="mt-auto">
            <Footer content={`© ${new Date().getFullYear()} - My Setup`} backgroundColor="white" />
          </div>
        </div>
      </div>
    </div>
  )
}
