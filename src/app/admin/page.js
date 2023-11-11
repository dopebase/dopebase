import React, { Suspense } from 'react'
import { AdminAppContainer } from '../../admin/screens/AdminAppContainer'

export default async function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminAppContainer />
    </Suspense>
  )
}
