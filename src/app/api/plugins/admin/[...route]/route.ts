import { NextResponse } from 'next/server'
import { isInstalled } from '../../../../../system/plugins'
import { isAdminAuthenticated } from '../../../../../admin/utils/isAdminAuthenticated'

export async function GET(req) {
  console.log('GET /api/plugins/test')
  const res = NextResponse
  // const { route } = req.query
  const url = new URL(req.url)

  console.log(url.pathname)

  /// example: api/plugins/a/b/c
  const pathItems = url.pathname.split('/')

  // First path item is always the identifier of the plugin
  if (pathItems?.length < 4) {
    return res.json({ error: 'Invalid route' }, { status: 400 })
  }
  const pluginID = pathItems[3]
  const installed = await isInstalled(pluginID)
  if (!installed) {
    return res.json({ error: 'Plugin not installed' }, { status: 400 })
  }

  // Find the plugin by the route
  const file = await import(
    `./../../../../../plugins` +
      `/${pluginID}/admin/api/${pathItems.slice(4).join('/')}`
  )
  const { GET } = file
  return await GET(req)
}

export async function POST(req) {
  const res = NextResponse
  // const { route } = req.query
  const url = new URL(req.url)
  console.log(`POST ${url}`)
  console.log(url.pathname)

  const isAdmin = await isAdminAuthenticated(req)
  if (!isAdmin) {
    return res.json({ error: 'Access denied' }, { status: 400 })
  }
  /// example: api/plugins/a/b/c
  const pathItems = url.pathname.split('/')

  // First path item is always the identifier of the plugin
  if (pathItems?.length < 5) {
    return res.json({ error: 'Invalid route' }, { status: 400 })
  }
  console.log(pathItems)

  const pluginID = pathItems[4]

  const installed = await isInstalled(pluginID)
  if (!installed) {
    return res.json({ error: 'Plugin not installed' }, { status: 400 })
  }

  // Find the plugin by the route
  const file = await import(
    `./../../../../../plugins` +
      `/${pluginID}/admin/api/${pathItems.slice(5).join('/')}`
  )
  const { POST } = file
  return await POST(req)
}
