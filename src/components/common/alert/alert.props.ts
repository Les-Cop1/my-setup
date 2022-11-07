import { ComponentType } from '@types'

export interface AlertProps extends ComponentType {
  message: string
  type?: 'success' | 'error' | 'info'
  isDismissible?: boolean
}
