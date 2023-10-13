const jwt = require('jsonwebtoken')

import { getUserByID } from '../../core/db/users'

export const getAuthenticatedUser = async req => {
  const token = req.headers.get('authorization')
  if (!token) {
    return null
  }
  const secretOrKey = process.env.JWT_SECRET
  const decoded = jwt.verify(token.split(' ')[1], secretOrKey)
  const userID = decoded.id
  if (!userID) {
    return null
  }

  const user = await getUserByID(userID)
  return user
}
