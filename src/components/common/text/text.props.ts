import React from 'react'

import { ComponentType } from '@types'

export enum TextVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  DANGER = 'danger',
  DARK_GREY = 'dark-grey',
  GREY = 'grey',
  LIGHT_GREY = 'light-grey',
  BLACK = 'black',
  WHITE = 'white',
}

export interface TextProps extends ComponentType {
  isLoading?: boolean
  skeleton?: string
  isHeadline?: boolean
  isItalic?: boolean
  isBold?: boolean
  isUnderline?: boolean
  isIndent?: boolean
  variant?: TextVariant
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4'
  children?: React.ReactNode
  text?: string
  textAlignment?: 'left' | 'center' | 'right' | 'justify'
}
