export interface IRoom {
  _id: string
  name: string
  createDate?: number
  user?: string
  items?: Record<string, any>[]
  room_price?: number
  items_count?: number
}
