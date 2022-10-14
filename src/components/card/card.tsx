import React from 'react'

import { CardProps } from '@components'
import { classNames } from '@helpers'

export const Card: React.FC<CardProps> = ({
  header,
  footer,
  content,
  children,
  background = 'white',
  className = '',
  ...props
}) => {
  return (
    <div
      className={classNames(
        className,
        'overflow-hidden rounded-lg bg-white shadow',
        header || footer ? 'divide-y divide-slate-200' : '',
      )}
      {...props}
    >
      {header}
      <div className={classNames('px-4 py-5 sm:p-6', background === 'grey' ? 'bg-slate-50' : '')}>
        {content || children}
      </div>
      {footer}
    </div>
  )
}
