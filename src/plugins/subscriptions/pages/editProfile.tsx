import React from 'react'
import { getCurrentUser } from '../../../admin/utils/getCurrentUserByCookies'
import { CustomerDashboardContainer } from '../components/CustomerDashboardContainer'
import EditProfileView from '../../../admin/screens/profile/EditProfileView'

type Props = {}

const EditProfile: React.FC<Props> = async props => {
  const user = await getCurrentUser()
  if (user) {
    return (
      <CustomerDashboardContainer>
        <EditProfileView user={user} />
      </CustomerDashboardContainer>
    )
  }
  return <div>Access denied.</div>
}

export default EditProfile
