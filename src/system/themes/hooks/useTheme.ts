//@ts-nocheck
'use client'
import { useEffect, useState } from 'react'
import { websiteURL } from '../../../config/config'
import { authFetch } from '../../../modules/auth/utils/authFetch'

export const useTheme = () => {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    async function fetchCurrentTheme() {
      try {
        const theme = localStorage.getItem('currentTheme')
        if (theme) {
          setTheme(theme)
          return
        }
        const apiURL = `${websiteURL}/api/system/themes/getCurrent`
        const response = await authFetch(apiURL)
        if (response.data?.selectedTheme) {
          setTheme(response.data.selectedTheme)
          localStorage.setItem('currentTheme', response.data.selectedTheme)
        } else {
          setTheme('classic')
          localStorage.setItem('currentTheme', 'classic')
        }
      } catch {
        setTheme('classic')
        localStorage.setItem('currentTheme', 'classic')
      }
    }

    fetchCurrentTheme()
  }, [])

  return [theme]
}
