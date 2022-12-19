import React from 'react'

import { NavbarItemProps } from '@components'
import { classNames } from '@helpers'

import { Link } from 'react-router-dom'

export const NavbarItem: React.FC<NavbarItemProps> = ({
  label,
  className = '',
  isMobile = false,
  onClick,
  ...path
}) => {
  return (
    <Link
      key={label}
      className={classNames(
        className,
        isMobile ? 'block text-base' : 'text-sm',
        'rounded-md px-3 py-2 font-medium text-white hover:bg-slate-700',
      )}
      onClick={onClick}
      {...path}
    >
      {label}
    </Link>
  )
}
