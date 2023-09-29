import { NextResponse } from 'next/server'
import { isInstalled } from '../../../../system/plugins'

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
    `./../../../../plugins` + `/${pluginID}/api/${pathItems.slice(4).join('/')}`
  )
  const { GET } = file
  return await GET(req)
}
