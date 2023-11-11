'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './PricingSection.module.css'
import themeStyles from '../../theme.module.css'
import { authPost } from '../../../../modules/auth/utils/authFetch'

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

const MostPopularIcon = () => {
  return (
    <div className={styles.mostPopularIcon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
        class="h-4 w-4 mr-1">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
      </svg>
    </div>
  )
}

const PricingPlan = ({ plan, index }) => {
  const [selectedPlan, setSelectedPlan] = useState(false)

  const features = detailed_description.split('\n')

  const handleCheckout = async plan => {
    const router = useRouter()

    setSelectedPlan(plan)
    if (!user) {
      return router.push('/login')
    }
    if (subscription) {
      return router.push('/account')
    }
    try {
      const { sessionId } = await authPost('/api/create-checkout-session', {
        price,
      })
      // const stripe = await getStripe()
      // stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      return alert(error?.message)
    } finally {
      setSelectedPlan(false)
    }
  }

  return (
    <div
      className={`${styles.pricingPlan} ${styles[plan.id]}  ${
        index === 1 ? styles.proPlan : ''
      }`}>
      <div className={styles.titleContainer}>
        <h3 className={styles.planTitle}>{plan.title}</h3>
        {index === 1 && (
          <p className={styles.mostPopular}>
            <MostPopularIcon /> Most Popular
          </p>
        )}
        <p className={styles.planDescription}>{plan.basic_description}</p>
      </div>
      <div className={styles.priceContainer}>
        <span className={styles.price}>{plan.price}</span>
        <span className={styles.priceDescription}>/{plan.billing_cycle}</span>
      </div>
      <div className={styles.featuresContainer}>
        <ul>
          {features.map(feature => (
            <li>
              <PricingCheckmark />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Get Started</button>
      </div>
    </div>
  )
}

const Pricing = ({ user, subscription, plans }) => {
  const title = 'Ready to launch your SaaS business this weekend?'
  const subtitle =
    'Get started with our free plan and upgrade once you are ready to commit.'

  return (
    <section
      className={`${themeStyles.sectionContainer} ${styles.pricingSection}`}>
      <a id="pricing" href="#pricing"></a>
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
            <div className={styles.mostPopularTitleContainer}>
              <h3 className={styles.planTitle}>Pro</h3>
              <p className={styles.mostPopular}>
                <MostPopularIcon /> Most Popular
              </p>
            </div>
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
    </section>
  )
}

export default Pricing
