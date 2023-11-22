const {
  loginWithEmailAndPassword,
  register,
  resetPassword,
  updatePassword,
  requestPasswordReset,
} =
  process.env.DATABASE_TYPE === 'firebase'
    ? require('./firebase/authDB')
    : require('./prisma/authDB')

export {
  loginWithEmailAndPassword,
  register,
  resetPassword,
  updatePassword,
  requestPasswordReset,
}
