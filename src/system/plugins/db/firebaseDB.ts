import { getOne, insertOne, list, updateOne } from '../../../core/db'

export const getStoredPlugins = async () => {
  const plugins = await list('plugins', {})
  return plugins
}

export const insertPluginToDB = async metadata => {
  const dateStr = Math.floor(new Date().getTime() / 1000).toString()

  const plugins = await insertOne('plugins', {
    id: metadata.id,
    name: metadata.name,
    installed: false,
    createdAt: dateStr,
    updatedAt: dateStr,
  })
  return plugins
}

export const retrievePlugin = async id => {
  const plugin = await getOne('plugins', id)
  return plugin
}

export const markAsInstalled = async id => {
  const dateStr = Math.floor(new Date().getTime() / 1000).toString()
  const plugin = await updateOne('plugins', id, {
    installed: true,
    updatedAt: dateStr,
  })
  return plugin
}

export const markAsUninstalled = async id => {
  const dateStr = Math.floor(new Date().getTime() / 1000).toString()
  const plugin = await updateOne('plugins', id, {
    installed: false,
    updatedAt: dateStr,
  })
  return plugin
}

export const isInstalled = async id => {
  const plugin = await getOne('plugins', id)
  return plugin?.installed ?? false
}
