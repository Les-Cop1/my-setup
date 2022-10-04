import React from 'react'

import { NavbarItemProps } from '@components'
import { classNames } from '@helpers'

import { Link } from 'react-router-dom'

export const NavbarItem: React.FC<NavbarItemProps> = ({ label, className = '', isMobile = false, ...path }) => {
  return (
    <Link
      key={label}
      className={classNames(
        className,
        isMobile ? 'block text-base' : 'text-sm',
        'rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white',
      )}
      {...path}
    >
      {label}
    </Link>
  )
}
