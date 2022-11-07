import { IItem } from '@types'

export interface IRoom {
  _id: string
  name: string
  createDate?: number
  user?: string
  items?: IItem[]
  room_price?: number
  items_count?: number
}
