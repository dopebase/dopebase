import { NextResponse } from 'next/server'
import { createThread } from '../lib/ticketManager'

export async function POST(req) {
  const body = await req.json()

  if (!body) {
    return NextResponse.json({}, { status: 500 })
  }
  const { email, message, name, isPublic } = body
  if (email?.length > 0 && message?.length > 0) {
    // sendEmail(
    //   'support@yourzendeskaccount.zendesk.com',
    //   {
    //     content: message,
    //     type: 'html',
    //   },
    //   `Support Request ${website}`,
    //   email,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   { overridenFromName: name },
    // )

    await createThread(email, name, message, `Support Request `, isPublic)

    return NextResponse.json({ success: true }, { status: 200 })
  } else {
    return NextResponse.json({ error: true }, { status: 200 })
  }
}
