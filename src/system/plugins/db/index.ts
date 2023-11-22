const {
  isInstalled,
  getStoredPlugins,
  insertPluginToDB,
  markAsInstalled,
  markAsUninstalled,
  retrievePlugin,
} =
  process.env.DATABASE_TYPE === 'firebase'
    ? require('./firebaseDB')
    : require('./prismaDB')

export {
  isInstalled,
  getStoredPlugins,
  insertPluginToDB,
  markAsInstalled,
  markAsUninstalled,
  retrievePlugin,
}
