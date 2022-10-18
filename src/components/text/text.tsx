import React from 'react'

import { TextProps, TextVariant } from '@components'
import { classNames } from '@helpers'

export const Text: React.FC<TextProps> = ({
  variant,
  as: TextComponent = 'p',
  isHeadline,
  isItalic,
  isBold,
  isUnderline,
  isIndent,
  children,
  text,
  className = '',
  textAlignment,
  isLoading,
  skeleton,
  ...props
}) => {
  let styleClasses = ''
  let variantClasses = ''
  let alignClasses: string
  let sizeClasses = ''

  if (isLoading) styleClasses = classNames('w-fit animate-pulse bg-slate-700 rounded-full text-transparent')

  if (isBold) styleClasses = classNames(styleClasses, 'font-bold')
  if (isItalic) styleClasses = classNames(styleClasses, 'italic')
  if (isUnderline) styleClasses = classNames(styleClasses, 'underline')
  if (isIndent) styleClasses = classNames(styleClasses, 'indent-8')

  switch (variant) {
    case TextVariant.PRIMARY:
    case TextVariant.SUCCESS:
      variantClasses = 'text-teal-500'
      break
    case TextVariant.SECONDARY:
    case TextVariant.WARNING:
      variantClasses = 'text-amber-400'
      break
    case TextVariant.INFO:
      variantClasses = 'text-cyan-500'
      break
    case TextVariant.DANGER:
      variantClasses = 'text-red-600'
      break
    case TextVariant.DARK_GREY:
      variantClasses = 'text-slate-800'
      break
    case TextVariant.GREY:
      variantClasses = 'text-slate-500'
      break
    case TextVariant.LIGHT_GREY:
      variantClasses = 'text-slate-50'
      break
    case TextVariant.WHITE:
      variantClasses = 'text-white'
      break
    case TextVariant.BLACK:
      variantClasses = 'text-black'
      break
  }

  switch (textAlignment) {
    case 'right':
      alignClasses = 'text-right'
      break
    case 'center':
      alignClasses = 'text-center'
      break
    case 'justify':
      alignClasses = 'text-justify'
      break
    case 'left':
    default:
      alignClasses = 'text-left'
      break
  }

  switch (TextComponent) {
    case 'h1':
      sizeClasses = classNames('text-6xl', isHeadline ? 'mb-10' : '')
      break
    case 'h2':
      sizeClasses = classNames('text-5xl', isHeadline ? 'mb-8' : '')
      break
    case 'h3':
      sizeClasses = classNames('text-4xl', isHeadline ? 'mb-6' : '')
      break
    case 'h4':
      sizeClasses = 'text-3xl'
      break
    default:
      sizeClasses = 'text-base'
      break
  }

  return (
    <TextComponent
      className={classNames(sizeClasses, alignClasses, className, styleClasses, variantClasses)}
      {...props}
    >
      {isLoading ? skeleton || text : children || text}
    </TextComponent>
  )
}
