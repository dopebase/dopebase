import React from 'react'
import styles from './PricingSection.module.css'

const PricingCheckmark = () => {
  return (
    <div className={styles.pricingCheckmark}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        className="h-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
  )
}

const PricingSection = ({}) => {
  const title = 'Ready to launch your SaaS business this weekend?'
  const subtitle =
    'Get started with our free plan and upgrade once you are ready to commit.'

  return (
    <div className={styles.pricingSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <h3 className={styles.sectionDescription}>{subtitle}</h3>

      <div className={styles.pricingContainer}>
        <div className={`${styles.pricingPlan} ${styles.basicPlan}`}>
          <div className={styles.titleContainer}>
            <h3 className={styles.planTitle}>Basic</h3>
            <p className={styles.planDescription}>
              Description of your Basic plan
            </p>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.price}>$19</span>
            <span className={styles.priceDescription}>/monthly</span>
          </div>
          <div className={styles.featuresContainer}>
            <ul>
              <li>
                <PricingCheckmark />
                <span>Basic Analytics</span>
              </li>
              <li>
                <PricingCheckmark />
                <span>Unlimited Traffic</span>
              </li>
              <li>
                <PricingCheckmark />
                <span>10GB Storage</span>
              </li>
              <li>
                <PricingCheckmark />
                <span>Basic Support</span>
              </li>
            </ul>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Get Started</button>
          </div>
        </div>
        <div className={`${styles.pricingPlan} ${styles.proPlan}`}>
          <div className={styles.titleContainer}>
            <h3 className={styles.planTitle}>Pro</h3>
            <p className={styles.planDescription}>
              Description of your Pro plan
            </p>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.price}>$99</span>
            <span className={styles.priceDescription}>/monthly</span>
          </div>
          <div className={styles.featuresContainer}>
            <ul>
              <li>
                <PricingCheckmark />
                <span>Advanced Analytics</span>
              </li>
              <li>
                <PricingCheckmark />
                <span>Unlimited Traffic</span>
              </li>
              <li>
                <PricingCheckmark />
                <span>100GB Storage</span>
              </li>
              <li>
                <PricingCheckmark />
                <span>Chat Support</span>
              </li>
            </ul>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Get Started</button>
          </div>
        </div>
        <div className={`${styles.pricingPlan} ${styles.enterprisePlan}`}>
          <div className={styles.titleContainer}>
            <h3 className={styles.planTitle}>Enterprise</h3>
            <p className={styles.planDescription}>
              Description of your Enterprise plan
            </p>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.price}>$999</span>
            <span className={styles.priceDescription}>/monthly</span>
          </div>
          <div className={styles.featuresContainer}>
            <ul>
              <li>
                <PricingCheckmark />
                <span>Basic Analytics</span>
              </li>
              <li>
                <PricingCheckmark />
                <span>Unlimited Traffic</span>
              </li>
              <li>
                <PricingCheckmark />
                <span>10GB Storage</span>
              </li>
              <li>
                <PricingCheckmark />
                <span>In-person Support</span>
              </li>
            </ul>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingSection
