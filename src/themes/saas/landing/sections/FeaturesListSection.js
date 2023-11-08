// FeaturesListSection.js

import React from 'react'
import styles from './FeaturesListSection.module.css'
import themeStyles from '../../theme.module.css'

const Feature = ({ title, description }) => {
  return (
    <div className={styles.feature}>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  )
}

const FeaturesListSection = ({ features, title, subtitle }) => {
  return (
    <section
      className={`${themeStyles.sectionContainer} ${styles.featuresListSection}`}>
      <div className={styles.header}>
        <div className={styles.titlesContainer}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.coverImageContainer}>
          <img
            className={styles.coverImage}
            src="/assets/dopebase-preview.png"
            alt="Cover"
          />
        </div>
      </div>

      <div className={styles.features}>
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturesListSection
