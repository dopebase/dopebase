import React from 'react'
import { AdminAppContainer } from '../../../../admin/screens/AdminAppContainer'
import { getCurrentUser } from '../../../../admin/utils/getCurrentUserByCookies'

export default async function Page({
  params,
  searchParams,
}: {
  params: { routes: string }
  searchParams: any
}) {
  const user = await getCurrentUser()
  const { routes } = params

  // const searchParams = useSearchParams()
  // const search = searchParams.get('sdsadsa')
  // console.log('search', search)
  const pluginID = routes[0]

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

  const Component = (
    await import(
      `../../../../plugins/` +
        `${pluginID}/admin/pages/${routes.slice(1).join('/')}`
    )
  ).default

  if (user && user.role !== 'admin') {
    return <>Access denied.</>
  }
  return (
    <AdminAppContainer params={params} searchParams={searchParams}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Component />
      </React.Suspense>
    </AdminAppContainer>
  )
}
