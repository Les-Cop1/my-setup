import { ButtonProps } from '@components'
import { ComponentType, IconType } from '@types'

export interface PageHeaderProps extends ComponentType {
  title: string
  actions?: ButtonProps[]
  meta?: PageHeaderMetaProps[]
  moreText?: string
  backgroundColor?: 'dark' | 'light' | 'white'
}
export interface PageHeaderMetaProps extends ComponentType {
  label: string
  icon?: IconType
  backgroundColor?: 'dark' | 'light' | 'white'
}
