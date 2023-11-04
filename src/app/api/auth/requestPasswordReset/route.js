import { NextResponse } from 'next/server'
// import emailTrigger from "../../modules/emails/emailTrigger"
import { requestPasswordReset } from '../../../../core/db/auth'
const { v4: uuidv4 } = require('uuid')

export async function POST(req) {
  console.log('requestResetPassword')
  const res = NextResponse
  // Form validation
  const body = await req.json()

  if (!body) {
    return res.json({}, { status: 500 })
  }

  const { email } = body
  if (!email) {
    return res.json({ success: false }, { status: 500 })
  }

  console.log('Password reset request for email ', email)
  const data = await requestPasswordReset(email)
  if (!data?.resetURL) {
    return res.json({ success: false }, { status: 500 })
  }
  // emailTrigger.resetPasswordRequested(email, resetURL, user.id);

  return res.json({ success: true }, { status: 200 })
}
