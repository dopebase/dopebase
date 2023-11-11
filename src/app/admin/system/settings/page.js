import React from 'react'
import { redirect } from 'next/navigation'
import { AdminAppContainer } from '../../../../admin/screens/AdminAppContainer'
import SettingsListView from '../../../../admin/screens/settings/list'
import { getCurrentUser } from '../../../../admin/utils/getCurrentUserByCookies'

export default async props => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  // already logged in, so redirect
  return (
    <AdminAppContainer>
      <SettingsListView />
    </AdminAppContainer>
  )
}
