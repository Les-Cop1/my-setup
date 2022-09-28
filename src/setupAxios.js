import axios from 'axios'

export const getBaseURL = () => {
  let baseURL = '/api'

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:2011/api'
  }

  return baseURL
}

const setupAxios = () => {
  axios.defaults.baseURL = getBaseURL()
  axios.defaults.withCredentials = true
}

export default setupAxios
