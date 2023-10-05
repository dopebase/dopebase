'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { LoginView } from '../../modules/auth/components/LoginView'
import useCurrentUser from '../../modules/auth/hooks/useCurrentUser'

const Login = props => {
  const [user, token, loading] = useCurrentUser()
  const router = useRouter()

  if (loading) {
    return <></>
  }
  if (user) {
    // already logged in, so redirect
    console.log('already logged in, so redirect')
    router.push('.')
    return <></>
  }
  return <LoginView />
}

export default Login
