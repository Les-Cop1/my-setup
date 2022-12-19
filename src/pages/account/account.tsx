import React, { useEffect, useState } from 'react'

import { updateUser } from '@api'
import { Alert, Button, ButtonVariant, Input } from '@components'
import { useDocumentTitle } from '@helpers'
import { useAuth } from '@hooks'

import { useTranslation } from 'react-i18next'

export const Account = () => {
  const { t } = useTranslation()
  useDocumentTitle(t('My account'))

  const { user } = useAuth()

  const [username, setUsername] = useState(user?.username || '')
  const [actualPassword, setActualPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState<string | null>()

  useEffect(() => {
    if (user) setUsername(user.username)
  }, [user])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUser(user, username, actualPassword, password, confirmation)
      .then((response) => {
        if (response.success) {
          setActualPassword('')
          setPassword('')
          setConfirmation('')
        } else {
          setError(response.error)
        }
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <Input
              id="username"
              name="username"
              type="text"
              label={t('Username')}
              onChange={(value) => setUsername(value as string)}
              value={username}
              isRequired
            />
            <Input
              id="actualPassword"
              name="actualPassword"
              type="password"
              label={t('Actual password')}
              onChange={(value) => setActualPassword(value as string)}
              value={actualPassword}
            />
            <Input
              id="password"
              name="password"
              type="password"
              label={t('Password')}
              onChange={(value) => setPassword(value as string)}
              value={password}
            />
            <Input
              id="confirmation"
              name="confirmation"
              type="password"
              label={t('Confirmation')}
              onChange={(value) => setConfirmation(value as string)}
              value={confirmation}
            />
            <div className="text-right">
              <Button type="submit" className="text-right" variant={ButtonVariant.PRIMARY}>
                {t('Submit')}
              </Button>
            </div>
            {error && (
              <div>
                <Alert message={t(error)} isOpen={true} setIsOpen={() => setError(null)} />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
