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
