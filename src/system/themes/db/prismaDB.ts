import { findOne, updateOne } from '../../../core/db'
const { v4: uuidv4 } = require('uuid')

export const getCurrentTheme = async () => {
  const theme = await findOne('settings', { name: 'theme' })
  return theme.value
}

export const setCurrentTheme = async theme => {
  const themeSettings = await findOne('settings', { name: 'theme' })
  const id = themeSettings ? themeSettings.id : uuidv4()

  const updatedTheme = await updateOne('settings', id, {
    value: theme,
  })
  return updatedTheme
}
