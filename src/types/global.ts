import React from 'react'

import { IUser } from '@types'

export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>
export type ResponseType<Type = null> = {
  success: boolean
  data?: Type
  error?: any
}
export type AuthContextType = {
  user: IUser | null
  signout: () => void
}

export type OnClickType = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
