import { useContext } from 'react'
import { AuthContext } from '@contexts'
import { AuthContextType } from '@types'

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext)
}
