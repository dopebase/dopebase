import React from 'react'
import NavigationMenu from '../components/NavigationMenu'
import Footer from '../components/Footer'
import MetaHeader from '../components/MetaHeader'
import HeaderSection from '../landing/sections/HeaderSection'
import BicameralSection from '../landing/sections/BicameralSection'

const seoConfig = {
  seoDescription:
    'Open-source WordPress alternative. Website builder, app maker, blog builder, and more.',
  seoTitle: 'Dopebase | The Modern AI-Powered WordPress Alternative',
  seoKeyword:
    'reactjs, wordpress, app maker, website builder, ai, machine learning, artificial intelligence, app development, software development, web development, code, coding, programming, how to code, angular, tutorials, web, ios, Android, Swift, Flutter, React Native, Kotlin',
  coverPhotoURL:
    'https://firebasestorage.googleapis.com/v0/b/dopebase-9b89b.appspot.com/o/react-native-booking-appointments-app-template.png?alt=media&amp;token=8c0ca965-e74d-4bc4-99b1-b274ad6803d6',
}

const HomePage = ({}) => {
  return (
    <div className="dopebase dopebase-theme">
      <div className="container">
        <MetaHeader
          seoDescription={seoConfig.seoDescription}
          seoTitle={seoConfig.seoTitle}
          seoKeyword={seoConfig.seoKeyword}
          photo={seoConfig?.coverPhotoURL}
          websiteName={`Dopebase`}
        />
        <NavigationMenu />
        <HeaderSection
          title={`Build websites and mobile apps in record time`}
          description={`Dopebase is an open-source modern alternative to WordPress that integrates the latest advancements in AI to build fast & stunning websites, mobile apps, and content in record time.`}
        />
        <BicameralSection
          title={`AI-Powered Content Innovation`}
          description={`Dopebase is not just a WordPress alternative - it's a leap forward. Leveraging AI technologies, it transforms the way you build and manage content and media offering smart suggestions and automating routine tasks to free up your creativity and focus on what matters.`}
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
        <BicameralSection
          title={`Build in a weekend`}
          description={`Save years of development by starting with a lightweight open-source backend that powers all the features you need.`}
          items={[
            { title: `Authentication` },
            { title: `Content Management` },
            { title: `Payments & Subscriptions` },
            { title: `Email & SMS Marketing` },
            { title: `Push Notifications` },
            { title: `Analytics` },
            { title: `SEO` },
            { title: `Search` },
            { title: `Localization` },
            { title: `Storage` },
            { title: `Robust APIs` },
            { title: `AI Workflows` },
          ]}
          interactiveChild={null}
        />
        <BicameralSection
          title={`Themes & Modules`}
          description={`Similar to WordPress, Dopebase comes with a set of UI themes and modules that you can use to build your website or mobile app with or without code. You can also build your own custom themes and modules.`}
          items={``}
          interactiveChild={null}
        />
        <BicameralSection
          title={`Headless & Backendless Architecture`}
          description={`Dopebase is a set of modules and SDKs that can be used together or independently. It can be used as a headless CMS, a backend for your mobile app, or a full-stack website builder.`}
          items={``}
          interactiveChild={null}
        />
        <BicameralSection
          title={`Themes & Modules`}
          description={`Similar to WordPress, Dopebase comes with a set of UI themes and modules that you can use to build your website or mobile app with or without code. You can also build your own custom themes and modules.`}
          items={``}
          interactiveChild={null}
        />
        <BicameralSection
          title={`Scale to Millions of Users on Day One`}
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
        <Footer />
      </div>
    </div>
  )
}

export default HomePage
