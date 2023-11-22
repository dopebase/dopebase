const db =
  process.env.DATABASE_TYPE === 'firebase'
    ? require('./firebase/firebaseDB').default
    : require('./prisma/prismaDB').default

async function getOne(tableName, id) {
  return db.getOne(tableName, id)
}

async function insertOne(tableName, data) {
  return db.insertOne(tableName, data)
}

async function list(tableName, queryParams) {
  return db.list(tableName, queryParams)
}

async function deleteOne(tableName, id) {
  return db.deleteOne(tableName, id)
}

async function updateOne(tableName, id, data) {
  return db.updateOne(tableName, id, data)
}

async function findOne(tableName, whereDict) {
  return db.findOne(tableName, whereDict)
}

export { getOne, list, insertOne, deleteOne, updateOne, findOne }
