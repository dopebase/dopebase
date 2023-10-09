import { mkdirSync } from 'fs'
import { writeFile } from 'fs/promises'
import { websiteURL } from '../../../config/config'
const { v4: uuidv4 } = require('uuid')

export const upload = async files => {
  console.log('Uploading files to hosting server')
  try {
    console.log(files)
    if (!files) {
      return null
    }
    let data = []

    for (var i = 0; i < files.length; i++) {
      const file = files[i]
      // move photo to uploads directory
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // With the file data in the buffer, you can do whatever you want with it.
      // For this, we'll just write it to the filesystem in a new location
      const folder = 'public/uploads/' + uuidv4()
      const path = folder + '/' + file.name
      await mkdirSync(folder, { recursive: true })
      await writeFile(path, buffer)

      console.log(`File uploaded to ${path}`)

      // push file details
      data.push({
        name: file.name,
        mimetype: file.mimetype,
        size: file.size,
        url: websiteURL + path.replace('public/', ''),
        relativePath: path,
      })
    }
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}
