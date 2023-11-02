import React, { useMemo } from 'react'
import NavigationMenu from '../../components/NavigationMenu'
import MetaHeader from '../../components/MetaHeader'
import { unescapeString } from '../../../../utils'
import Footer from '../../components/Footer'
import ArticleListPreviewModule, {
  ArticlePreview,
} from '../../components/ArticleListPreviewModule'
import PaginationView from '../../components/pagination/PaginationView'
import styles from '../../theme.module.css'

export type ArticleTagProps = {
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

const SingleArticleTag: React.FC<{
  articleTag: ArticleTagProps
}> = ({ articleTag }) => {
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
    description,
    articles,
    totalPages,
    currentPage,
  } = articleTag

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

  const twitterLink = useMemo(() => {
    const text = `Great article on ${
      seoTitle || name
    } 🔥🔥🔥 Check it out on Devbrite 👇`
    return (
      <a target="_blank" onClick={_e => onTwClick(text)}>
        <i className="fa fa-twitter dopebasesworkaroundname-icon" />
      </a>
    )
  }, [seoTitle, name, canonicalURL])

  console.log(aiLongDescription)
  return (
    <div className="dopebase">
      <div className="container">
        <div className={styles.articlePageContainer}>
          <MetaHeader
            seoDescription={unescapeString(seoDescription)}
            seoTitle={unescapeString(seoTitle)}
            seoKeyword={unescapeString(seoTitle)}
            photo={unescapeString(logoURL)}
            url={unescapeString(canonicalURL)}
          />
          <NavigationMenu />
          <ArticleListPreviewModule
            slug={slug}
            title={seoTitle}
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
              className="archive-long-description"
              dangerouslySetInnerHTML={{
                __html: aiLongDescription.split('\n').join('<br />'),
              }}></div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default SingleArticleTag
