import React from 'react'
import { getCurrentUser } from '../../../../admin/utils/getCurrentUserByCookies'
import { ContactView } from '../../components/contact'
import styles from '../../theme.module.css'

export default async function Page({ params, searchParams }) {
  const user = await getCurrentUser()

  return (
    <div className={`${styles.dopebase} dopebase dopebase-theme`}>
      <div className={`${styles.container} container`}>
        <ContactView
          prefilledEmail={user?.email ?? ''}
          prefilledName={user?.first_name ?? ''}
        />
      </div>
    </div>
  )
}
