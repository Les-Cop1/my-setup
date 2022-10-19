export interface IItem {
  _id: string
  brand: string
  description?: string
  model?: string
  price?: number
  purchaseDate?: string
  createDate?: number
  user: string
  room: string
  image?: string
  invoice?: string
  categories?: Array<string>
}
