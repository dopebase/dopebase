import { findOne, insertOne, updateOne } from '../../../core/db'
const { v4: uuidv4 } = require('uuid')

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
      created_at: Math.floor(new Date().getTime() / 1000).toString(),
    })
    return insert
  }
  const id = themeSettings ? themeSettings.id : uuidv4()

  const updatedTheme = await updateOne('settings', id, {
    value: theme,
  })
  return updatedTheme
}
