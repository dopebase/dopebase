import { NextResponse, NextRequest } from 'next/server'
import multer from 'multer'
import fs, { mkdirSync } from 'fs'
import { writeFile } from 'fs/promises'
import initMiddleware from '../../../../system/media/initMiddleware'
import { websiteURL } from '../../../../config/config'

const firebaseAdmin = require('firebase-admin')
const serviceAccount = '' // require('../../config/firebase/dopebase-9b89b-firebase-adminsdk-1e5r9-a0bb4c1a43.json')
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

type NextApiRequestWithFormData = NextRequest & {
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

export async function POST(req: NextRequest) {
  console.log('tttttttt')
  await multerAny(req)

  // const blob: BlobCorrected = req.files[0]

  console.log(req)

  try {
    const data = await req.formData()
    console.log(data)

    const photos = data.get('photos')
    console.log('Photos: ', photos)
    console.log(data[0])
    const files = photos && photos.length ? photos : [photos]
    console.log('Files: ', files)

    if (!files) {
      return NextResponse.json(
        {
          status: false,
          message: 'No files were sent to server.',
        },
        { status: 200 },
      )
    }
    const uploadData = await uploadPhotosToHostingServer(files)

    return NextResponse.json({ data: uploadData }, { status: 200 })

    //console.log(dataToBeUploadedToFirebase)

    // We store all user generated files in Firebase Storage:
    // uploadMediaToFirebase(dataToBeUploadedToFirebase, data => {
    //   return NextResponse.json(
    //     {
    //       status: true,
    //       message: 'Files are uploaded',
    //       data,
    //     },
    //     { status: 200 },
    //   )
    // })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: 'No files were sent to server.',
      },
      { status: 500 },
    )
  }
}

const uploadMediaToFirebase = async (files, callback) => {
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

const uploadPhotosToHostingServer = async files => {
  // const files = db.collection('files') - use this if you want to save the paths to the database
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
