import { NextResponse } from 'next/server'
import { getUserByID } from '../../../core/db/users'

export async function GET(req) {
  console.log('GET /api/users?:id')
  const res = NextResponse

  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if (id?.length <= 0) {
    return res.json({}, { status: 500 })
  }

  const user = await getUserByID(id)
  if (user) {
    return res.json(
      {
        user,
      },
      { status: 200 },
    )
  }
  return res.json({ error: 'User does not exist' }, { status: 400 })
}
