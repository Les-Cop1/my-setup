import { StatsGlobal } from '@pages'
import { IRoom, ResponseType } from '@types'

import axios from 'axios'

type StatsResponseType = {
  stats: {
    global: StatsGlobal
    rooms: Record<string, IRoom>
    years: Record<string, number>
  }
}

type RoomsResponseType = {
  rooms: IRoom[]
}

type RoomResponseType = {
  room: IRoom
}

export const getRooms = async (): Promise<ResponseType<RoomsResponseType>> => {
  try {
    const response = await axios.get('/room')
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const getRoom = async (id: string): Promise<ResponseType<RoomResponseType>> => {
  try {
    const response = await axios.get(`/room/${id}`)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const getRoomStats = async (): Promise<ResponseType<StatsResponseType>> => {
  const response = await axios.get(`/room/stats`)
  return response.data
}

export const createRoom = async (room: { name: string }): Promise<ResponseType> => {
  const response = await axios.post('/room', room)
  return response.data
}

export const updateRoom = async (id: string, room: IRoom): Promise<ResponseType<RoomsResponseType>> => {
  const response = await axios.put(`/room/${id}`, room)
  return response.data
}

export const deleteRoom = async (id: string): Promise<ResponseType> => {
  const response = await axios.delete(`/room/${id}`)
  return response.data
}
