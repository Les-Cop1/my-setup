import React from 'react'

import { IUser } from '@types'

export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

export type AuthContextType = {
  user: IUser | null
  signout: () => void
}
