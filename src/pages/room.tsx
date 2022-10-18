import React, { useEffect, useState } from 'react'

import { getRoom } from '@api'
import { Button, Card, CardAddon, PageHeader, Text } from '@components'
import { stringToHex } from '@helpers'
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline'
import { IRoom } from '@types'

import { EditRoom } from './edit-room'
import { useTranslation } from 'react-i18next'
import { useOutletContext, useParams } from 'react-router-dom'
import { ShapeProps, SvgBlob } from 'react-svg-blob'

type stats = {
  count?: number
  total?: number
  average?: number
}

const generateShapeProps = (string: string): ShapeProps => ({
  size: 200,
  growth: stringToHex(string),
  edges: Math.floor(stringToHex(string)) + 3,
})

export const Room: React.FC = () => {
  const { _id } = useParams()
  const { t } = useTranslation()

  const [room, setRoom] = useState<IRoom | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [stats, setStats] = useState<stats>({})
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [itemsAspect, setItemsAspect] = useState<ShapeProps[]>([])

  const [getRooms] = useOutletContext<Array<() => void>>()

  const getRoomData = () => {
    setIsLoading(true)
    getRoom(_id ? _id : '')
      .then((response) => {
        const { success, data, error } = response
        if (success) {
          setRoom(data?.room)
          setIsLoading(false)
        } else {
          console.log('error', 'Could not retrieve room data', error)
          setRoom(undefined)
        }
      })
      .catch((error) => {
        console.log('error', 'Could not retrieve room data', error)
        setRoom(undefined)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    setItemsAspect([])
    const items = room?.items ? room.items : []
    const count = items.length

    const total = items.reduce((acc, { price }) => {
      return acc + (typeof price === 'number' ? price : 0)
    }, 0)
    const average = count !== 0 ? total / items.length : 0

    setStats({
      count,
      total: Math.round(total * 100) / 100,
      average: Math.round(average * 100) / 100,
    })

    items.forEach((item) => {
      setItemsAspect((prev) => [...prev, generateShapeProps(item.brand)])
    })

    setIsLoading(false)
  }, [room])

  useEffect(() => {
    getRoomData()
  }, [_id, getRooms])

  return (
    <div className="my-auto">
      <PageHeader
        title={room ? room?.name : ''}
        actions={[
          { label: t('Add item'), icon: PlusIcon, isDisabled: isLoading },
          { label: t('Edit room'), icon: PencilIcon, isDisabled: isLoading, onClick: () => setIsSidebarOpen(true) },
        ]}
      />

      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 grid grid-cols-2 gap-5 lg:grid-cols-3">
        <Card>
          <p className="truncate text-sm font-medium text-gray-500 mb-0">{t('Item', { count: stats?.count })}</p>
          <p className="text-lg font-medium text-gray-900 mb-0">{stats?.count}</p>
        </Card>
        <Card>
          <p className="truncate text-sm font-medium text-gray-500 mb-0">{t('Total')}</p>
          <p className="text-lg font-medium text-gray-900 mb-0">{t('Money', { val: stats?.total })}</p>
        </Card>
        <Card>
          <p className="truncate text-sm font-medium text-gray-500 mb-0">{t('Average')}</p>
          <p className="text-lg font-medium text-gray-900 mb-0">{t('Money', { val: stats?.average })}</p>
        </Card>
      </div>

      <div className="mx-auto p-4 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {room?.items?.map((item, index) => (
          <Card
            key={item._id}
            header={
              <CardAddon>
                <SvgBlob
                  shapeProps={itemsAspect[index]}
                  variant="gradient"
                  colors={['#2dd4bf', '#0d9488']}
                  className="p-8"
                />
              </CardAddon>
            }
            footer={
              <CardAddon className="mt-auto">
                <Button icon={PencilIcon} className={'w-full flex justify-center'} />
              </CardAddon>
            }
          >
            <Text isLoading={isLoading} skeleton="xxxxxxx" as="h4">
              {item.brand} <Text isLoading={isLoading} skeleton="xxxxxxx" text={item.model} as="span" />
            </Text>
            {item.price && <Text isLoading={isLoading} skeleton="xxxxxxx" text={t('Money', { val: item.price })} />}
          </Card>
        ))}
      </div>
      <EditRoom
        getRooms={getRooms}
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false)
        }}
        room={room}
      />
    </div>
  )
}
