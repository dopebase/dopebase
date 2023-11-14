/*

Anatomy of a plugin:
- metadata.json
- api
- app
- assets
- hooking system
- data models
- database migrations
- routing system
- admin routing system
- tests

*/

import {
  insertPluginToDB,
  getStoredPlugins,
  isInstalled as isInstalledDB,
} from './db'

export const getAllPluginsAndUpdateIfNeeded = async () => {
  const storedPlugins = await getStoredPlugins()
  const supportedPlugins = [
    'blog',
    'subscriptions',
    'taxi',
    'stripe',
    'customer-support',
    // 'booking',
    // 'chat',
    // 'ecommerce',
    // 'forum',
    // 'gallery',
    // 'helpdesk',
    // 'knowledgebase',
    // 'mailing',
    // 'marketplace',
    // 'news',
    // 'portfolio',
    // 'social',
    // 'survey',
    // 'video',
    // 'wiki',
  ]

  // for each plugin, load the metadata from disk
  const plugins = await Promise.all(
    supportedPlugins.flatMap(async plugin => {
      const { metadata } = await import(`./../../plugins/${plugin}`)
      if (!metadata) {
        return null
      }
      console.log(metadata)
      const storedPlugin = storedPlugins.find(
        plugin => plugin.id === metadata.id,
      )
      if (!storedPlugin) {
        // insert the plugin into the database
        await insertPluginToDB(metadata)
      }

      const { installed = false, createdAt, updatedAt } = storedPlugin ?? {}
      return {
        ...metadata,
        createdAt,
        updatedAt,
        installed,
      }
    }),
  )

  return plugins
}

export const getAllPlugins = async () => {
  // TODO: This should return only installed plugins for the hooks system, but quite tricky since we need access to database (this is needed client side)

  const supportedPlugins = [
    'blog',
    'subscriptions',
    'taxi',
    'stripe',
    'customer-support',
    // 'booking',
    // 'chat',
    // 'ecommerce',
    // 'forum',
    // 'gallery',
    // 'helpdesk',
    // 'knowledgebase',
    // 'mailing',
    // 'marketplace',
    // 'news',
    // 'portfolio',
    // 'social',
    // 'survey',
    // 'video',
    // 'wiki',
  ]

  // for each plugin, load the metadata from disk
  const plugins = await Promise.all(
    supportedPlugins.flatMap(async plugin => {
      const { metadata } = await import(`./../../plugins/${plugin}`)
      if (!metadata) {
        return null
      }
      console.log(metadata)

      return {
        ...metadata,
      }
    }),
  )

  return plugins
}

export { installPlugin, uninstallPlugin } from './install'

export const isInstalled = async id => {
  return await isInstalledDB(id)
}
