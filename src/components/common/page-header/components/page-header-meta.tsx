import React from 'react'

import { PageHeaderMetaProps } from '@components'
import { classNames } from '@helpers'

export const PageHeaderMeta: React.FC<PageHeaderMetaProps> = ({
  icon: Icon,
  label,
  backgroundColor = 'white',
  ...props
}) => {
  let iconClassName: string
  let labelClassName: string
  switch (backgroundColor) {
    case 'dark':
      iconClassName = 'text-zinc-200'
      labelClassName = 'text-zinc-200'
      break
    case 'white':
    case 'light':
    default:
      iconClassName = 'text-slate-400'
      labelClassName = 'text-slate-500'
  }

  return (
    <div className={classNames('mt-2 flex items-center text-sm', labelClassName)} {...props}>
      {Icon && <Icon className={classNames('mr-1.5 h-5 w-5 flex-shrink-0', iconClassName)} aria-hidden="true" />}
      {label}
    </div>
  )
}
