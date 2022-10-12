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

export const getRooms = async (): Promise<ResponseType<RoomsResponseType>> => {
  try {
    const response = await axios.get('/room')
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const getRoomStats = async (): Promise<ResponseType<StatsResponseType>> => {
  const response = await axios.get(`/room/stats`)
  return response.data
}
