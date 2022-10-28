import { ICreateItem, IItem, ResponseType } from '@types'

import axios from 'axios'

type ItemsResponseType = {
  items: IItem[]
}

type ItemResponseType = {
  item: IItem
}

export const getItems = async (): Promise<ResponseType<ItemsResponseType>> => {
  try {
    const response = await axios.get('/item')
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const getItem = async (id: string): Promise<ResponseType<ItemResponseType>> => {
  try {
    const response = await axios.get(`/item/${id}`)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const createItem = async (item: ICreateItem): Promise<ResponseType> => {
  const response = await axios.post('/item', item)
  return response.data
}

export const updateItem = async (id: string, item: FormData): Promise<ResponseType<ItemsResponseType>> => {
  const response = await axios.put(`/item/${id}`, item)
  return response.data
}

export const deleteItem = async (id: string): Promise<ResponseType> => {
  const response = await axios.delete(`/item/${id}`)
  return response.data
}
