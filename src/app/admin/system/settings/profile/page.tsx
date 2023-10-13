'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useCurrentUser from '../../../../../modules/auth/hooks/useCurrentUser'
import { AdminAppContainer } from '../../../../../admin/screens/AdminAppContainer'
import EditProfileView from '../../../../../admin/screens/profile/EditProfileView'

type Props = {}

const EditProfile: React.FC<Props> = props => {
  const [user, token, loading] = useCurrentUser()
  if (loading) {
    return <div>loading</div>
  }
  if (user) {
    return (
      <AdminAppContainer>
        <EditProfileView user={user} authToken={token} />
      </AdminAppContainer>
    )
  }
  return <div>Access denied.</div>
}

export default EditProfile
