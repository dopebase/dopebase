import React from 'react'
import { AdminAppContainer } from '../../../../../admin/screens/AdminAppContainer'
import EditProfileView from '../../../../../admin/screens/profile/EditProfileView'
import { getCurrentUser } from '../../../../../admin/utils/getCurrentUserByCookies'

type Props = {}

const EditProfile: React.FC<Props> = async props => {
  const user = await getCurrentUser()
  if (user) {
    return (
      <AdminAppContainer>
        <EditProfileView user={user} />
      </AdminAppContainer>
    )
  }
  return <div>Access denied.</div>
}

export default EditProfile
