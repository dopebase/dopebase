import React from 'react'
import { redirect } from 'next/navigation'
import { AdminAppContainer } from '../../../../../admin/screens/AdminAppContainer'
import SettingsView from '../../../../../admin/screens/settings/view'
import { getCurrentUser } from '../../../../../admin/utils/getCurrentUserByCookies'

export default async props => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AdminAppContainer>
      <SettingsView />
    </AdminAppContainer>
  )
}
