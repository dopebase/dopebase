import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '../../../../admin/utils/isAdminAuthenticated'
import { getAllThemes, getCurrentTheme } from '../../../../system/themes'

export async function GET(req) {
  console.log('GET /api/system/themes')
  const res = NextResponse

  const isAdmin = await isAdminAuthenticated(req)
  if (!isAdmin) {
    return res.json({ error: 'Access denied' }, { status: 400 })
  }

  const themes = await getAllThemes()

  if (themes) {
    return res.json(
      {
        themes,
        selectedTheme: await getCurrentTheme(),
      },
      { status: 200 },
    )
  }
  return res.json({ error: 'Access denied' }, { status: 400 })
}
