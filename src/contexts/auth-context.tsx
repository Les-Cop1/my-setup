import React, { useCallback, useEffect, useState } from 'react'

import { isLoggedIn, login as loginApi, createUser as registerApi } from '@api'
import { useQuery } from '@hooks'
import { AuthenticationContextType, AuthenticationProviderProps, AuthenticationStateType } from '@types'

import { useLocation, useNavigate } from 'react-router-dom'

const initState: AuthenticationStateType = {
  authenticated: false,
  user: null,
}

export const AuthenticationContext = React.createContext<AuthenticationContextType>({
  ...initState,
  login: () => {},
  register: () => {},
  logout: () => {},
})

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const query = useQuery()
  const [authState, setAuthState] = useState<AuthenticationStateType>(initState)

  const redirect = useCallback(() => {
    navigate(query.get('redirect_uri') || '/')
  }, [navigate, query])

  const login = (username: string, password: string) => {
    loginApi(username, password).then((response) => {
      if (response.success) {
        setAuthState({ authenticated: true, user: response.data })
        redirect()
      } else {
        console.error(response.error)
      }
    })
  }

  const register = (username: string, password: string, confirmPassword: string) => {
    registerApi(username, password, confirmPassword).then((response) => {
      if (response.success) {
        setAuthState({ authenticated: true, user: response.data })
        redirect()
      } else {
        console.error(response.error)
      }
    })
  }

  const logout = () => {}

  useEffect(() => {
    isLoggedIn().then((response) => {
      if (response.success && response.data?.user) {
        setAuthState({ user: response.data.user, authenticated: response.success })
        if (location.pathname === '/login') {
          redirect()
        }
      } else if (location.pathname !== '/login') {
        navigate(`/login?redirect_uri=${encodeURI(location.pathname)}`)
      }
    })
  }, [location.pathname, navigate, redirect])

  return (
    <AuthenticationContext.Provider value={{ ...authState, login, logout, register }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
