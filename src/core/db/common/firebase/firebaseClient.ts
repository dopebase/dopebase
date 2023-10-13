const admin = require('firebase-admin')
import { headers } from 'next/headers'

export function customInitApp() {
  if (admin.apps.length < 1) {
    const firebaseAdminConfig = {
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    }
    admin.initializeApp(firebaseAdminConfig)
  }
}
customInitApp()
const firestore = admin.firestore()
// firestore.settings({ ignoreUndefinedProperties: true })
export { firestore }
