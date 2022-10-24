import React, { useEffect, useRef } from 'react'

import { Text, UploadProps } from '@components'

import { v4 as uuid } from 'uuid'

export const Upload: React.FC<UploadProps> = ({
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
  required = false,
  ...props
}) => {
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

      if (accept && !accept.split(' ').includes(file.type)) {
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

  return (
    <div className="field">
      <div className="control">
        <input
          id={id}
          name={name}
          accept={accept}
          type="file"
          onChange={handleFileInput}
          ref={fileInput}
          className={`input ${className}`}
          disabled={disabled}
          {...props}
        />
        {label && (
          <label htmlFor={id} className="button is-secondary">
            {label}
            {required ? ' *' : ''}
          </label>
        )}
        {fileData && (
          <button className="delete-file-button" type="button" onClick={() => reset()}>
            <Text>{fileData.name}</Text>
          </button>
        )}
      </div>
    </div>
  )
}
