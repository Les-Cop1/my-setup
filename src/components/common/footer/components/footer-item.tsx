import React from 'react'

import { FooterItemProps } from '@components'
import { classNames } from '@helpers'

export const FooterItem: React.FC<FooterItemProps> = ({
  linkComponent: Link = 'a',
  label,
  className = '',
  ...path
}) => {
  return (
    <Link key={label} className={classNames('px-5 py-2 font-medium', className)} {...path}>
      <div className="inline-flex gap-1.5">{label}</div>
    </Link>
  )
}
