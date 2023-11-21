import React from 'react'
import ReactMarkdown from 'react-markdown'
import { unescapeString } from '../../../../utils'
import styles from '../../theme.module.css'

const HeaderSection = ({ title, description }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.description}>
        {description && (
          <ReactMarkdown>{unescapeString(description)}</ReactMarkdown>
        )}
      </div>
      <div className={styles.ctaContainer}>
        <a
          href={`#pricing`}
          target="_blank"
          className={`${styles.ctaPrimary} ${styles.cta}`}>
          Get Started
        </a>
        {/* <a
          href="https://github.com/dopebase/dopebase"
          target="_blank"
          className={`${styles.ctaSecondary} ${styles.cta}`}>
          <i class="fa fa-github"></i> Preview Demo
        </a> */}
      </div>
      <div className={styles.previewContainer}>
        <img src="./assets/dopebase-preview.png" className={styles.preview} />
      </div>
    </div>
  )
}

export default HeaderSection
