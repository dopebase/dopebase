import { NextResponse } from 'next/server'
import { deleteOne } from '../../../../../core/db'

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body || !body.id) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    const id = body.id
    console.log(`Deleting ${id}`)
    await deleteOne('posts', id)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 200 })
  }
}
