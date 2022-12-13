import React, { useState } from 'react'

import { Alert, Input } from '@components'
import { useAuth } from '@hooks'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const Login = () => {
  const { t } = useTranslation()
  document.title = `${t('Sign in')} - mySetup`

  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await login(username, password)

    if (response && !response.success) {
      setError(response.error)
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center flex-shrink-0 text-6xl mx-auto h-12 w-auto">
          <span className="sr-only">mySetup</span>
          🏠
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          {t('Sign in to your account')}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <Input
              label={t('Username')}
              name="username"
              type="text"
              id="username"
              autoComplete="username"
              value={username}
              onChange={(value) => setUsername(value as string)}
              required
            />
            <Input
              label={t('Password')}
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(value) => setPassword(value as string)}
              required
            />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {t('Sign in')}
              </button>
            </div>
            {error && (
              <div>
                <Alert message={t(error)} isOpen={true} setIsOpen={() => setError(null)} />
              </div>
            )}
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">
                  <Link to={'/register'} className="font-medium text-teal-600 hover:text-teal-500">
                    {t('or sign up')}
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
