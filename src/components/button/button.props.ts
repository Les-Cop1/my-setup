import React from 'react'

import { ComponentType, IconType, OnClickType } from '@types'

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  DANGER = 'danger',
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface ButtonProps extends ComponentType {
  type?: 'button' | 'submit' | 'reset'
  label?: string
  icon?: IconType
  variant?: ButtonVariant
  size?: ButtonSize
  isDisabled?: boolean
  isLoading?: boolean
  onClick?: OnClickType
  ariaLabel?: string
  children?: React.ReactNode
}
