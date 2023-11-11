import { NextResponse } from 'next/server'
import { getOne } from '../../../../../core/db'

export async function GET(req) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  const result = await getOne('settings', id)
  if (result) {
    return NextResponse.json(result, { status: 200 })
  }
  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}
