const { upload } =
  process.env.DATABASE_TYPE === 'firebase'
    ? require('./firebase/upload')
    : require('./local/upload')

export { upload }
