import React, { useEffect } from 'react'

import { deleteRoom, updateRoom } from '@api'
import { Button, ButtonVariant, Input, SlideOver } from '@components'
import { IRoom } from '@types'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

type EditRoomProps = {
  isOpen: boolean
  onClose: () => void
  room?: IRoom
  getRooms: () => void
}

export const EditRoom: React.FC<EditRoomProps> = ({ isOpen, onClose, getRooms, room }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [name, setName] = React.useState<string>(room?.name || '')

  const handleClose = () => {
    if (room?.name) setName(room?.name)
    onClose()
  }

  useEffect(() => {
    if (room?.name) setName(room?.name)
  }, [room])

  const handleEditRoom = () => {
    updateRoom(room?._id ? room?._id : '', room ? { ...room, name } : { _id: '', name, createDate: 0, user: '' }).then(
      (result) => {
        const { success, error } = result

        if (success) {
          getRooms()
          handleClose()
        } else {
          console.error(error)
        }
      },
    )
  }

  const deleteRoomHandler = () => {
    deleteRoom(room?._id ? room?._id : '').then((response) => {
      const { success, error } = response

      if (success) {
        getRooms()
        navigate('/setup')
      } else {
        console.error(error)
      }
    })
  }

  return (
    <SlideOver isOpen={isOpen} onClose={onClose} title={t('Edit room')}>
      <div className="pb-5">
        <Input
          id={room?._id}
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
            handleEditRoom()
          }}
          variant={ButtonVariant.SUCCESS}
          className="ml-2"
        >
          {t('Edit room')}
        </Button>
      </div>
      <div className="flex justify-end mt-5">
        <Button
          onClick={(_) => {
            deleteRoomHandler()
          }}
          variant={ButtonVariant.DANGER}
          className="ml-2"
        >
          {t('Delete room')}
        </Button>
      </div>
    </SlideOver>
  )
}
