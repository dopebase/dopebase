import React, { useMemo } from 'react'
import NavigationMenu from '../../components/NavigationMenu'
import ReactMarkdown from 'react-markdown'

import MetaHeader from '../../components/MetaHeader'
import { formatTimestamp, unescapeString } from '../../../../utils'
import Footer from '../../components/Footer'
import readTimeEstimate from '../../../../utils/readTimeEstimate'
import { websiteURL } from '../../../../config/config'

const NavigationMenu2 = () => {
  return (
    <a
      className="main-menu-item"
      target="_blank"
      href="https://github.com/dopebase/dopebase">
      Github
    </a>
  )
}

export default NavigationMenu2
