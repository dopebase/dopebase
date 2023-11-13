// @ts-nocheck
import React, { Suspense } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminMenu from '../components/AdminMenu'
import styles from '../themes/admin.module.css'
import { getCurrentUser } from '../utils/getCurrentUserByCookies'

interface AdminAppContainerProps {
  children: Node
}

export const AdminAppContainer: React.FC = async (
  props: AdminAppContainerProps,
) => {
  const user = await getCurrentUser()
  const { children } = props

  console.log('server side user', user)
  // if (user?.role === 'admin') {
  return (
    <div className={styles.admin}>
      <AdminHeader />
      <div className={styles.adminContent}>
        <div className={styles.MainMenu}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminMenu />
          </Suspense>
        </div>
        <div className={styles.MainPanel}>{children}</div>
      </div>
    </div>
  )
  // }

  return <div>Sorry, you do not have permissions to access this page.</div>
}
