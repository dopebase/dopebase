import { NextResponse } from 'next/server'
import { insertOne } from '../../../../../core/db'

export async function POST(req) {
  try {
    const body = await req.json()
    console.log(body)
    await insertOne('stories', body)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 200 })
  }
}
