import React from 'react'

export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

export type ComponentType = {
  testid?: string
  className?: string
}

export type ResponseType<Type = null> = {
  success: boolean
  data?: Type
  error?: any
}

export type OnClickType = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void

export type LanguageType = 'en' | 'fr'

export type RegisteredFile = {
  _id: string
  name: string
}

export const isRegisteredFile = (file: any): file is RegisteredFile => {
  return file && file._id && file.name && file._id !== '' && file.name !== ''
}
export const isFile = (file: any): file is File => {
  if (file) return file && file.name !== '' && file.size !== 0 && file.type !== ''
  else return false
}
