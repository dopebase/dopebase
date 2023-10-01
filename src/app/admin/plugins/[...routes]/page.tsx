'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useCurrentUser from '../../../../modules/auth/hooks/useCurrentUser'
import { AdminAppContainer } from '../../../../admin/screens/AdminAppContainer'
import C from '../../../../plugins/blog/admin/pages/article_categories/add'
export default function Page({ params }: { params: { routes: string } }) {
  const [user, token, loading] = useCurrentUser()
  const router = useRouter()
  const { routes } = params

  const [component, setComponent] = useState(null)

  // console.log('routes', routes)
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

  const Component = React.lazy(
    () =>
      import(
        `../../../../plugins/` + `${pluginID}/admin/pages/${routes[1]}/add`
      ),
  )

  if (user && user.role !== 'admin') {
    return <>Access denied.</>
  }

  return (
    <AdminAppContainer>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Component />
      </React.Suspense>
    </AdminAppContainer>
  )
}
