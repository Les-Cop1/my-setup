import React, { useEffect, useRef } from 'react'

import { UploadProps } from '@components'
import { classNames } from '@helpers'
import { DocumentIcon, DocumentPlusIcon } from '@heroicons/react/24/outline'

import { UploadButton } from './components'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    name,
    label = '',
    className = '',
    accept,
    file: fileData,
    onFileSelect,
    resetFile,
    onFileSelectError,
    maxSize = 2048,
    disabled = false,
    type = 'area',
    ...otherProps
  } = props

  const { t } = useTranslation()
  const fileInput = useRef<HTMLInputElement>(null)
  const id = uuid()

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files && files.length > 0) {
      const file = files[0]

      if (file.size > maxSize * 1024) {
        onFileSelectError?.(`Le fichier ne doit pas dépasser ${Math.round(maxSize / 1024)}MB`)
        return
      }

      if (accept && !accept.split(', ').includes(file.type)) {
        onFileSelectError?.(`Format de fichier non accepté : ${file.type}`)
        return
      }
      onFileSelect?.(file)
    }
  }

  const reset = () => {
    if (fileInput?.current) {
      fileInput.current.value = ''
    }
    resetFile?.()
  }

  useEffect(() => {
    if (!fileData) {
      reset()
    }
  }, [fileData])

  if (type === 'button') {
    return <UploadButton id={id} onChange={handleFileInput} {...props} />
  }

  return (
    <div className="mt-1 sm:col-span-2 sm:mt-0">
      <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          {fileData ? (
            <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
          ) : (
            <DocumentPlusIcon className="mx-auto h-12 w-12 text-gray-400" />
          )}
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={id}
              className={classNames(
                'relative cursor-pointer rounded-md bg-white font-medium text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 hover:text-emerald-500',
                className,
              )}
            >
              <span>{fileData?.name || label}</span>
              <input
                id={id}
                name={name}
                accept={accept}
                onChange={handleFileInput}
                ref={fileInput}
                type="file"
                className="sr-only"
                disabled={disabled}
                {...otherProps}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">{t('PDF up to xMB', { val: 2 })}</p>
        </div>
      </div>
    </div>
  )
}
