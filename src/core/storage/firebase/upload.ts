const firebaseAdmin = require('firebase-admin')
const { v4: uuidv4 } = require('uuid')

export const upload = async files => {
  if (!firebaseAdmin.apps.length) {
    const firebaseAdminConfig = {
      credential: firebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID, // I get no error here
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // I get no error here
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // NOW THIS WORKS!!!),
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    }

    firebaseAdmin.initializeApp(firebaseAdminConfig)
  }
  const firebaseStorage = firebaseAdmin.storage()

  var bucket = firebaseStorage.bucket()
  // Uncomment this to upload data to the server instead
  const dataToBeUploadedToFirebase = []

  for (var i = 0; i < files.length; i++) {
    var file = files[i]
    console.log(file)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    dataToBeUploadedToFirebase.push({
      name: file.name,
      mimetype: file.mimetype,
      size: file.size,
      data: buffer,
    })
  }

  var result = []

  for (var i = 0; i < dataToBeUploadedToFirebase.length; i++) {
    const media = dataToBeUploadedToFirebase[i]

    const uuid = uuidv4()
    console.log(`Uploading to Firebase Storage: ${media.name}`)
    const response = await bucket.file(media.name).save(media.data, {
      uploadType: 'media',
      metadata: {
        contentType: media.mimetype,
        firebaseStorageDownloadTokens: uuid,
      },
    })
    console.log('File uploaded to Firebase Storage')
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${media.name}?alt=media&token=${uuid}`
    const myData = {
      url,
      name: media.name,
      mimetype: media.mimetype,
    }
    result.push(myData)
  }

  return result
}
