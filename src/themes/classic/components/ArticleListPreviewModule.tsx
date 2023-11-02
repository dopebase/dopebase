import React from 'react'
import { rootURL } from '../../config'
import { unescapeString } from '../../utils'

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
    <a href={`${rootURL}${slug}`} className="article-preview-container">
      <article className="article">
        <span className="categoryTitle">{unescapeString(categoryTitle)}</span>
        <h2>{unescapeString(title)}</h2>
        <img className="photo-cover" src={unescapeString(photo)} />
        <span className="createdAt">{article.publishedDate}</span>
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
  const topArticles = limit ? articlePreviews.slice(0, limit) : articlePreviews
  return (
    <div className="article-preview-module">
      <div className="module-header">
        {title?.length > 0 && (
          <h1 className="module-title">
            <a href={`${rootURL}${slug}`}>{title}</a>
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
        <a className="view-all" href={`${rootURL}${slug}`}>
          View all {title} articles...
        </a>
      )}
    </div>
  )
}

export default ArticleListPreviewModule
