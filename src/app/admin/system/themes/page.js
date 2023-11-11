import React from 'react'
import { redirect } from 'next/navigation'
import { AdminAppContainer } from '../../../../admin/screens/AdminAppContainer'
import { ThemesListView } from '../../../../admin/screens/themes/ThemesListView'
import { getCurrentUser } from '../../../../admin/utils/getCurrentUserByCookies'

export default async props => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  // already logged in, so redirect
  return (
    <AdminAppContainer>
      <ThemesListView />
    </AdminAppContainer>
  )
}
