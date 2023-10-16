import { findOne, insertOne, updateOne } from '../../../core/db'

export const getCurrentTheme = async () => {
  const theme = await findOne('settings', { name: 'theme' })
  if (!theme) {
    // if there's no theme set, use the classic one
    await setCurrentTheme('classic')
    return await getCurrentTheme()
  }
  return theme.value
}

export const setCurrentTheme = async theme => {
  const themeSettings = await findOne('settings', { name: 'theme' })
  if (!themeSettings) {
    // there's no theme set, so create one
    const insert = await insertOne('settings', {
      name: 'theme',
      value: theme,
      createdAt: Math.floor(new Date().getTime() / 1000).toString(),
    })
    return insert
  }
  const updatedTheme = await updateOne('settings', themeSettings.id, {
    value: theme,
  })
  return updatedTheme
}
