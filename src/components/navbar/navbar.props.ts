import React from 'react'

import { IconType } from '@types'

export type NavbarProps = {
  backgroundColor?: 'dark' | 'light' | 'white'
  linkComponent?: React.ComponentType<any>
  navigation: NavbarItemProps[]
}

export type NavbarItemProps = {
  label: string
  href?: string
  to?: string
  icon?: IconType
  isMobile?: boolean
  className?: string
  linkComponent?: React.ComponentType<any>
}
