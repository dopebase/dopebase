// @ts-nocheck
import React, { Suspense } from 'react'
import styles from '../../../admin/themes/admin.module.css'
import AdminHeader from '../../../admin/components/AdminHeader'
import CustomerDashboardMenu from './CustomerDashboardMenu'

interface CustomerDashboardContainerProps {
  children: Node
}

export const CustomerDashboardContainer: React.FC = async (
  props: CustomerDashboardContainerProps,
) => {
  const { children } = props

  return (
    <div className={styles.admin}>
      <AdminHeader />
      <div className={styles.adminContent}>
        <div className={styles.MainMenu}>
          <Suspense fallback={<div>Loading...</div>}>
            <CustomerDashboardMenu />
          </Suspense>
        </div>
        <div className={styles.MainPanel}>{children}</div>
      </div>
    </div>
  )
}
