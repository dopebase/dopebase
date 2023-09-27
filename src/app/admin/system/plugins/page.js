'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useCurrentUser from '../../../../modules/auth/hooks/useCurrentUser'
import { AdminAppContainer } from '../../../../admin/screens/AdminAppContainer'
import { PluginsListView } from '../../../../admin/screens/plugins/PluginsListView'

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
        <PluginsListView />
      </AdminAppContainer>
    )
  }
  return <>Access denied.</>
}
