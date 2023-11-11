import React from 'react'
import { redirect } from 'next/navigation'
import { AdminAppContainer } from '../../../../admin/screens/AdminAppContainer'
import { PluginsListView } from '../../../../admin/screens/plugins/PluginsListView'
import { getCurrentUser } from '../../../../admin/utils/getCurrentUserByCookies'

export default async props => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user) {
    // already logged in, so redirect
    return (
      <AdminAppContainer>
        <PluginsListView />
      </AdminAppContainer>
    )
  }
  return <>Access denied.</>
}
