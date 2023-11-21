import React, { Suspense } from 'react'
import NavigationMenu from '../components/NavigationMenu'
import Footer from '../components/Footer'
import MetaHeader from '../components/MetaHeader'
import HeaderSection from '../landing/sections/HeaderSection'
import BicameralSection from '../landing/sections/BicameralSection'
import FeaturesListSection from '../landing/sections/FeaturesListSection'
import AllFeaturesSection from '../landing/sections/AllFeaturesSection'
import PricingSection from '../landing/sections/PricingSection'
import TestimonialSection from '../landing/sections/TestimonialSection'
import GenericSocialProofSection from '../landing/sections/GenericSocialProofSection'

import styles from '../theme.module.css'

const seoConfig = {
  seoDescription:
    'Open-source WordPress alternative. Website builder, app maker, blog builder, and more.',
  seoTitle: 'SaaSBase | The SaaS Starter Kit',
  seoKeyword:
    'reactjs, nextjs, saas, saas starter kit, app maker, website builder, ai, machine learning, artificial intelligence, app development, software development, web development, code, coding, programming',
  coverPhotoURL:
    'https://firebasestorage.googleapis.com/v0/b/dopebase-9b89b.appspot.com/o/react-native-booking-appointments-app-template.png?alt=media&amp;token=8c0ca965-e74d-4bc4-99b1-b274ad6803d6',
}

const HomePage = ({}) => {
  return (
    <div className={`${styles.dopebase} dopebase dopebase-theme`}>
      <div className={`${styles.container} container`}>
        <MetaHeader
          seoDescription={seoConfig.seoDescription}
          seoTitle={seoConfig.seoTitle}
          seoKeyword={seoConfig.seoKeyword}
          photo={seoConfig?.coverPhotoURL}
          websiteName={`DopeSaaS`}
        />
        <NavigationMenu />
        <HeaderSection
          title={`NextJS SaaS starter kit \n to launch ideas in a weekend`}
          description={`Join 10,000+ developers and entrepreneurs that use DopeSaaS to launch their SaaS ideas in a matter of days instead of years, at a fraction of the cost. DopeSaaS is a fully functional source code written in React and NextJS that will save you months of development and tens of thousands of dollars.`}
        />
        {/* <BicameralSection
          title={`Themes & Plugins`}
          description={`DopeSaaS comes with a set of UI themes and plugins that you can use to build your website or mobile app with or without code. You can also build your own custom themes and plugins for maximum flexibility.`}
          items={``}
          interactiveChild={null}
        /> */}
        <AllFeaturesSection />
        <FeaturesListSection
          title="Production Ready Code"
          subtitle="Get access to a fully functional codebase that has been developed by engineers with experience in companies such as Facebook and Twitter. Scale to million of users from day 1."
          features={[
            {
              title: 'Modern Tech-Stack',
              description:
                'DopeSaaS is built with React and NextJS 14. It also supports multiple databases such as Firebase, Supabase, PostgreSQL, etc.',
            },
            {
              title: 'Production Ready',
              description:
                'No need to waste time and money on wireframing, prototyping, designing, developing, testing, bug fixing, optimizing, scaling.',
            },
            {
              title: 'Clean Code',
              description:
                "The code is simple, clean, and well-commented. Most importantly, it's fully customizable and easy to extend. It's been developed by engineers with experience in companies such as Facebook and Twitter.",
            },
            {
              title: 'Plugins & Themes',
              description:
                'Built on top of the modern AI driven Dopebase platform, DopeSaaS comes with a set of plugins and themes that you can use to build your website or mobile app with or without code.',
            },
          ]}
        />
        <PricingSection />
        <GenericSocialProofSection />
        <TestimonialSection />
        <BicameralSection
          title={`AI-Powered Content Innovation`}
          description={`DopeSaas is not just a starter kit - it's a leap forward. Leveraging AI technologies, it transforms the way you build and manage content and media offering smart suggestions and automating routine tasks to free up your creativity and focus on what matters.`}
          items={[
            {
              title: `AI Generated Content`,
              description: `Generate article ideas, summaries, captions, tags, social posts, content and even entire articles by harnessing the power of LLMs and AI.`,
            },
            {
              title: `AI SEO Strategy`,
              description:
                'Leverage AI to auto-optimize all your pages for SEO to improve rankings and traffic.',
            },
            {
              title: `Generative AI Images`,
              description: `Generate any type of image by using GenAI. Create logos, banners, social media posts, and more directly in Dopebase.`,
            },
            {
              title: `AI Powered Text Editor`,
              description: `Dopebase's AI-powered text editor helps you write better content by offering smart suggestions and automating routine tasks such as keeping your articles up to date.`,
            },
          ]}
          interactiveChild={null}
        />
        {/* <BicameralSection
          title={`Headless & Backendless Architecture`}
          description={`Dopebase is a set of modules and SDKs that can be used together or independently. It can be used as a headless CMS, a backend for your mobile app, or a full-stack website builder.`}
          items={``}
          interactiveChild={null}
        />
        <BicameralSection
          title={`Scale to Millions of Users from Day 1`}
          description={`Battled tested by millions of users, Dopebase is built to scale. It's the perfect backend for your blog, mobile app or any website.`}
          content={``}
          interactiveChild={null}
        />
        <BicameralSection
          title={`No Code? No Problem!`}
          description={`Dopebase is a no-code app maker that also gives you access to the code if you want it. You can build your website or mobile app without writing a single line of code.`}
          content={``}
          interactiveChild={null}
        />
        <BicameralSection
          title={`Client SDKs & APIs`}
          description={`Dopebase comes with a set of client SDKs and APIs that allow you to build your own custom apps and websites. It's the perfect backend for your mobile app or website.`}
          content={``}
          interactiveChild={null}
        />
        <BicameralSection
          title={`Backend & Database Agnostic`}
          description={`Designed to work with any database, Dopebase can seamlessly integrate with your existing backend, Firebase, Supabase, PostgreSQL, etc.`}
          content={``}
          interactiveChild={null}
        />
        <Footer /> */}
      </div>
    </div>
  )
}

export default HomePage
