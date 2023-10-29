import { NextResponse } from 'next/server'
import { getCurrentTheme } from '../../../../../system/themes'

export async function GET(req) {
  console.log('GET /api/system/themes/getCurrent')
  const res = NextResponse
  return res.json(
    {
      selectedTheme: await getCurrentTheme(),
    },
    { status: 200 },
  )
}
