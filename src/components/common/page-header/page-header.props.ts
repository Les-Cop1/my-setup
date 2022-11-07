import { ButtonProps } from '@components'
import { IconType } from '@types'

export type PageHeaderProps = {
  title: string
  actions?: ButtonProps[]
  meta?: PageHeaderMetaProps[]
  moreText?: string
  backgroundColor?: 'dark' | 'light' | 'white'
  className?: string
}

export type PageHeaderMetaProps = {
  label: string
  icon?: IconType
  backgroundColor?: 'dark' | 'light' | 'white'
}