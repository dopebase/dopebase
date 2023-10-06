import React, { memo } from 'react'
import { websiteURL, websiteName } from '../../config/config'
import UserProfileMenu from './navigation/UserProfileMenu'
import styles from '../themes/admin.module.css'

const AdminHeader: React.FC = memo(() => {
  return (
    <nav className={styles.adminNavbar}>
      <a href={`${websiteURL}admin`} className={styles.headerTitle}>
        {websiteName}
      </a>
      <UserProfileMenu />
    </nav>
  )
})

export default AdminHeader
