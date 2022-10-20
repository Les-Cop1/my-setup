import React, { useEffect, useState } from 'react'

import { getRoom } from '@api'
import illustration from '@assets/images/empty.svg'
import { Card, CardAddon, PageHeader, Text } from '@components'
import { stringToFloat } from '@helpers'
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
  growth: stringToFloat(string),
  edges: Math.floor(stringToFloat(string)) + 3,
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
        const { success, data } = response
        if (success) {
          setRoom(data?.room)
        } else {
          console.error('Could not retrieve room data')
          setRoom(undefined)
        }
      })
      .catch(() => {
        console.error('Could not retrieve room data')
        setRoom(undefined)
      })
      .finally(() => {
        setIsLoading(false)
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

  if (!isLoading && room === undefined) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white">
        <Text as="h2" className="pt-5 pb-16">
          {t('Room not found')}
        </Text>
        <img src={illustration} className="max-h-96 my-auto px-5" alt="room not found" />
      </div>
    )
  }

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
          <p className="text-lg font-medium text-gray-900 mb-0">
            {t('Money', { val: stats?.total, minimumFractionDigits: 2 })}
          </p>
        </Card>
        <Card>
          <p className="truncate text-sm font-medium text-gray-500 mb-0">{t('Average')}</p>
          <p className="text-lg font-medium text-gray-900 mb-0">
            {t('Money', { val: stats?.average, minimumFractionDigits: 2 })}
          </p>
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
              <span className="isolate w-full inline-flex rounded-md shadow-sm divide-x">
                <button
                  type="button"
                  className="relative inline-flex w-full items-center rounded-l-md bg-white px-2 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 justify-center"
                >
                  <span className="sr-only">{t('Edit item')}</span>
                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {item?.invoice && (
                  <button
                    type="button"
                    className="relative -ml-px inline-flex w-full items-center rounded-r-md bg-white px-2 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 justify-center"
                  >
                    <span className="sr-only">{t('Open invoice')}</span>
                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
              </span>
            }
          >
            <div className="h-full">
              <Text isLoading={isLoading} skeleton="xxxxxxx" as="h4">
                {item.brand} <Text isLoading={isLoading} skeleton="xxxxxxx" text={item.model} as="span" />
              </Text>
              {item.price && (
                <Text
                  isLoading={isLoading}
                  skeleton="xxxxxxx"
                  text={t('Money', { val: item.price, minimumFractionDigits: 2 })}
                />
              )}
            </div>
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
