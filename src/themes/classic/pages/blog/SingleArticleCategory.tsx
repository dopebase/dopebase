import React from 'react'
import NavigationMenu from '../../components/NavigationMenu'
import MetaHeader from '../../components/MetaHeader'
import Footer from '../../components//Footer'
import ArticleListPreviewModule, {
  ArticlePreview,
} from '../../components/ArticleListPreviewModule'
import PaginationView from '../../components/pagination/PaginationView'
import { unescapeString } from '../../../../utils'
import styles from '../../theme.module.css'

export type ArticleCategoryProps = {
  id: number
  name: string
  description: string
  slug: string
  logoURL: string
  seoTitle: string
  seoDescription: string
  aiSummary: string
  aiLongDescription: string
  canonicalURL: string
  createdAt: string
  articles: ArticlePreview[]
  totalPages: number
  currentPage: number
}

const SingleArticleCategory: React.FC<{
  articleCategory: ArticleCategoryProps
}> = ({ articleCategory }) => {
  const {
    id,
    name,
    slug,
    seoTitle,
    seoDescription,
    aiSummary,
    aiLongDescription,
    logoURL,
    canonicalURL,
    totalPages,
    currentPage,
    description,
    articles,
  } = articleCategory

  const onTwClick = text => {
    const win = window.open(
      `https://twitter.com/share?ref_src=dopebase_article_category_twttr&text=${text}&url=${unescapeString(
        canonicalURL,
      )}`,
      '_blank',
    )
    if (win != null) {
      win.focus()
    }
  }

  const onFbClick = () => {
    const win = window.open(
      'https://www.facebook.com/sharer/sharer.php?src=dopebase_article_category_fb_share',
      '_blank',
    )
    if (win != null) {
      win.focus()
    }
  }

  return (
    <div className={`${styles.dopebase} dopebase`}>
      <div className={`${styles.container} container`}>
        <div className={styles.articlePageContainer}>
          <MetaHeader
            seoDescription={unescapeString(seoDescription)}
            seoTitle={unescapeString(seoTitle)}
            seoKeyword={unescapeString(seoTitle)}
            photo={unescapeString(logoURL)}
            url={unescapeString(canonicalURL)}
          />
          <NavigationMenu />
          {/* <div className="article-category-container">
            <EmailSubscriptionHeader
              title={name}
              description={description}
              emailUpsellString={`Join over 100,000 developers and entrepreneurs to stay in touch with the latest source codes and tutorials.`}
              tag={slug}
            />
          </div> */}
          <ArticleListPreviewModule
            slug={slug}
            title={seoTitle?.length > 0 ? seoTitle : name}
            summary={aiSummary}
            articlePreviews={articles}
          />
          <PaginationView
            totalPages={totalPages}
            currentPage={currentPage}
            baseURL={unescapeString(canonicalURL)}
          />
          {aiLongDescription && (
            <div
              className={styles.archiveLongDescription}
              dangerouslySetInnerHTML={{
                __html: aiLongDescription.split('\n').join('<br />'),
              }}></div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SingleArticleCategory
