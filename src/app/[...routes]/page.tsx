import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getAllPlugins, isInstalled } from '../../system/plugins'
import { componentForRoutes } from '../../system/routing/urlRouter'
import { getCurrentUser } from '../../admin/utils/getCurrentUserByCookies'
import InSiteAdminMenu from '../../admin/components/InSiteAdminMenu'

export default async function Page({
  params,
  searchParams,
}: {
  params: { routes: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  // const router = useRouter()
  const { routes } = params
  const user = await getCurrentUser()
  const isAdmin = user?.role === 'admin'

  // const [component, setComponent] = useState(null)

  const C = await componentForRoutes(routes, searchParams)
  if (!isAdmin) {
    return C
  }

  return (
    <div>
      <InSiteAdminMenu params={params} searchParams={searchParams} />
      <div>{C}</div>
    </div>
  )
  // const searchParams = useSearchParams()
  // const search = searchParams.get('sdsadsa')
  // console.log('search', search)

  // useEffect(() => {
  //   async function importPlugin() {
  //     // We have a dynamic route, so we map it to the routes associated to the matched plugin
  //     console.log('pluginID', pluginID)
  //     const viewComponent = await import(
  //       `../../../../plugins/` + `${pluginID}/admin/pages/${routes[1]}/add`
  //     )
  //     console.log(
  //       `../../../../plugins/` + `${pluginID}/admin/pages/${routes[1]}/add`,
  //     )
  //     setComponent(viewComponent.default)
  //   }
  //   importPlugin()
  // }, [])

  // const Component = React.lazy(
  //   () =>
  //     import(
  //       `../../../../plugins/` +
  //         `${pluginID}/admin/pages/${routes.slice(1).join('/')}`
  //     ),
  // )
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {/* <Component /> */}
      <div>{await componentForRoutes(routes)}</div>
    </React.Suspense>
  )
}
