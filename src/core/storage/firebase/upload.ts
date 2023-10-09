import fs from 'fs'
import { websiteURL } from '../../../config/config'

const firebaseAdmin = require('firebase-admin')
const serviceAccount = '' // require('../../config/firebase/dopebase-9b89b-firebase-adminsdk-1e5r9-a0bb4c1a43.json')
const dbURL = 'https://dopebase-9b89b.firebaseio.com'
const bucketURL = 'dopebase-9b89b.appspot.com'
const { v4: uuidv4 } = require('uuid')

export const upload = async (files, callback) => {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      databaseURL: dbURL,
      storageBucket: bucketURL,
    })
  }
  const firebaseStorage = firebaseAdmin.storage()

  var bucket = firebaseStorage.bucket()
  // Uncomment this to upload data to the server instead
  const dataToBeUploadedToFirebase = []

  files.forEach(file => {
    // push file details
    const path = file.path.replace('public/', '')
    // console.log(file)

    const data = fs.readFileSync(file.path)
    dataToBeUploadedToFirebase.push({
      name: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: websiteURL + path,
      relativePath: path,
      data: data,
    })
  })

  Promise.all(
    dataToBeUploadedToFirebase.map(media => {
      const uuid = uuidv4()
      return new Promise((resolve, reject) => {
        bucket
          .file(media.name)
          .save(media.data, {
            uploadType: 'media',
            metadata: {
              contentType: media.mimetype,
              firebaseStorageDownloadTokens: uuid,
            },
          })
          .then(
            response => {
              // console.log(response)
              const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${media.name}?alt=media&token=${uuid}`
              const myData = {
                url,
                name: media.name,
                mimetype: media.mimetype,
              }
              resolve(myData)
            },
            err => {
              reject(err)
            },
          )
      })
    }),
  ).then(data => {
    callback(data)
  })
}
