import React, { Fragment } from 'react'

import { NavbarItem, NavbarProps } from '@components'
import { Popover, Transition } from '@headlessui/react'
import { classNames } from '@helpers'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export const Navbar: React.FC<NavbarProps> = ({
  backgroundColor = 'light',
  linkComponent: Link = 'a',
  navigation,
  ...props
}) => {
  let bgClass,
    textClass = ''
  switch (backgroundColor) {
    case 'dark':
      bgClass = 'bg-zinc-900'
      textClass = 'text-gray-300 hover:text-white'
      break
    case 'white':
      bgClass = 'bg-white'
      textClass = 'text-gray-500 hover:text-gray-900'
      break
    case 'light':
    default:
      textClass = 'text-gray-500 hover:text-gray-900'
      bgClass = 'bg-zinc-50'
  }

  return (
    <div className="max-w-7xl mx-auto" {...props}>
      <div className={classNames('relative z-10 pb-8 w-full', bgClass)}>
        <Popover>
          <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/" to="/">
                    <span className="sr-only">My Setup</span>
                    🏠
                  </Link>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-zinc-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:ml-10 md:pr-4 md:space-x-8">
                {navigation.map((item) => {
                  const itemClassNames = item.className ? classNames(textClass, item.className) : textClass
                  return <NavbarItem key={item.label} className={itemClassNames} {...item} />
                })}
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div
                className={classNames('rounded-lg shadow-md ring-1 ring-black ring-opacity-5 overflow-hidden', bgClass)}
              >
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://firgal.lucasstbnr.ovh/static/media/icon.large.b21e6916ec880cfbf3f9006fcb69c03e.svg"
                      alt="Firgal logo"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-zinc-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                      <span className="sr-only">Close main menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => {
                    const itemClassNames = item.className ? classNames(textClass, item.className) : textClass
                    return <NavbarItem key={item.label} className={itemClassNames} {...item} isMobile />
                  })}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  )
}
