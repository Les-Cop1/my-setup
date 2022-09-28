import { IUser, ResponseType } from '@types'

import axios from 'axios'

type AuthResponseType = {
  user: IUser
  token: string
}

export const createUser = async (
  username: string,
  password: string,
  confirmPassword: string,
): Promise<ResponseType<AuthResponseType>> => {
  try {
    const response = await axios.post('/user', { username, password, confirmation: confirmPassword })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

//TODO
export const updateUser = async (): Promise<ResponseType<AuthResponseType>> => {
  try {
    const response = await axios.put('/user')

    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
