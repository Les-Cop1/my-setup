import axios from 'axios'

export const getBaseURL = (): string => {
  let baseURL = '/api'

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:2011/api'
  }

  return baseURL
}

export const getFileURL = (): string => {
  let fileURL = `${window.location.protocol}//files.${window.location.host}`

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    fileURL = 'http://localhost:2011/api/file'
  }

  return fileURL
}

const setupAxios = () => {
  axios.defaults.baseURL = getBaseURL()
  axios.defaults.withCredentials = true
}

export default setupAxios
