import React from 'react'

import { createRoom } from '@api'
import { Button, ButtonVariant, Input, SlideOver } from '@components'

import { useTranslation } from 'react-i18next'

type AddRoomProps = {
  isOpen: boolean
  onClose: () => void
  getRooms: () => void
}

export const AddRoom: React.FC<AddRoomProps> = ({ isOpen, onClose, getRooms }) => {
  const { t } = useTranslation()
  const [name, setName] = React.useState<string>('')

  const handleClose = () => {
    setName('')
    onClose()
  }

  const handleCreateRoom = () => {
    createRoom({ name }).then((result) => {
      const { success, error } = result

      if (success) {
        getRooms()
        handleClose()
      } else {
        console.error(error)
      }
    })
  }

  return (
    <SlideOver isOpen={isOpen} onClose={onClose} title={t('Add room')}>
      <div className="pb-5">
        <Input
          label={t('Room name')}
          name="name"
          value={name}
          onChange={(value) => {
            setName(value)
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleClose}>{t('Close')}</Button>
        <Button
          onClick={(_) => {
            handleCreateRoom()
          }}
          variant={ButtonVariant.SUCCESS}
          className="ml-2"
        >
          {t('Submit')}
        </Button>
      </div>
    </SlideOver>
  )
}
