import React from 'react'

export type CardProps = {
  header?: React.ReactNode
  footer?: React.ReactNode
  background?: 'white' | 'grey'
  content?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export type CardAddonProps = {
  background?: 'white' | 'grey'
  content?: React.ReactNode
  children?: React.ReactNode
  className?: string
  isFullWidth?: boolean
}
