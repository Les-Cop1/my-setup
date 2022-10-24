import { ComponentType } from '@types'

export interface SelectProps extends ComponentType {
  id?: string
  name?: string
  label?: string
  value?: SelectOptionProps
  placeholder: string
  onChange?: (value: SelectOptionProps) => void
  isError?: boolean
  isDisabled?: boolean
  multiple?: boolean
  options?: SelectOptionProps[]
}

export type SelectOptionProps = {
  id: string | number
  text: string
  value: string
  description?: string
  image?: string
  disabled?: boolean
}
