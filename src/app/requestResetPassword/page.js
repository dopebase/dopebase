'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import RequestPasswordResetView from '../../modules/auth/components/RequestPasswordResetView'
import useCurrentUser from '../../modules/auth/hooks/useCurrentUser'

const RequestPasswordResetPage = props => {
  const [user, token, loading] = useCurrentUser()
  const router = useRouter()

  if (loading) {
    return <></>
  }
  if (user) {
    // already logged in, so redirect
    router.push('.')
    return <></>
  }
  return <RequestPasswordResetView />
}

export default RequestPasswordResetPage
