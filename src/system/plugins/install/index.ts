import { markAsInstalled, markAsUninstalled, retrievePlugin } from '../db'

export const installPlugin = async id => {
  const plugin = await retrievePlugin(id)
  if (!plugin) {
    return false
  }

  await markAsInstalled(id)
  return true
  const { dbSchema } = await import(`./../../../plugins/${plugin}`)
  if (!dbSchema) {
    return false
  }
}

export const uninstallPlugin = async id => {
  const plugin = await retrievePlugin(id)
  if (!plugin) {
    return false
  }

  await markAsUninstalled(id)
  return true
  const { dbSchema } = await import(`./../../../plugins/${plugin}`)
  if (!dbSchema) {
    return false
  }
}
