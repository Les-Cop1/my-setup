import React, { useEffect } from 'react'

import { Card, CardAddon, Text } from '@components'
import { stringToFloat } from '@helpers'
import { DocumentIcon, PencilIcon } from '@heroicons/react/24/outline'
import { IItem, isRegisteredFile } from '@types'

import { getBaseURL, getFileURL } from '../../../setupAxios'
import { useTranslation } from 'react-i18next'
import { ShapeProps, SvgBlob } from 'react-svg-blob'

const generateShapeProps = (string: string): ShapeProps => ({
  size: 200,
  growth: stringToFloat(string),
  edges: Math.floor(stringToFloat(string)) + 3,
})

type ItemCardProps = {
  item: IItem
  isLoading?: boolean
  handleEditItem: (item: IItem) => void
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, handleEditItem, isLoading = false }) => {
  const { t } = useTranslation()

  const [shapeProps, setShapeProps] = React.useState<ShapeProps | null>(null)

  useEffect(() => {
    if (item) {
      setShapeProps(generateShapeProps(item.brand))
    }
  }, [item])

  return (
    <Card
      key={item._id}
      header={
        <CardAddon isFullWidth={true}>
          {isRegisteredFile(item.image) ? (
            <img
              className="aspect-square object-cover"
              src={`${getBaseURL()}/file/${item.image._id}`}
              alt={item.image.name}
            />
          ) : (
            <SvgBlob shapeProps={shapeProps ?? {}} variant="gradient" colors={['#2dd4bf', '#0d9488']} className="p-8" />
          )}
        </CardAddon>
      }
      footer={
        <span className="isolate w-full inline-flex rounded-md shadow-sm divide-x">
          <button
            type="button"
            title={t('Edit item')}
            className="relative inline-flex w-full items-center rounded-l-md bg-white px-2 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 justify-center"
            onClick={(_) => {
              handleEditItem(item)
            }}
          >
            <span className="sr-only">{t('Edit item')}</span>
            <PencilIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {item?.invoice && (
            <button
              type="button"
              title={t('Open invoice')}
              onClick={(_) => {
                window.open(`${getFileURL()}/${item.invoice?._id}`, '_blank')
              }}
              className="relative -ml-px inline-flex w-full items-center rounded-r-md bg-white px-2 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 justify-center"
            >
              <span className="sr-only">{t('Open invoice')}</span>
              <DocumentIcon className="h-5 w-5" aria-hidden="true" />
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
  )
}
