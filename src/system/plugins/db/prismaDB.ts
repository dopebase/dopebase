import { prisma } from '../../../core/db/common/prisma/prismaClient'

export const getStoredPlugins = async () => {
  const plugins = await prisma.plugin.findMany({})
  return plugins
}

export const insertPluginToDB = async metadata => {
  const dateStr = Math.floor(new Date().getTime() / 1000).toString()

  const plugins = await prisma.plugin.create({
    data: {
      id: metadata.id,
      name: metadata.name,
      installed: false,
      createdAt: dateStr,
      updatedAt: dateStr,
    },
  })
  return plugins
}

export const retrievePlugin = async id => {
  const plugin = await prisma.plugin.findUnique({
    where: {
      id,
    },
  })
  return plugin
}

export const markAsInstalled = async id => {
  const dateStr = Math.floor(new Date().getTime() / 1000).toString()

  const plugin = await prisma.plugin.update({
    where: {
      id,
    },
    data: {
      installed: true,
      updatedAt: dateStr,
    },
  })
  return plugin
}

export const markAsUninstalled = async id => {
  const dateStr = Math.floor(new Date().getTime() / 1000).toString()

  const plugin = await prisma.plugin.update({
    where: {
      id,
    },
    data: {
      installed: false,
      updatedAt: dateStr,
    },
  })
  return plugin
}
