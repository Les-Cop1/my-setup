import React, { useState } from 'react'

import { createItem } from '@api'
import { Alert, Button, ButtonVariant, Input, Select, SelectOptionProps, SlideOver, Upload } from '@components'
import { TrashIcon } from '@heroicons/react/24/outline'
import { IRoom, isFile, isRegisteredFile } from '@types'

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

  const [brand, setBrand] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [purchaseDate, setPurchaseDate] = useState<string | undefined>(undefined)
  const [link, setLink] = useState<string>('')
  const [categories, setCategories] = useState<any>([])
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<File | undefined>(undefined)
  const [invoice, setInvoice] = useState<File | undefined>(undefined)
  const [alert, setAlert] = useState<string>('')

  const handleClose = () => {
    setBrand('')
    setModel('')
    setPrice(0)
    setPurchaseDate(undefined)
    setLink('')
    setCategories([])
    setDescription('')
    setImage(undefined)
    setInvoice(undefined)
    setAlert('')
    onClose()
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData()
    data.append('room', room?._id || '')
    data.append('brand', brand)
    data.append('model', model)
    data.append('price', price?.toString() || '')
    data.append('purchaseDate', purchaseDate?.toString() || '')
    data.append('link', link)
    data.append('categories', JSON.stringify(categories.map((category: SelectOptionProps) => category.id)))
    data.append('description', description)
    if (image) {
      data.append('image', image)
    }
    if (invoice) {
      data.append('invoice', invoice)
    }

    createItem(data)
      .then((result) => {
        const { success, error } = result

        if (success) {
          getRooms()
          handleClose()
        } else {
          throw new Error(error)
        }
      })
      .catch((error) => {
        setAlert(error.message)
      })
  }

  const handleDeleteImage = () => {
    if (isFile(image)) setImage(undefined)
  }

  return (
    <SlideOver isOpen={isOpen} onClose={onClose} title={t('Add item')}>
      <form onSubmit={onSubmit} className="h-full">
        <div className="flex flex-col h-full justify-between">
          <div>
            {alert !== '' && <Alert className="mb-5" message={alert} isDismissible={false} />}
            <div className="pb-5">
              <div className="flex items-center">
                <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100 relative">
                  {image && (
                    <img
                      className="aspect-square object-cover"
                      src={URL.createObjectURL(image.name === '' ? new Blob() : image)}
                      alt={t('Item')}
                    />
                  )}
                  {isFile(image) && (
                    <div
                      className="opacity-0 hover:opacity-100 ease-in-out duration-300 cursor-pointer bg-red-700/30 h-12 w-12 overflow-hidden rounded-full absolute top-0 left-0 flex justify-center items-center"
                      onClick={handleDeleteImage}
                    >
                      <span className="sr-only">{t('Delete image')}</span>
                      <TrashIcon className="h-6 w-6 text-white" />
                    </div>
                  )}
                </span>
                <Upload
                  type="button"
                  name="image"
                  label={t(isRegisteredFile(image) ? 'Update the image' : 'Upload an image')}
                  file={!isRegisteredFile(image) ? image : undefined}
                  accept="image/png, image/jpeg"
                  onFileSelect={(e) => {
                    setImage(e)
                    setAlert('')
                  }}
                  onFileSelectError={(e) => setAlert(e)}
                />
              </div>
            </div>
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
                  setPurchaseDate(value as string)
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
                  setCategories(value)
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
                onFileSelect={(e) => {
                  setInvoice(e)
                  setAlert('')
                }}
                onFileSelectError={(e) => {
                  setAlert(e)
                  document.getElementById('headlessui-dialog-title-:r7:')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={handleClose}>
              {t('Close')}
            </Button>
            <Button type="submit" variant={ButtonVariant.SUCCESS} className="ml-2">
              {t('Add item')}
            </Button>
          </div>
        </div>
      </form>
    </SlideOver>
  )
}
