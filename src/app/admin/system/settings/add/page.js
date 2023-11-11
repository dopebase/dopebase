import React from 'react'
import { redirect } from 'next/navigation'
import { AdminAppContainer } from '../../../../../admin/screens/AdminAppContainer'
import SettingsAddView from '../../../../../admin/screens/settings/add'
import { getCurrentUser } from '../../../../../admin/utils/getCurrentUserByCookies'

export default async props => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AdminAppContainer>
      <SettingsAddView />
    </AdminAppContainer>
  )
}
