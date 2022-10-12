import React, { useState } from 'react'

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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register(username, password, confirmation)
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
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                {t('Username')}
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                {t('Password')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmation" className="block text-sm font-medium text-slate-700">
                {t('Confirmation')}
              </label>
              <div className="mt-1">
                <input
                  id="confirmation"
                  name="confirmation"
                  type="password"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  required
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {t('Sign up')}
              </button>
            </div>
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
