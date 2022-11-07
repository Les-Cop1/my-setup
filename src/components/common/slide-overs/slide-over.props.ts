import React from 'react'

export type SlideOverProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}
