// Authenticated wrapper around axios

import getToken from './getToken'
import axios from 'axios'

export const authFetch = async (url: string, options: any = {}) => {
  const token = await getToken()
  return axios({
    url,
    ...options,
    headers: {
      ...options.headers,
      Authorization: token,
    },
  })
}

export const authPost = async (
  url: string,
  body: any = {},
  options: any = {},
) => {
  const token = await getToken()
  return axios.post(url, body, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token,
    },
  })
}
