export type UploadProps = {
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
}
