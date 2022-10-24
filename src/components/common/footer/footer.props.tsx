import React from 'react'

export type FooterProps = {
  content: string
  backgroundColor?: 'dark' | 'light' | 'white'
  testid?: string
  navigation?: FooterItemProps[]
}

export type FooterItemProps = {
  label: string
  href?: string
  to?: string
  className?: string
  linkComponent?: React.ComponentType<any>
}
