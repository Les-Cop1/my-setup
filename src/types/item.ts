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
  image?: string
  invoice?: string
}
