import React, { Suspense } from 'react'
import { getCurrentTheme } from '../system/themes'

export default async function Home() {
  const theme = await getCurrentTheme()
  const HomePage = (await import(`../themes/` + `${theme}/pages/Home`)).default

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  )
}
