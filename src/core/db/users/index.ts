const { getUserByID, getUserByEmail, createNewUser, getUserByToken } =
  process.env.DATABASE_TYPE === 'firebase'
    ? require('./firebase/usersDB')
    : require('./prisma/usersDB')

export { getUserByID, getUserByEmail, createNewUser, getUserByToken }
