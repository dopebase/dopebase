const admin = require('firebase-admin')
import { headers } from 'next/headers'

export function customInitApp() {
  if (!process.env.FIREBASE_PROJECT_ID) {
    return
  }
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
const getFirestore = () => {
  if (!process.env.FIREBASE_PROJECT_ID) {
    return
  }
  customInitApp()

  const firestore = admin.firestore()
  if (admin.apps.length < 1) {
    // firestore.settings({ ignoreUndefinedProperties: true })
  }
  return firestore
}
export { getFirestore as firestore }
