// @ts-nocheck

import { prisma } from './prismaClient'
import { escapeObject, unescapeObject } from '../../../../utils'

const Validator = require('validator')

async function getOne(tableName, id) {
  const result = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${tableName} where id='${Validator.escape(id)}'`,
  )

  return unescapeObject(result[0])
}

async function list(tableName, queryParams) {
  var queryLimit = ''
  var queryOrderBy = 'order by updated_at desc'
  // if (queryParams.search) {
  //   const keys = Object.keys(queryParams.search)
  //   const values = Object.values(queryParams.search)
  //   for (var i = 0; i < keys.length; ++i) {
  //     if (i === 0) {
  //       querySearch += 'where '
  //     }
  //     const key = keys[i]
  //     const value = values[i]
  //     querySearch += `${key} like '%${Validator.escape(value)}%'`
  //     if (i < keys.length - 1) {
  //       querySearch += ' or '
  //     }
  //   }
  // }
  if (queryParams.limit?.length > 0) {
    queryLimit = `limit ${queryParams.limit}`
  }
  if (queryParams.orderBy?.length > 0) {
    queryOrderBy = `order by ${queryParams.orderBy}`
  }
  console.log(`SELECT * FROM ${tableName} ${queryOrderBy} ${queryLimit}`)
  const result = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${tableName} ${queryOrderBy} ${queryLimit}`,
  )
  const unescapedRes = result.map(res => unescapeObject(res))
  if (queryParams.search?.length > 0) {
    var result = []
    var keyword = queryParams.search
    for (var i = 0; i < unescapedRes.length; ++i) {
      const item = unescapedRes[i]
      const keys = Object.keys(item)
      for (var j = 0; j < keys.length; ++j) {
        const key = keys[j]
        const value = item[key]
        if (value && value.toString().includes(keyword)) {
          result.push(item)
          break
        }
      }
    }
    return result
  }
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

async function findOne(tableName, whereClauseDict) {
  const key = Object.keys(whereClauseDict)[0]
  const value = whereClauseDict[key]
  const result = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${tableName} where ${key}='${Validator.escape(value)}'`,
  )
  return unescapeObject(result[0])
}

export default {
  list,
  getOne,
  insertOne,
  deleteOne,
  updateOne,
  findOne,
}
