import React from 'react'
import styles from './AllFeaturesSection.module.css' // Import our stylesheet
import themeStyles from '../../theme.module.css'

const FeatureCard = ({ title, items }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <ul className={styles.featuresList}>
        {items.map((item, index) => (
          <li key={index} className={styles.featureItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

const AllFeaturesSection = () => {
  // You can fetch these details from an API or define them here
  const title = 'Features That Will Blow Your Mind'
  const subtitle =
    "We've spent years developing the most robust and stable SaaS features to make your apps stand out from the rest."
  const featuresArray = [
    {
      title: 'BOOK APPOINTMENTS',
      items: [
        'Choose Professional',
        'Date Picker',
        'Time Slot Picker',
        'Appointments Dashboard',
        'Available Slots',
        'Confirm Appointments',
      ],
    },
    {
      title: 'MANAGE APPOINTMENTS',
      items: [
        'View Upcoming Appointments',
        'Confirm Appointment',
        'Edit Appointment',
        'Reschedule Appointment',
        'Add Notes to Appointment',
        'Cancel Appointment',
      ],
    },
    {
      title: 'APPOINTMENTS',
      items: [
        'Remote Appointments',
        'Online Appointments Support',
        'Audio Only Online Appointments',
        'Video Online Appointments',
        'Support for Notes',
        'Ratings & Reviews',
      ],
    },
    {
      title: 'REAL-TIME CHAT',
      items: [
        'Photo Messages',
        'Video Messages',
        'Audio Messages',
        'Typing Indicator',
        'In-Reply To functionality',
        'Unread Messages',
      ],
    },
    {
      title: 'BROWSE & SEARCH',
      items: [
        'Browse Vendors',
        'Browse Professionals',
        'Browse Categories',
        'View Professional Specialties',
        'View Profile',
        'Search',
      ],
    },
    {
      title: 'ONBOARDING',
      items: [
        'Email & Password Registration',
        'SMS Phone Auth',
        'Sign-in with Facebook',
        'Sign-in with Apple',
        'Sign-in with Google',
        'Reset Password',
      ],
    },
    {
      title: 'PROFILE & SETTINGS',
      items: [
        'My Profile Screen',
        'Edit Account Details',
        'Edit Settings',
        'Block / Unblock Users',
        'Logout',
      ],
    },
    {
      title: 'MOBILE INFRA',
      items: [
        'Dark Mode Support',
        'Push Notifications',
        'Multi-language support (RTL)',
        'Localization',
        'Functional Components & Hooks',
      ],
    },
    {
      title: 'BACKEND INTEGRATION',
      items: [
        'Firebase Auth',
        'Firebase Firestore',
        'Firebase Storage',
        'Firebase Messaging',
        'Firebase Functions',
      ],
    },
  ]

  return (
    <div className={`${themeStyles.sectionContainer} ${styles.container}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.featureListContainer}>
        {featuresArray.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            items={feature.items}
          />
        ))}
      </div>
    </div>
  )
}

export default AllFeaturesSection
