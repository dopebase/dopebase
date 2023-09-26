import { NextResponse } from 'next/server'
import { getAllPluginsAndUpdateIfNeeded } from '../../../../system/plugins'
import { isAdminAuthenticated } from '../../../../admin/utils/isAdminAuthenticated'

export async function GET(req) {
  console.log('GET /api/system/plugins')
  const res = NextResponse

  const isAdmin = await isAdminAuthenticated(req)
  if (!isAdmin) {
    return res.json({ error: 'Access denied' }, { status: 400 })
  }

  const plugins = await getAllPluginsAndUpdateIfNeeded()

  if (plugins) {
    return res.json(
      {
        plugins,
      },
      { status: 200 },
    )
  }
  return res.json({ error: 'Access denied' }, { status: 400 })
}
