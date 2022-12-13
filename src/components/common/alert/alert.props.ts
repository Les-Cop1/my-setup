import { ComponentType } from '@types'

export interface AlertProps extends ComponentType {
  isOpen?: boolean
  setIsOpen?: () => void
  message: string
  type?: 'success' | 'error' | 'info'
  isDismissible?: boolean
}
