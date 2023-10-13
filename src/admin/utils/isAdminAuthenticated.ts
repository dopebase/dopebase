import { getAuthenticatedUser } from './getAuthenticatedUser'

export const isAdminAuthenticated = async req => {
  const user = await getAuthenticatedUser(req)
  if (!user || user.role !== 'admin') {
    return false
  }

  return true
}
