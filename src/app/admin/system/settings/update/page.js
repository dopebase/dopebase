import React from 'react'
import { redirect } from 'next/navigation'
import { AdminAppContainer } from '../../../../../admin/screens/AdminAppContainer'
import SettingsUpdateView from '../../../../../admin/screens/settings/update'
import { getCurrentUser } from '../../../../../admin/utils/getCurrentUserByCookies'

export default async props => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AdminAppContainer>
      <SettingsUpdateView />
    </AdminAppContainer>
  )
}
