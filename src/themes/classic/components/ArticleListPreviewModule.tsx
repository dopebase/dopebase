import React from 'react'
import { websiteURL } from '../../../config/config'
import { unescapeString } from '../../../utils'
import styles from '../theme.module.css'

export type ArticlePreview = {
  title: string
  content: string
  photo?: string
  slug?: string
  categoryTitle: string
  categoryPhoto?: string
  publishedDate?: string
  tags?: string[]
}

export type ArticleListPreviewModuleProps = {
  title: string
  summary: string
  slug: string
  limit?: number
  articlePreviews: ArticlePreview[]
}

const Article: React.FC<{ article: ArticlePreview }> = ({ article }) => {
  const { title, categoryTitle, photo, slug } = article
  return (
    <a href={`${websiteURL}${slug}`} className={styles.articlePreviewContainer}>
      <article className={styles.article}>
        <span className={styles.categoryTitle}>
          {unescapeString(categoryTitle)}
        </span>
        <h2>{unescapeString(title)}</h2>
        <img className={styles.photoCover} src={unescapeString(photo)} />
        <span className={styles.createdAt}>{article.publishedDate}</span>
      </article>
    </a>
  )
}
const ArticleListPreviewModule: React.FC<ArticleListPreviewModuleProps> = ({
  title,
  summary,
  slug,
  articlePreviews,
  limit,
}) => {
  const topArticles = articlePreviews
    ? limit
      ? articlePreviews.slice(0, limit)
      : articlePreviews
    : []
  return (
    <div className="article-preview-module">
      <div className="module-header">
        {title?.length > 0 && (
          <h1 className="module-title">
            <a href={`${websiteURL}${slug}`}>{title}</a>
          </h1>
        )}
        {summary?.length > 0 && <p className="module-summary">{summary}</p>}
      </div>
      <ul className="article-list-container grid compact">
        {topArticles.map((preview, index) => (
          <React.Fragment key={title + index}>
            <li>
              <Article article={preview} />
            </li>
          </React.Fragment>
        ))}
      </ul>
      {limit && articlePreviews?.length > limit && (
        <a className="view-all" href={`${websiteURL}${slug}`}>
          View all {title} articles...
        </a>
      )}
    </div>
  )
}

export default ArticleListPreviewModule
