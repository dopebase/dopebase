const admin = require('firebase-admin')
import { headers } from 'next/headers'

const firebaseAdminConfig = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID, // I get no error here
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // I get no error here
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // NOW THIS WORKS!!!),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}

export function customInitApp() {
  if (admin.apps.length < 1) {
    admin.initializeApp(firebaseAdminConfig)
  }
}
customInitApp()
const firestore = admin.firestore()
// firestore.settings({ ignoreUndefinedProperties: true })
export { firestore }
