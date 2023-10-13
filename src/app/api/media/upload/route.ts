import { NextResponse, NextRequest } from 'next/server'
import multer from 'multer'
import initMiddleware from '../../../../system/media/initMiddleware'
import { upload } from '../../../../core/storage'

const { v4: uuidv4 } = require('uuid')

const uploadMulter = multer({
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
const multerAny = initMiddleware(uploadMulter.any())

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
  console.log('Uploading files...')
  await multerAny(req)

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
    const uploadData = await upload(files)

    return NextResponse.json({ data: uploadData }, { status: 200 })
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
