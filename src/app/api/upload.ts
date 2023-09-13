import type { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import fs from 'fs'
import initMiddleware from '../../server/initMiddleware'
import { rootURL } from '../../config'

const firebaseAdmin = require('firebase-admin')
const serviceAccount = require('../../config/firebase/dopebase-9b89b-firebase-adminsdk-1e5r9-a0bb4c1a43.json')
const dbURL = 'https://dopebase-9b89b.firebaseio.com'
const bucketURL = 'dopebase-9b89b.appspot.com'

const { v4: uuidv4 } = require('uuid')

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
      const uuid = uuidv4()
      const fileExt = file.originalname.split('.').pop()
      return cb(null, `${uuid}.${fileExt}`)
    },
  }),
})

// for parsing multipart/form-data
// note that Multer limits to 1MB file size by default
const multerAny = initMiddleware(upload.any())

type NextApiRequestWithFormData = NextApiRequest & {
  files: any[]
}

type BlobCorrected = Blob & {
  buffer: Buffer
}

// Doc on custom API configuration:
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (
  req: NextApiRequestWithFormData,
  res: NextApiResponse,
) => {
  await multerAny(req, res)

  // const blob: BlobCorrected = req.files[0]

  try {
    const { files } = req

    if (!files) {
      res.send({
        status: false,
        message: 'No files were sent to server.',
      })
    } else {
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
          url: rootURL + path,
          relativePath: path,
          data: data,
        })
      })

      // console.log(dataToBeUploadedToFirebase)

      // We store all user generated files in Firebase Storage:
      uploadMediaToFirebase(dataToBeUploadedToFirebase, data => {
        // return response
        res.send({
          status: true,
          message: 'Files are uploaded',
          data,
        })
      })

      // // return response
      // res.send({
      //   status: true,
      //   message: 'Files are uploaded',
      //   data,
      // })
    }
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const uploadMediaToFirebase = async (medias, callback) => {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      databaseURL: dbURL,
      storageBucket: bucketURL,
    })
  }
  const firebaseStorage = firebaseAdmin.storage()

  var bucket = firebaseStorage.bucket()

  Promise.all(
    medias.map(media => {
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
