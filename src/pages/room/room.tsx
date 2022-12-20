import React, { useEffect, useState } from 'react'

import { getCategories, getRoom } from '@api'
import illustration from '@assets/images/empty.svg'
import { AddItem, Card, EditItem, EditRoom, PageHeader, SelectOptionProps, Text, TextVariant } from '@components'
import { ChevronUpDownIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline'
import { IItem, IRoom, LanguageType } from '@types'

import { ItemCard } from './components'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { useOutletContext, useParams } from 'react-router-dom'

const sortByPriceThenName = (a: IItem, b: IItem) => {
  if (a.price === b.price) {
    return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
  }

  return (b.price ?? 0) - (a.price ?? 0)
}

const sortByName = (a: IItem, b: IItem) => {
  return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
}

type stats = {
  count?: number
  total?: number
  average?: number
}

export const Room: React.FC = () => {
  const { _id } = useParams()
  const { t, i18n } = useTranslation()
  const [cookies, setCookies] = useCookies(['isSortByPrice'])

  const [room, setRoom] = useState<IRoom | undefined | null>()
  const [items, setItems] = useState<IItem[]>([])
  const [category, setCategory] = useState<SelectOptionProps[]>([])

  const [itemToEdit, setItemToEdit] = useState<IItem | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [stats, setStats] = useState<stats>({})
  const [isSidebarOpenRoom, setIsSidebarOpenRoom] = useState<boolean>(false)
  const [isSidebarOpenAddItem, setIsSidebarOpenAddItem] = useState<boolean>(false)
  const [isSidebarOpenEditItem, setIsSidebarOpenEditItem] = useState<boolean>(false)
  const [isSortingByPrice, setIsSortingByPrice] = useState<boolean>(cookies.isSortByPrice === 'true' ?? true)

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
          setRoom(null)
        }
      })
      .catch(() => {
        console.error('Could not retrieve room data')
        setRoom(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const getCategory = () => {
    setIsLoading(true)
    getCategories()
      .then((response) => {
        const { success, data } = response
        if (success) {
          const language = i18n.language.split('-')[0] as LanguageType
          const categoryList = data?.categories.map((categorie) => ({
            id: categorie._id,
            text: categorie[language],
            value: categorie[language],
          }))
          setCategory(categoryList ? categoryList : [])
          setIsLoading(false)
        } else {
          console.error('Could not retrieve category data')
          setCategory([])
        }
      })
      .catch(() => {
        console.error('Could not retrieve category data')
        setCategory([])
      })
  }

  const handleEditItem = (item: IItem) => {
    setItemToEdit(item)
    setIsSidebarOpenEditItem(true)
  }

  const handleAddItem = () => {
    setIsSidebarOpenAddItem(true)
  }

  useEffect(() => {
    setIsLoading(true)

    if (room?.name) {
      document.title = `${room.name} - mySetup`
    }

    const newItems = room?.items ? [...room.items] : []
    newItems.sort(isSortingByPrice ? sortByPriceThenName : sortByName)
    setItems(newItems)

    const count = newItems.length

    const total = newItems.reduce((acc, { price }) => {
      return acc + (typeof price === 'number' ? price : 0)
    }, 0)
    const average = count !== 0 ? total / newItems.length : 0

    setStats({
      count,
      total: Math.round(total * 100) / 100,
      average: Math.round(average * 100) / 100,
    })

    setIsLoading(false)
  }, [room, isSortingByPrice])

  useEffect(() => {
    getRoomData()
    getCategory()
  }, [_id, getRooms])

  useEffect(() => {
    setCookies('isSortByPrice', isSortingByPrice, { path: '', maxAge: 31536000 })
  }, [isSortingByPrice])

  useEffect(() => {
    if (cookies.isSortByPrice !== undefined) {
      setIsSortingByPrice(cookies.isSortByPrice === 'true')
    }
  }, [cookies])

  if (isLoading) {
    return (
      <div className="flex justify-center w-100 p-5">
        <Text variant={TextVariant.GREY} as="h4">
          {t('Loading...')}
        </Text>
      </div>
    )
  }

  if (room === null) {
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
          { label: t('Add item'), icon: PlusIcon, isDisabled: isLoading, onClick: handleAddItem },
          { label: t('Edit room'), icon: PencilIcon, isDisabled: isLoading, onClick: () => setIsSidebarOpenRoom(true) },
          {
            label: t(isSortingByPrice ? 'Sort by name' : 'Sort by price'),
            icon: ChevronUpDownIcon,
            onClick: () => setIsSortingByPrice(!isSortingByPrice),
          },
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
        {items?.map((item) => (
          <ItemCard key={item._id} item={item} handleEditItem={handleEditItem} isLoading={isLoading} />
        ))}
      </div>

      {room && (
        <>
          <EditRoom
            getRooms={getRooms}
            isOpen={isSidebarOpenRoom}
            onClose={() => {
              setIsSidebarOpenRoom(false)
            }}
            room={room}
          />
          <AddItem
            getRooms={getRooms}
            isOpen={isSidebarOpenAddItem}
            onClose={() => {
              setIsSidebarOpenAddItem(false)
            }}
            category={category}
            room={room}
          />
        </>
      )}

      <EditItem
        getRooms={getRooms}
        isOpen={isSidebarOpenEditItem}
        onClose={() => {
          setIsSidebarOpenEditItem(false)
          setItemToEdit(undefined)
        }}
        category={category}
        item={itemToEdit}
      />
    </div>
  )
}
