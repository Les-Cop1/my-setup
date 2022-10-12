import React, { useEffect, useState } from 'react'

import { updateUser } from '@api'
import { Button, ButtonVariant, Input } from '@components'
import { useAuth } from '@hooks'

import { useTranslation } from 'react-i18next'

export const Account = () => {
  const { t } = useTranslation()
  document.title = `${t('My account')} - MySETUP`

  const { user } = useAuth()

  const [username, setUsername] = useState(user?.username || '')
  const [actualPassword, setActualPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')

  useEffect(() => {
    if (user) setUsername(user.username)
  }, [user])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUser(user, username, actualPassword, password, confirmation).then((res) => {
      //TODO: handle response
      console.log(res)
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
              onChange={(value: string) => setUsername(value)}
              value={username}
              isRequired
            />
            <Input
              id="actualPassword"
              name="actualPassword"
              type="password"
              label={t('Actual password')}
              onChange={(value: string) => setActualPassword(value)}
              value={actualPassword}
              isRequired
            />
            <Input
              id="password"
              name="password"
              type="password"
              label={t('Password')}
              onChange={(value: string) => setPassword(value)}
              value={password}
              isRequired
            />
            <Input
              id="confirmation"
              name="confirmation"
              type="password"
              label={t('Confirmation')}
              onChange={(value: string) => setConfirmation(value)}
              value={confirmation}
              isRequired
            />

            <Button type="submit" variant={ButtonVariant.INFO}>
              {t('Submit')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
