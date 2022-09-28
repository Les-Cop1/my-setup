import React from 'react'

import { NavbarItemProps } from '@components'
import { classNames } from '@helpers'

export const NavbarItem: React.FC<NavbarItemProps> = ({
  linkComponent: Link = 'a',
  label,
  icon: Icon,
  className = '',
  isMobile = false,
  ...path
}) => {
  return (
    <Link
      key={label}
      className={classNames(className, isMobile ? 'block px-3 py-2 rounded-md text-base font-medium' : 'font-medium')}
      {...path}
    >
      <div className="inline-flex gap-1.5">
        {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
        {label}
      </div>
    </Link>
  )
}
