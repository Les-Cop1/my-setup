import { IconType } from '@types'

export type InputProps = {
  id?: string
  label?: string
  name?: string
  value?: string
  placeholder?: string
  helpText?: string
  isDisabled?: boolean
  onChange?: (value: string) => void
  isError?: boolean
  isRequired?: boolean
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date'
  addonAfter?: string | IconType
  addonBefore?: string | IconType
  className?: string
}
