// GenericSocialProofSection.js

import styles from './GenericSocialProofSection.module.css'
import themeStyles from '../../theme.module.css'

const GenericSocialProofSection = () => {
  const metrics = [
    {
      number: '500,000+',
      description: 'downloads',
    },
    {
      number: '150,000+',
      description: 'developers',
    },
    {
      number: '5500+',
      description: 'paid customers',
    },
    {
      number: '$1M+',
      description: 'sales',
    },
  ]

  return (
    <section
      className={`${themeStyles.sectionContainer} ${styles.socialProofContainer}`}>
      <h2 className={styles.title}>
        The best codebase to start your next SaaS project.
      </h2>
      <p className={styles.subtitle}>
        With an incredibly vast experience, our team has shipped products to
        thousands of customers.
      </p>
      <div className={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <div key={index} className={styles.metric}>
            <div className={styles.metricNumber}>{metric.number}</div>
            <div className={styles.metricDescription}>{metric.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GenericSocialProofSection
