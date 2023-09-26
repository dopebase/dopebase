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
