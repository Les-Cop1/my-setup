import React from 'react'

import { AuthResponseType } from '@api'

import { ResponseType } from './global'

export type AuthenticationStateType = {
  authenticated: boolean
  user: any
}

export type AuthenticationContextType = AuthenticationStateType & {
  login: (email: string, password: string) => Promise<ResponseType<AuthResponseType>> | void
  register: (email: string, password: string, confirmation: string) => void
  logout: () => void
}

export type AuthenticationProviderProps = {
  children: React.ReactNode
}
