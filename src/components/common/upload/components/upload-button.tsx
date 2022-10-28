import React, { useRef } from 'react'

type UploadButtonProps = {
  id: string
  name?: string
  label?: string
  className?: string
  accept?: string
  file?: File
  onFileSelect?: (file: File) => void
  onFileSelectError?: (error: string) => void
  maxSize?: number
  disabled?: boolean
  resetFile?: () => void
  type?: 'button' | 'area'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  id,
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
  onChange,
  ...props
}) => {
  const fileInput = useRef<HTMLInputElement>(null)

  return (
    <label htmlFor={id}>
      <span className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
        {label}
      </span>
      <input
        id={id}
        name={name}
        accept={accept}
        onChange={onChange}
        ref={fileInput}
        type="file"
        className="sr-only"
        disabled={disabled}
        {...props}
      />
    </label>
  )
}
