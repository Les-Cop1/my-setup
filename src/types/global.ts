import { IUser } from '@types'

export type AuthContextType = {
  user: IUser | null
  signout: () => void
}
