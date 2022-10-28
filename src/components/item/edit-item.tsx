import React, { useEffect, useState } from 'react'

import { deleteItem, updateItem } from '@api'
import { Button, ButtonVariant, Input, Select, SelectOptionProps, SlideOver, Upload } from '@components'
import { TrashIcon } from '@heroicons/react/24/solid'
import { IItem, RegisteredFile, isRegisteredFile } from '@types'

import { useTranslation } from 'react-i18next'

type EditItemProps = {
  isOpen: boolean
  onClose: () => void
  item?: IItem
  getRooms: () => void
  category: SelectOptionProps[]
}

export const EditItem: React.FC<EditItemProps> = ({ isOpen, onClose, getRooms, item, category }) => {
  const { t } = useTranslation()

  const [brand, setBrand] = useState<string>(item?.brand || '')
  const [model, setModel] = useState<string>(item?.model || '')
  const [price, setPrice] = useState<number | undefined>(item?.price)
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(
    item?.purchaseDate ? new Date(item?.purchaseDate) : undefined,
  )
  const [link, setLink] = useState<string>(item?.link || '')
  const [categories, setCategories] = useState<any>([])
  const [description, setDescription] = useState<string>(item?.description || '')
  const [invoice, setInvoice] = useState<File | RegisteredFile | undefined>(item?.invoice)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClose = () => {
    resetData()
    onClose()
  }

  const resetData = () => {
    setBrand('')
    setModel('')
    setPrice(undefined)
    setPurchaseDate(undefined)
    setLink('')
    setCategories([])
    setDescription('')
    setInvoice(undefined)
    setIsLoading(false)
  }

  const handleDeleteItem = () => {
    deleteItem(item?._id || '').then((response) => {
      const { success, error } = response

      if (success) {
        getRooms()
        handleClose()
      } else {
        console.error(error)
      }
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const data = new FormData()
    data.append('brand', brand)
    data.append('model', model)
    data.append('price', price?.toString() || '')
    data.append('purchaseDate', purchaseDate?.toISOString() || '')
    data.append('link', link)
    data.append('categories', JSON.stringify(categories))
    data.append('description', description)
    if (invoice && !isRegisteredFile(invoice)) {
      data.append('invoice', invoice)
    }

    updateItem(item?._id || '', data)
      .then((result) => {
        const { success, error } = result

        if (success) {
          getRooms()
          handleClose()
        } else {
          console.error(error)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (item?.brand) setBrand(item?.brand)
    if (item?.model) setModel(item?.model)
    if (item?.price) setPrice(item?.price)
    if (item?.purchaseDate) setPurchaseDate(new Date(item?.purchaseDate))
    if (item?.link) setLink(item?.link)
    if (item?.categories) setCategories(item?.categories)
    if (item?.description) setDescription(item?.description)
    if (item?.invoice) setInvoice(item?.invoice)
  }, [item])

  return (
    <SlideOver isOpen={isOpen} onClose={onClose} title={t('Edit item')}>
      <form onSubmit={onSubmit}>
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
              {isRegisteredFile(invoice) ? (
                <div>{invoice.name}</div>
              ) : (
                <Upload
                  name="invoice"
                  label={t('Upload an invoice')}
                  file={invoice}
                  accept="application/pdf"
                  onFileSelect={(e) => setInvoice(e)}
                />
              )}
            </div>
          </div>

          <div className="flex">
            <span className="sr-only">{t('Delete item')}</span>
            <Button
              onClick={(_) => {
                handleDeleteItem()
              }}
              type="button"
              variant={ButtonVariant.DANGER}
              icon={TrashIcon}
              className="mr-auto"
            />
            <Button onClick={handleClose} className="mx-2" label={t('Close')} />
            <Button type="submit" variant={ButtonVariant.SUCCESS} isLoading={isLoading} label={t('Edit item')} />
          </div>
        </div>
      </form>
    </SlideOver>
  )
}
