import React from 'react'
import ArticleListPreviewModule, {
  ArticleListPreviewModuleProps,
} from '../../components/ArticleListPreviewModule'
import NavigationMenu from '../../components/NavigationMenu'
import Footer from '../../components/Footer'
import MetaHeader from '../../components/MetaHeader'
import styles from '../../theme.module.css'

export type HomeProps = { modules: ArticleListPreviewModuleProps[] }

const seoConfig = {
  seoDescription:
    'Dopebase Blog - Learn how develop with Dopebase, the AI-powered app development platform.',
  seoTitle: 'Dopebase Blog',
  seoKeyword:
    'reactjs, app development, dopebase, software development, web development, code, coding, programming, how to code, angular, tutorials, web, ios, Android, Swift, Flutter, React Native, Kotlin',
  coverPhotoURL:
    'https://firebasestorage.googleapis.com/v0/b/dopebase-9b89b.appspot.com/o/react-native-booking-appointments-app-template.png?alt=media&amp;token=8c0ca965-e74d-4bc4-99b1-b274ad6803d6',
}

const Home: React.FC<HomeProps> = ({ modules }) => {
  return (
    <div className={`${styles.dopebase} dopebase`}>
      <div className={`${styles.container} container`}>
        <MetaHeader
          seoDescription={seoConfig.seoDescription}
          seoTitle={seoConfig.seoTitle}
          seoKeyword={seoConfig.seoKeyword}
          photo={seoConfig?.coverPhotoURL}
        />
        <NavigationMenu />

        <div>
          {modules.map((module, index) => (
            <React.Fragment key={module.title + index}>
              <ArticleListPreviewModule
                slug={module.slug}
                title={module.title}
                summary=""
                articlePreviews={module.articlePreviews}
                limit={6}
              />
            </React.Fragment>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
