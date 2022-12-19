import React, { useEffect, useState } from 'react'

import { deleteItem, updateItem } from '@api'
import { Alert, Button, ButtonVariant, Input, Select, SelectOptionProps, SlideOver, Upload } from '@components'
import { TrashIcon } from '@heroicons/react/24/outline'
import { DocumentIcon } from '@heroicons/react/24/solid'
import { IItem, LanguageType, RegisteredFile, isFile, isRegisteredFile } from '@types'

import { getBaseURL, getFileURL } from '../../setupAxios'
import { useTranslation } from 'react-i18next'

type EditItemProps = {
  isOpen: boolean
  onClose: () => void
  item?: IItem
  getRooms: () => void
  category: SelectOptionProps[]
}

export const EditItem: React.FC<EditItemProps> = ({ isOpen, onClose, getRooms, item, category }) => {
  const { t, i18n } = useTranslation()

  const [brand, setBrand] = useState<string>(item?.brand || '')
  const [model, setModel] = useState<string>(item?.model || '')
  const [price, setPrice] = useState<number | undefined>(item?.price)
  const [purchaseDate, setPurchaseDate] = useState<string>(item?.purchaseDate?.split('T')[0] || '')
  const [link, setLink] = useState<string>(item?.link || '')
  const [categories, setCategories] = useState<any>([])
  const [description, setDescription] = useState<string>(item?.description || '')
  const [image, setImage] = useState<File | RegisteredFile | undefined>(item?.image)
  const [invoice, setInvoice] = useState<File | RegisteredFile | undefined>(item?.invoice)
  const [alert, setAlert] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClose = () => {
    setTimeout(() => {
      resetData()
    }, 500)
    onClose()
  }

  const resetData = () => {
    setBrand('')
    setModel('')
    setPrice(undefined)
    setPurchaseDate('')
    setLink('')
    setCategories([])
    setDescription('')
    setImage(undefined)
    setInvoice(undefined)
    setIsLoading(false)
    setAlert('')
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

  const handleDeleteInvoice = () => {
    if (isRegisteredFile(invoice)) setInvoice({ ...invoice, _id: '', name: '' })
  }

  const handleDeleteImage = () => {
    if (isRegisteredFile(image)) setImage({ ...image, _id: '', name: '' })
    if (isFile(image)) setImage(undefined)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const data = new FormData()
    data.append('brand', brand)
    data.append('model', model)
    data.append('price', price?.toString() || '')
    data.append('purchaseDate', purchaseDate)
    data.append('link', link)
    data.append('categories', JSON.stringify(categories.map((category: SelectOptionProps) => category.id)))
    data.append('description', description)
    if (image && !isRegisteredFile(image)) {
      data.append('image', image)
    }
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
          throw new Error(error)
        }
      })
      .catch((error) => {
        setAlert(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (item?.brand) setBrand(item?.brand)
    if (item?.model) setModel(item?.model)
    if (item?.price) setPrice(item?.price)
    if (item?.purchaseDate) setPurchaseDate(item?.purchaseDate.split('T')[0])
    if (item?.link) setLink(item?.link)
    if (item?.categories) {
      const language = i18n.language.split('-')[0] as LanguageType
      const categoryList = item.categories.map((categorie) => ({
        id: categorie._id,
        text: categorie[language],
        value: categorie[language],
      }))
      setCategories(categoryList)
    }
    if (item?.description) setDescription(item?.description)
    if (item?.image) setImage(item?.image)
    if (item?.invoice) setInvoice(item?.invoice)
  }, [item, i18n])

  return (
    <SlideOver isOpen={isOpen} onClose={handleClose} title={t('Edit item')}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col h-full justify-between">
          <div>
            {alert !== '' && <Alert className="mb-5" message={alert} isDismissible={false} />}
            <div className="pb-5">
              <div className="flex items-center">
                <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100 relative">
                  {image && (
                    <img
                      className="aspect-square object-cover"
                      src={
                        isRegisteredFile(image)
                          ? `${getBaseURL()}/file/${image._id}`
                          : URL.createObjectURL(image.name === '' ? new Blob() : image)
                      }
                      alt={isRegisteredFile(image) ? t('Item') : ''}
                    />
                  )}
                  {(isRegisteredFile(image) || isFile(image)) && (
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
              {isRegisteredFile(invoice) ? (
                <div>
                  <p className="block text-sm font-medium text-slate-700">{t('Invoice')}</p>
                  <div className="flex justify-between items-center">
                    {invoice.name}
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        onClick={(_) => {
                          window.open(`${getFileURL()}/${invoice._id}`, '_blank')
                        }}
                        icon={DocumentIcon}
                        className="mx-2"
                      >
                        <span className="sr-only">{t('Open invoice')}</span>
                      </Button>
                      <Button
                        onClick={(_) => {
                          handleDeleteInvoice()
                        }}
                        type="button"
                        icon={TrashIcon}
                        className="mx-2"
                      >
                        <span className="sr-only">{t('Delete invoice')}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
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
