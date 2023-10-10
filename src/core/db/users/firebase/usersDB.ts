import { escapeObject } from '../../../../utils'
import { getOne, insertOne, findOne } from '../../common'

const Validator = require('validator')

async function getUserByID(userID: string): Promise<any | null> {
  return getOne('users', Validator.escape(userID))
}

async function getUserByToken(token: string): Promise<any | null> {
  if (token?.length == 0) {
    return null
  }
  const auth = await findOne('auth', {
    resetToken: Validator.escape(token),
  })
  const userId = auth?.userID
  if (userId) {
    return await getUserByID(userId)
  }
  return null
}

async function getUserByEmail(email: string) {
  const user = await findOne('users', {
    email: Validator.escape(email),
  })
  if (user) {
    return user
  }
  return null
}

async function createNewUser(
  email: string,
  encryptedPassword: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  profilePictureURL?: string,
  role?: string,
  provider: string = '',
  accessToken: string = '',
  metadata: string = '',
) {
  const dateStr = Math.floor(new Date().getTime() / 1000).toString()

  const insertData = {
    email,
    firstName,
    lastName,
    phone,
    profilePictureURL,
    role,
    metadata,
    createdAt: dateStr,
    updatedAt: dateStr,
  }
  const user = await insertOne('users', insertData)
  const authData = {
    userID: user.id,
    encryptedPassword,
    providerType: provider ? provider : email ? 'email' : 'phone',
    accessToken,
    createdAt: dateStr,
    updatedAt: dateStr,
  }
  const auth = await insertOne('auth', authData)
  return user
}

export { getUserByID, getUserByEmail, createNewUser, getUserByToken }
