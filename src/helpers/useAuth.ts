import { useContext } from 'react'

import { AuthenticationContext } from '@contexts'
import { AuthenticationContextType } from '@types'

export function useAuth(): AuthenticationContextType {
  return useContext(AuthenticationContext)
}
