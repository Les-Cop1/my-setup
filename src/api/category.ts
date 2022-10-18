import { ResponseType } from '@types'

import axios from 'axios'

type CategoryResponseType = {
  categories: string[]
}

const getCategories = async (): Promise<ResponseType<CategoryResponseType>> => {
  const response = await axios.get('/category')
  return response.data
}

export { getCategories }
