import { NextResponse } from 'next/server'
import { list } from '../../../../../core/db'

export async function GET(req) {
  const res = NextResponse
  const url = new URL(req.url)
  const limit = url.searchParams.get('limit')
  const search = url.searchParams.get('search')
  console.log('GET request for list with params', { limit, search })
  const result = await list('settings', { limit, search })
  return NextResponse.json(result, { status: 200 })
}
