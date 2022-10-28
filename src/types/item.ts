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
  categories?: Array<string>
  image?: RegisteredFile | undefined
  invoice?: RegisteredFile | undefined
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
  categories?: Array<string>
  image?: File | undefined
  invoice?: File | undefined
}
