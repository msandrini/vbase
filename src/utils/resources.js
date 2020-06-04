import axios from 'axios'

import { BASE_URL } from './constants'

export const sendCall = (url, method = 'get', data = {}) => {
  const params = { baseUrl: BASE_URL, method, url, data }
  return axios(params)
}

export const warnOnNetworkError = (error) => {
  console.error('Network error', error)
}
