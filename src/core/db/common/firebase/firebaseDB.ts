// @ts-nocheck
import { firestore } from './firebaseClient'
import { unescapeObject } from '../../../../utils'
import { replaceUndefinedKeysWithEmptyStrings } from '../../../../utils/escape'

async function getOne(tableName, id) {
  const ref = firestore().collection(tableName).doc(id)
  const doc = await ref.get()
  if (!doc.exists) {
    console.log(
      `Collection ${tableName} does not have an entry with id ${JSON.stringify(
        id,
      )}`,
    )
    return null
  }
  const data = doc.data()
  return unescapeObject(data)
}

async function list(tableName, queryParams) {
  var ref = firestore().collection(tableName)
  if (queryParams.limit?.length > 0) {
    ref = ref.limit(parseInt(queryParams.limit))
  }
  if (queryParams.orderBy?.length > 0) {
    ref = ref.orderBy(queryParams.orderBy, 'desc')
  } else {
    // ref = ref.orderBy('updatedAt', 'desc')
  }
  const snapshot = await ref.get()
  const data = snapshot.docs.map(doc => doc.data())

  if (queryParams.search?.length > 0) {
    var result = []
    var keyword = queryParams.search
    for (var i = 0; i < data.length; ++i) {
      const item = data[i]
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

  return data
}

async function insertOne(tableName, unescapedData) {
  try {
    const data = replaceUndefinedKeysWithEmptyStrings(unescapedData)
    console.log(`inserting data `)
    console.log(data)
    const ref = data?.id
      ? firestore().collection(tableName).doc(data.id)
      : firestore().collection(tableName).doc()
    const res = await ref.set({ ...data, id: ref.id })
    return await getOne(tableName, ref.id)
  } catch (e) {
    console.log(e)
    return null
  }
}

async function deleteOne(tableName, id) {
  const ref = firestore().collection(tableName).doc(id)
  const doc = await ref.get()
  if (!doc.exists) {
    console.log(`Collection ${tableName} does not have an entry with id ${id}`)
    return null
  }
  await ref.delete()
  console.log(`Deleted id ${id} from collection ${tableName}`)
  return id
}

async function updateOne(tableName, id, unescapedData) {
  const data = replaceUndefinedKeysWithEmptyStrings(unescapedData)
  const ref = firestore().collection(tableName).doc(id)
  const doc = await ref.get()
  if (!doc.exists) {
    console.log(`Collection ${tableName} does not have an entry with id ${id}`)
    return null
  }
  await ref.set(data, { merge: true })
  console.log(`Updated id ${id} in collection ${tableName}`)
  return await getOne(tableName, id)
}

async function findOne(tableName, whereClauseDict) {
  const ref = firestore().collection(tableName)
  const key = Object.keys(whereClauseDict)[0]
  const value = whereClauseDict[key]
  const snapshot = await ref.where(key, '==', value).get()
  const data = snapshot.docs.map(doc => doc.data())
  if (data.length > 0) {
    return data[0]
  }
  return null
}

export default {
  list,
  getOne,
  insertOne,
  deleteOne,
  updateOne,
  findOne,
}
