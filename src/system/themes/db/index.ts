const { getCurrentTheme, setCurrentTheme } =
  process.env.DATABASE_TYPE === 'firebase'
    ? require('./firebaseDB')
    : require('./prismaDB')

export { getCurrentTheme, setCurrentTheme }
