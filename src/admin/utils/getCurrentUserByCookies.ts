import { getUserByID } from '../../core/db/users'

const jwt = require('jsonwebtoken')

export const getCurrentUserByCookies = async cookieStore => {
  const tokenObj = cookieStore.get('dopebase.session-token')
  const token = tokenObj?.value
  console.log(token)
  const secretOrKey = process.env.JWT_SECRET

  if (!tokenObj || !token || !secretOrKey) {
    return null
  }

  const bearerToken = `Bearer ${token}`
  const decoded = jwt.verify(bearerToken.split(' ')[1], secretOrKey)
  const userID = decoded.id
  console.log(userID)

  if (!userID) {
    return null
  }

  const user = await getUserByID(userID)

  console.log(user)

  if (!user) {
    return null
  }

  return user
}

export const getCurrentAdmin = async cookieStore => {
  const user = await getCurrentUser(cookieStore)
  if (user?.role == 'admin') {
    return user
  }
  return null
}