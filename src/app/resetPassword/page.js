'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import ResetPasswordView from '../../modules/auth/components/ResetPasswordView'
import useCurrentUser from '../../modules/auth/hooks/useCurrentUser'

const ResetPasswordPage = props => {
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
  return <ResetPasswordView />
}

export default ResetPasswordPage
