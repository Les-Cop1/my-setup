import React from 'react'

import { classNames } from '@helpers'
import { CheckCircleIcon, ExclamationCircleIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { IconType } from '@types'

import { AlertProps } from './alert.props'

export const Alert: React.FC<AlertProps> = ({ message, type = 'error', isDismissible = true, ...props }) => {
  let Icon: IconType
  let bgColor: string
  let textColor: string
  let hoverBgColor: string
  let focusRingColor: string

  switch (type) {
    case 'success':
      Icon = CheckCircleIcon
      bgColor = 'bg-teal-50'
      textColor = 'text-teal-800'
      hoverBgColor = 'hover:bg-teal-100'
      focusRingColor = 'focus:ring-teal-600  focus:ring-offset-teal-50'
      break
    case 'error':
      Icon = ExclamationCircleIcon
      bgColor = 'bg-red-50'
      textColor = 'text-red-800'
      hoverBgColor = 'hover:bg-red-100'
      focusRingColor = 'focus:ring-red-600  focus:ring-offset-red-50'
      break
    case 'info':
      Icon = QuestionMarkCircleIcon
      bgColor = 'bg-cyan-50'
      textColor = 'text-cyan-800'
      hoverBgColor = 'hover:bg-cyan-100'
      focusRingColor = 'focus:ring-cyan-600  focus:ring-offset-cyan-50'
      break
  }

  return (
    <div className={classNames('rounded-md p-4', bgColor)} {...props}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={classNames('h-5 w-5', textColor)} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className={classNames('text-sm font-medium', textColor)}>{message}</p>
        </div>
        {isDismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={classNames(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  bgColor,
                  textColor,
                  hoverBgColor,
                  focusRingColor,
                )}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
