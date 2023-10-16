import { NextResponse } from 'next/server'
import { setCurrentTheme } from '../../../../../system/themes'
import { isAdminAuthenticated } from '../../../../../admin/utils/isAdminAuthenticated'

export async function POST(req) {
  console.log('POST /api/system/themes/use')
  const res = NextResponse

  const isAdmin = await isAdminAuthenticated(req)
  if (!isAdmin) {
    return res.json({ error: 'Access denied' }, { status: 400 })
  }
  const url = new URL(req.url)
  const theme = url.searchParams.get('theme')

  const success = await setCurrentTheme(theme)

  return res.json(
    {
      success: success,
    },
    { status: 200 },
  )
}
