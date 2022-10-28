import React, { useState } from 'react'

import { createItem } from '@api'
import { Button, ButtonVariant, Input, Select, SelectOptionProps, SlideOver, Upload } from '@components'
import { IRoom } from '@types'

import { useTranslation } from 'react-i18next'

type AddItemProps = {
  isOpen: boolean
  onClose: () => void
  getRooms: () => void
  category: SelectOptionProps[]
  room?: IRoom
}

export const AddItem: React.FC<AddItemProps> = ({ isOpen, onClose, getRooms, category, room }) => {
  const { t } = useTranslation()

  // const [preview, setPreview] = React.useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined)
  const [link, setLink] = useState<string>('')
  const [categories, setCategories] = useState<any>([])
  const [description, setDescription] = useState<string>('')
  const [invoice, setInvoice] = useState<File | undefined>(undefined)

  const handleClose = () => {
    setBrand('')
    setModel('')
    setPrice(0)
    setPurchaseDate(undefined)
    setLink('')
    setCategories([])
    setDescription('')
    setInvoice(undefined)
    onClose()
  }

  const handleAddItem = () => {
    createItem({
      brand,
      model,
      price,
      purchaseDate: purchaseDate?.toString(),
      link,
      description,
      invoice,
      categories: [],
      room: room?._id,
    }).then((result) => {
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
    <SlideOver isOpen={isOpen} onClose={onClose} title={t('Add item')}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="pb-5">
            <Input
              label={t('Brand')}
              name="brand"
              value={brand}
              onChange={(value) => {
                setBrand(value as string)
              }}
              isRequired
            />
          </div>
          <div className="pb-5">
            <Input
              label={t('Model')}
              name="model"
              value={model}
              onChange={(value) => {
                setModel(value as string)
              }}
            />
          </div>
          <div className="pb-5">
            <Input
              label={t('Price')}
              name="price"
              type="number"
              value={price}
              onChange={(value) => {
                setPrice(value as number)
              }}
            />
          </div>
          <div className="pb-5">
            <Input
              label={t('Purchase Date')}
              name="purchaseDate"
              type="date"
              value={purchaseDate?.toString()}
              onChange={(value) => {
                setPurchaseDate(new Date(value))
              }}
            />
          </div>
          <div className="pb-5">
            <Input
              label={t('Link')}
              name="link"
              value={link}
              onChange={(value) => {
                setLink(value as string)
              }}
            />
          </div>
          <div className="pb-5">
            <Select
              label={t('Categories')}
              name="categories"
              multiple={true}
              value={categories}
              options={category}
              onChange={(value) => {
                setCategories([...categories, value])
              }}
              placeholder={t('Please select a category')}
            />
          </div>
          <div className="pb-5">
            <Input
              label={t('Description')}
              name="description"
              value={description}
              onChange={(value) => {
                setDescription(value as string)
              }}
            />
          </div>
          <div className="pb-5">
            <Upload
              name="invoice"
              label={t('Upload an invoice')}
              file={invoice}
              accept="application/pdf"
              onFileSelect={(e) => setInvoice(e)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleClose}>{t('Close')}</Button>
          <Button
            onClick={(_) => {
              handleAddItem()
            }}
            variant={ButtonVariant.SUCCESS}
            className="ml-2"
          >
            {t('Add item')}
          </Button>
        </div>
      </div>
    </SlideOver>
  )
}
