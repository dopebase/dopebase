const jwt = require('jsonwebtoken')

import { getUserByID } from '../../core/db/users'

export const isAdminAuthenticated = async req => {
  const token = req.headers.get('authorization')
  if (!token) {
    return false
  }
  const secretOrKey = process.env.JWT_SECRET
  const decoded = jwt.verify(token.split(' ')[1], secretOrKey)
  const userID = decoded.id
  if (!userID) {
    return false
  }

  const user = await getUserByID(userID)
  if (!user || user.role !== 'admin') {
    return false
  }

  return true
}
