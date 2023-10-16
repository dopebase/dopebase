/*

Anatomy of a theme:
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

const fs = require('fs').promises

import { getCurrentTheme, setCurrentTheme } from './db'

const getAllThemes = async () => {
  // TODO: This should return only installed plugins for the hooks system, but quite tricky since we need access to database (this is needed client side)
  const themesDirectory = `${process.cwd()}/src/themes`
  console.log(themesDirectory)
  // Read all directories in the themes directory
  const themes = await fs.readdir(themesDirectory)
  console.log(themes)
  // Filter out non-directories
  const directories = await Promise.all(
    themes.map(async theme => {
      const stat = await fs.stat(`${themesDirectory}/${theme}`)
      return stat.isDirectory() ? theme : null
    }),
  )
  console.log(directories)
  // Read metadata for each theme
  const themesMetadata = await Promise.all(
    directories.map(async theme => {
      const metadata = await fs.readFile(
        `${themesDirectory}/${theme}/metadata.json`,
      )
      return JSON.parse(metadata)
    }),
  )
  console.log(themesMetadata)
  // Return themes metadata
  return themesMetadata
}

export { getAllThemes, setCurrentTheme, getCurrentTheme }
