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
  const title = 'Build in a weekend'
  const subtitle =
    "We've spent years developing the most robust and stable SaaS features to make your apps stand out from the rest."
  const featuresArray = [
    {
      title: 'Authentication & Users',
      items: [
        'SSR & CSR Authentication Flows',
        'OAuth Integration (Google, Facebook, Apple)',
        'JWT & Session-based Authentication',
        'User Roles & Permissions',
        'Profile Management',
        'Account Recovery & Password Reset',
      ],
    },
    {
      title: 'Subscriptions & Payments',
      items: [
        'Stripe Integration for Subscriptions',
        'PayPal Payment Gateway Support',
        'Free Trial & Freemium Models',
        'Subscription Tier Management',
        'Invoice Generation & Billing',
        'Secure Checkout Process',
      ],
    },
    {
      title: 'Backend Integration',
      items: [
        'Firebase Integration (Auth, Firestore, Functions)',
        'PostgreSQL / MongoDB Support / Prisma',
        'API Routes with Next.js',
        'REST API Integration',
        'Serverless Functions Deployment',
        'Data Caching & Optimization',
      ],
    },
    {
      title: 'Notifications & Communication',
      items: [
        'Email Notification System',
        'SMS Alerts with Twilio Integration',
        'Real-Time WebSockets for Chat',
        'Push Notifications for Web and Mobile',
        'In-app Alerts & Messages',
        'Feedback & Contact Forms',
      ],
    },
    {
      title: 'Content Management & SEO',
      items: [
        'CMS Integration for Content Management',
        'SEO Optimization Tools',
        'Blog and Article Publishing',
        'Meta Tags and Structured Data Markup',
        'Sitemap Generation and Submission',
        'Content Caching for Faster Load Times',
      ],
    },
    {
      title: 'Theming & UI/UX',
      items: [
        'Customizable Theme Options',
        'Responsive Design for All Devices',
        'Accessibility & Internationalization',
        'Reusable Component Library',
        'CSS-in-JS with Styled Components',
        'Dark Mode & Color Schemes',
      ],
    },
    {
      title: 'Performance Optimizations',
      items: [
        'Image Optimization with Next.js',
        'Lazy Loading & Code Splitting',
        'SEO Best Practices',
        'Server-Side Rendering (SSR) & Static Generation (SSG)',
        'Caching Strategies',
        'Analytics & Performance Monitoring',
      ],
    },
    {
      title: 'Data Analytics & Reporting',
      items: [
        'Integrated Dashboard for Analytics',
        'Customizable Reports & Metrics',
        'User Behavior Tracking',
        'Integration with Analytics Tools like Google Analytics',
        'Data Visualization with Charts and Graphs',
        'Exportable Data Reports',
      ],
    },
    {
      title: 'Scalability & Reliability',
      items: [
        'Microservices Architecture',
        'Load Balancing & Auto-Scaling',
        'High Availability Configuration',
        'Fault Tolerance and Redundancy',
        'Performance Monitoring Tools',
        'Database Sharding & Replication',
      ],
    },
    {
      title: 'Customer Support & CRM Integration',
      items: [
        'Live Chat Support Integration',
        'Ticketing System for User Issues',
        'CRM Integration (e.g., Salesforce, HubSpot)',
        'Automated Response Systems',
        'User Feedback Collection',
        'Knowledge Base & FAQ Section',
      ],
    },
    {
      title: 'Multi-Tenancy & Organization Management',
      items: [
        'Multi-Tenant Architecture Support',
        'Organization and Team Management Features',
        'Custom Domains for Each Tenant',
        'Isolated Databases for Data Security',
        'Tenant-specific Customization and Settings',
        'Usage and Billing per Tenant',
      ],
    },
    {
      title: 'Internationalization & Localization',
      items: [
        'Multi-Language Support',
        'Currency and Date Format Customization',
        'Localization of Content and UI Elements',
        'Right-to-Left (RTL) Text Support',
        'Cultural Adaptations and Considerations',
        'Automated Translation Integration',
      ],
    },
    {
      title: 'Security & Compliance',
      items: [
        'SSL/TLS Encryption',
        'Data Privacy Compliance (GDPR, CCPA)',
        'Regular Security Audits & Penetration Testing',
        'Role-based Access Control (RBAC)',
        'Cross-Site Request Forgery (CSRF) Protection',
        'Data Backup and Recovery Plans',
      ],
    },
    {
      title: 'DevOps & Deployment',
      items: [
        'Docker & Kubernetes Integration',
        'CI/CD Pipeline with GitHub Actions',
        'Vercel & AWS Deployment Options',
        'Logging & Error Tracking',
        'Environment Variables & Config Management',
        'Automated Testing & Quality Assurance',
      ],
    },
    {
      title: 'Documentation & Support',
      items: [
        'Comprehensive Developer Documentation',
        'User Guides & Tutorials',
        'Community Support Forums',
        'Issue Tracking & Bug Reporting',
        'API Documentation',
        'Versioning & Release Notes',
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
