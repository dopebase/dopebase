import db from "./prisma/prismaDB";

const bcrypt = require("bcryptjs");

async function getOne(tableName, id) {
  return db.getOne(tableName, id);
}

async function insertOne(tableName, data) {
  return db.insertOne(tableName, data);
}

async function list(tableName, query) {
  return db.list(tableName, query);
}

async function deleteOne(tableName, id) {
  return db.deleteOne(tableName, id);
}

async function updateOne(tableName, id, data) {
  return db.updateOne(tableName, id, data);
}

export { getOne, list, insertOne, deleteOne, updateOne };
