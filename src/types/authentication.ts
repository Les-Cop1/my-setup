import React from 'react'

export type AuthenticationStateType = {
  authenticated: boolean
  user: any
}

export type AuthenticationContextType = AuthenticationStateType & {
  login: (email: string, password: string) => void
  register: (email: string, password: string, confirmation: string) => void
  logout: () => void
}

export type AuthenticationProviderProps = {
  children: React.ReactNode
}
