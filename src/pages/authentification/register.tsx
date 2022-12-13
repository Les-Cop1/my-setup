import React, { useState } from 'react'

import { Alert, Button, ButtonVariant, Input } from '@components'
import { useAuth } from '@hooks'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const Register = () => {
  const { t } = useTranslation()
  document.title = `${t('Sign up')} - mySetup`

  const { register } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState<string | null>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await register(username, password, confirmation)

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
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">{t('Create an account')}</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <Input
              label={t('Username')}
              name="username"
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(value) => setUsername(value as string)}
              required
            />
            <Input
              label={t('Password')}
              name="password"
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(value) => setPassword(value as string)}
              required
            />
            <Input
              label={t('Confirmation')}
              name="confirmation"
              id="confirmation"
              type="password"
              autoComplete="new-password"
              value={confirmation}
              onChange={(value) => setConfirmation(value as string)}
              required
            />
            <Button type="submit" className="w-full" variant={ButtonVariant.PRIMARY}>
              {t('Sign up')}
            </Button>
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
                  <Link to={'/login'} className="font-medium text-teal-600 hover:text-teal-500">
                    {t('or sign in')}
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
