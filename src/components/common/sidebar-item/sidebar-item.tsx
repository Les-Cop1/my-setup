import React from 'react'

import { SidebarItemProps } from '@components'
import { classNames } from '@helpers'

import { Link } from 'react-router-dom'

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  className = '',
  isMobile = false,
  icon: Icon,
  onClick,
  ...path
}) => {
  return (
    <Link
      onClick={onClick}
      key={label}
      className={classNames(
        className,
        isMobile ? 'text-base' : 'text-sm',
        'text-slate-300 hover:bg-slate-700 hover:text-white group flex items-center px-2 py-2 font-medium rounded-md',
      )}
      {...path}
    >
      {Icon && (
        <Icon className="text-slate-400 group-hover:text-slate-300 mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
      )}
      {label}
    </Link>
  )
}
