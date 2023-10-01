// @ts-nocheck

import { User } from '@prisma/client'
import { prisma } from './prismaClient'
import { escapeObject, unescapeObject } from '../../../../utils'

const Validator = require('validator')

async function getOne(tableName, id) {
  const result = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${tableName} where id='${Validator.escape(id)}'`,
  )

  return unescapeObject(result[0])
}

async function list(tableName, query) {
  console.log(`SELECT * FROM ${tableName} ${query}`)
  const result = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${tableName} ${query}`,
  )
  const unescapedRes = result.map(res => unescapeObject(res))
  return unescapedRes
}

async function insertOne(tableName, unescapedData) {
  const data = escapeObject(unescapedData)
  const dataKeys = Object.keys(data)
  let query = `insert into ${tableName} (id`

  for (var i = 0; i < dataKeys.length; ++i) {
    query = `${query}, ${dataKeys[i]}`
  }
  query += ') values(gen_random_uuid()'
  for (var i = 0; i < dataKeys.length; ++i) {
    const key = dataKeys[i]
    const value = data[key]
    if (value === null) {
      query += ', null'
    } else if (Array.isArray(value)) {
      query = `${query}, '{${value.toString()}}'`
    } else {
      query = `${query}, '${value}'`
    }
  }
  query += ')'
  console.log(query)

  const result = await prisma.$executeRawUnsafe(query)
  return result
}

async function deleteOne(tableName, id) {
  const query = `delete from ${tableName} where id='${id}'`
  const result = await prisma.$queryRawUnsafe(`${query}`)
  console.log(query)
  return result[0]
}

async function updateOne(tableName, id, unescapedData) {
  const data = escapeObject(unescapedData)
  const dataKeys = Object.keys(data)
  let query = `update ${tableName} set `

  for (let i = 0; i < dataKeys.length - 1; ++i) {
    const key = dataKeys[i]
    const value = data[dataKeys[i]]
    var modifiedValue = value
    if (value === null) {
      modifiedValue = 'null'
    } else if (Array.isArray(value)) {
      modifiedValue = `'{${modifiedValue.toString()}}'`
    } else {
      modifiedValue = `'${modifiedValue}'`
    }
    query = `${query + key} = ${modifiedValue}, `
  }
  const lastIndex = dataKeys.length - 1
  if (lastIndex >= 0) {
    const value = data[dataKeys[lastIndex]]
    const key = dataKeys[lastIndex]
    var modifiedValue = value
    if (value === null) {
      modifiedValue = 'null'
    } else if (Array.isArray(value)) {
      modifiedValue = `'{${modifiedValue.toString()}}'`
    } else {
      modifiedValue = `'${modifiedValue}'`
    }
    query = `${query + key} = ${modifiedValue}`
  }
  query = `${query} where id = '${id}' `
  console.log(query)
  const result = await prisma.$executeRawUnsafe(query)
  return result
}

async function findUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email: Validator.escape(email) },
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
    encryptedPassword,
    firstName,
    lastName,
    phone,
    profilePictureURL,
    role,
    provider,
    accessToken,
    metadata,
    createdAt: dateStr,
    updatedAt: dateStr,
  }
  const user = await prisma.user.create({
    data: escapeObject(insertData),
  })
  return user
}

async function getUserByID(userID: string): Promise<User> {
  return prisma.user.findFirst({ where: { id: Validator.escape(userID) } })
}

async function getUserByToken(token: string): Promise<User> {
  if (token?.length == 0) {
    return null
  }
  return prisma.user.findFirst({
    where: { resetToken: Validator.escape(token) },
  })
}

export default {
  list,
  getOne,
  insertOne,
  deleteOne,
  updateOne,
  findUserByEmail,
  createNewUser,
  getUserByID,
  getUserByToken,
}
