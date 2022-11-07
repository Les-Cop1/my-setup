import { RegisteredFile } from './global'

export interface IItem {
  _id: string
  brand: string
  description?: string
  model?: string
  price?: number
  link?: string
  purchaseDate?: string
  createDate?: number
  user?: string
  room?: string
  categories?: Array<CategoryType>
  image?: RegisteredFile | undefined
  invoice?: RegisteredFile | undefined
}

export type CategoryType = {
  _id: string
  en: string
  fr: string
}

export interface ICreateItem {
  brand: string
  description?: string
  model?: string
  price?: number
  link?: string
  purchaseDate?: string
  createDate?: number
  user?: string
  room?: string
  categories?: Array<CategoryType>
  image?: File | undefined
  invoice?: File | undefined
}
