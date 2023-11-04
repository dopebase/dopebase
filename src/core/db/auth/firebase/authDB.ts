import { unescapeString } from '../../../../utils'
import { prisma } from '../../common/prisma/prismaClient'
import { getUserByEmail, createNewUser, getUserByToken } from '../../users'
import {
  findOne,
  getOne,
  insertOne,
  updateOne,
} from '../../../../core/db/common'
import { websiteURL } from '../../../../config/config'

const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')

async function loginWithEmailAndPassword(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (user === null) {
    return { error: { email: 'No user registered with this email' } }
  }

  const auth = await findOne('auth', {
    userID: user.id,
  })

  const encryptedPassword = auth?.encryptedPassword

  if (encryptedPassword) {
    const isMatch = await bcrypt.compare(
      password,
      unescapeString(encryptedPassword),
    )
    if (isMatch) {
      const payload = {
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePictureURL: user.profilePictureURL,
        role: user.role,
        createdAt: user.createdAt,
      }
      return { payload }
    }
  }
  return { error: { password: 'Wrong password' } }
}

async function register(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  profilePictureURL?: string,
  role?: string,
  provider: string = '',
  accessToken: string = '',
  metadata: string = '',
) {
  const user = await getUserByEmail(email)
  if (user !== null) {
    return { error: { email: 'User already exists' } }
  }

  const hashingPromise = new Promise<string>(resolve => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve(hash)
      })
    })
  })

  const hash = await hashingPromise

  const newUser = await createNewUser(
    email,
    hash,
    firstName,
    lastName,
    phone,
    profilePictureURL,
    role,
    provider,
    accessToken,
    metadata,
  )

  return newUser
}

async function resetPassword(token: string, password: string) {
  const user = await getUserByToken(token)
  if (!user) {
    return {
      error: {
        token:
          'Password reset token has expired. Please request a new password reset e-mail.',
      },
    }
  }

  const hashingPromise = new Promise<string>(resolve => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve(hash)
      })
    })
  })

  const hash = await hashingPromise

  const authRes = await findOne('auth', { userID: user.id })
  if (authRes?.id) {
    await updateOne('auth', authRes.id, {
      encryptedPassword: hash,
      resetToken: '',
    })
  }
  return user?.email
}

async function updatePassword(userID: string, password: string) {
  const user = await getOne('users', userID)
  if (user === null) {
    return null
  }

  const hashingPromise = new Promise<string>(resolve => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve(hash)
      })
    })
  })

  const encryptedPassword = await hashingPromise
  const authData = await findOne('auth', { userID: user.id })
  if (authData === null) {
    return null
  }

  console.log(`auth data to be updated: ${JSON.stringify(authData)}`)

  const auth = await updateOne('auth', authData.id, {
    encryptedPassword: encryptedPassword,
  })

  console.log(`updated password to ${JSON.stringify(encryptedPassword)}`)

  return auth
}

async function requestPasswordReset(email: string) {
  const user = await getUserByEmail(email)
  if (!user) {
    return {
      error: {
        token:
          'Password reset token has expired. Please request a new password reset e-mail.',
      },
    }
  }

  const token = uuidv4()
  const auth = await findOne('auth', { userID: user.id })
  if (!auth) {
    return {
      error: {
        token:
          'Password reset token has expired. Please request a new password reset e-mail.',
      },
    }
  }
  const res = await updateOne('auth', auth.id, { resetToken: token })
  const resetURL = `${websiteURL}resetPassword?token=${token}`
  return { resetURL }
}

export {
  loginWithEmailAndPassword,
  register,
  resetPassword,
  updatePassword,
  requestPasswordReset,
}
