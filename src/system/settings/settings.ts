import { findOne } from '../../core/db'

export const websiteURL = () => {
  console.log('process.env.WEBSITE_URL', process.env.DATABASE_URL)
  return process.env.WEBSITE_URL
}

export const getSettingsValue = async key => {
  const settings = await findOne('settings', { name: key })
  return settings ? settings.value : null
}
