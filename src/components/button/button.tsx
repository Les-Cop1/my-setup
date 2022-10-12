import React from 'react'

import { ButtonProps, ButtonSize, ButtonVariant } from '@components'
import { classNames } from '@helpers'

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  label,
  icon: Icon,
  variant,
  size = ButtonSize.MEDIUM,
  isDisabled = false,
  isLoading = false,
  onClick,
  className = '',
  children,
  ...props
}) => {
  const defaultClasses = `group relative flex whitespace-nowrap justify-center items-center px-4 py-2 border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm disabled:bg-zinc-300 disabled:text-zinc-500 disabled:cursor-not-allowed`

  let variantClasses: string

  switch (variant) {
    case ButtonVariant.PRIMARY:
    case ButtonVariant.SUCCESS:
      variantClasses = 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 border-transparent'
      break
    case ButtonVariant.SECONDARY:
      variantClasses = 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 focus:ring-emerald-50 border-transparent'
      break
    case ButtonVariant.INFO:
      variantClasses = 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-400 border-transparent'
      break
    case ButtonVariant.WARNING:
      variantClasses = 'bg-amber-400 text-white hover:bg-amber-500 focus:ring-bg-amber-300 border-transparent'
      break
    case ButtonVariant.DANGER:
      variantClasses = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent'
      break
    default:
      variantClasses = 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 focus:ring-zinc-50'
  }

  switch (size) {
    case ButtonSize.SMALL:
      variantClasses = classNames(variantClasses, 'text-sm')
      break
    case ButtonSize.LARGE:
      variantClasses = classNames(variantClasses, 'text-lg')
      break
    case ButtonSize.MEDIUM:
    default:
      variantClasses = classNames(variantClasses, 'text-base')
      break
  }

  return (
    <button
      type={type}
      className={classNames(className, defaultClasses, variantClasses)}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {Icon && (
        <span className={classNames('flex items-center', children || label ? 'mr-1' : '')}>
          <Icon className="h-5 w-5" />
        </span>
      )}
      {children || label}
    </button>
  )
}
