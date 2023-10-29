'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../system/themes/hooks'

export default function Home() {
  const [theme] = useTheme()
  const [Component, setComponent] = useState(null)

  console.log('rerender')

  useEffect(() => {
    if (theme) {
      const HomePage = React.lazy(() => import(`../themes/${theme}/pages/Home`))
      setComponent(HomePage)
    } else {
      setComponent(null)
    }
  }, [theme])

  if (Component) {
    return <Component />
  }
  return null
}
