import { NextResponse } from 'next/server'
import { uninstallPlugin } from '../../../../../system/plugins'
import { isAdminAuthenticated } from '../../../../../admin/utils/isAdminAuthenticated'

export async function POST(req) {
  console.log('POST /api/system/plugins/install/:id')
  const res = NextResponse

  const isAdmin = await isAdminAuthenticated(req)
  if (!isAdmin) {
    return res.json({ error: 'Access denied' }, { status: 400 })
  }
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  const success = await uninstallPlugin(id)

  return res.json(
    {
      success: success,
    },
    { status: 200 },
  )
}
