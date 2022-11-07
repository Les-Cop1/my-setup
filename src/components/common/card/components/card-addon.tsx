import React from 'react'

import { CardAddonProps } from '@components'
import { classNames } from '@helpers'

export const CardAddon: React.FC<CardAddonProps> = ({
  background = 'white',
  content,
  children,
  className = '',
  isFullWidth = false,
  ...props
}) => {
  return (
    <div
      className={classNames(
        className,
        isFullWidth ? '' : 'px-4 py-5 sm:px-6',
        background === 'grey' ? 'bg-slate-50' : '',
      )}
      {...props}
    >
      {content || children}
    </div>
  )
}
