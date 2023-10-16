'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useCurrentUser from '../../../../modules/auth/hooks/useCurrentUser'
import { AdminAppContainer } from '../../../../admin/screens/AdminAppContainer'
import { ThemesListView } from '../../../../admin/screens/themes/ThemesListView'

export default props => {
  const [user, token, loading] = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading])

  if (loading) {
    return <></>
  }

  if (user) {
    // already logged in, so redirect
    return (
      <AdminAppContainer>
        <ThemesListView />
      </AdminAppContainer>
    )
  }
  return <>Access denied.</>
}
