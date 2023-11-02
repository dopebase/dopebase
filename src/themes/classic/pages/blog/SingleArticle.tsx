import React, { useMemo } from 'react'
import NavigationMenu from '../../components/NavigationMenu'
import ReactMarkdown from 'react-markdown'

import MetaHeader from '../../components/MetaHeader'
// import CodeBlock from '../../components/CodeBlock'
import { formatTimestamp, unescapeString } from '../../../../utils'
import Footer from '../../components/Footer'
import readTimeEstimate from '../../../../utils/readTimeEstimate'
import { websiteURL } from '../../../../config/config'

export type Tag = {
  slug: string
  name: string
}

export type Category = {
  slug: string
  name: string
}

export type ArticleProps = {
  id: number
  title: string
  content: string
  tableOfContents: string
  slug: string
  createdAt: string
  seoDescription: string
  seoKeyword: string
  seoTitle: string
  coverPhoto: string
  categoryId: string
  authorId: string
  canonicalURL?: string
  aiSocialPost?: string
  tags: Tag[]
  category: Category
}

const SingleArticle: React.FC<{ article: ArticleProps }> = ({ article }) => {
  const {
    title,
    content,
    tableOfContents,
    coverPhoto,
    createdAt,
    seoDescription,
    seoTitle,
    seoKeyword,
    canonicalURL,
    aiSocialPost,
    tags,
    category,
  } = article

  const filteredTags = tags //.filter(tag => tag.name !== websiteTag)

  const onTwClick = text => {
    console.log(text)
    const win = window.open(
      `https://twitter.com/share?ref_src=dopebase_article_twttr&text=${text}&url=${unescapeString(
        canonicalURL,
      )}`,
      '_blank',
    )
    if (win != null) {
      win.focus()
    }
  }

  // const twitterLink = useMemo(() => {
  //   const text =
  //     (aiSocialPost?.length ?? 0) > 0
  //       ? `${encodeURIComponent(aiSocialPost)}`
  //       : `Great article on ${
  //           seoTitle || title
  //         } 🔥🔥🔥 Check it out on Devbrite 👇`
  //   return (
  //     <a target="_blank" onClick={_e => onTwClick(text)}>
  //       <i className="fa fa-twitter dopebasesworkaroundname-icon" />
  //     </a>
  //   )
  // }, [seoTitle, title, aiSocialPost, canonicalURL])

  // const facebookShareLink = useMemo(() => {
  //   return (
  //     <a target="_blank" onClick={_e => onFbClick()}>
  //       <i className="fa fa-facebook dopebasesworkaroundname-icon" />
  //     </a>
  //   )
  // }, [seoTitle, canonicalURL])

  function flatten(text, child) {
    return typeof child === 'string'
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text)
  }

  function HeadingRenderer(props) {
    var children = React.Children.toArray(props.children)
    var text = children.reduce(flatten, '')
    var slug = text.toLowerCase().replace(/\W/g, '-')
    return React.createElement('h' + props.level, { id: slug }, props.children)
  }
  return (
    <div className="dopebase">
      <div className="container">
        <div className="article-page-container ">
          <MetaHeader
            seoDescription={unescapeString(seoDescription)}
            seoTitle={
              seoTitle?.length > 0
                ? unescapeString(seoTitle)
                : unescapeString(title)
            }
            seoKeyword={unescapeString(seoKeyword)}
            photo={unescapeString(coverPhoto)}
            url={unescapeString(canonicalURL)}
          />
          <NavigationMenu />
          <div className="article-container">
            {tableOfContents?.length > 0 && (
              <div className="table-of-contents-container">
                <p>In this article</p>
                <div
                  className="dynamic-table-of-contents"
                  dangerouslySetInnerHTML={{
                    __html: unescapeString(tableOfContents),
                  }}></div>
              </div>
            )}
            <div className="article-body-container">
              <div className="article-header">
                <h1 className="article-title">{unescapeString(title)}</h1>
                <div className="article-meta">
                  <div className="article-info">
                    <time className="article-post-date" dateTime={createdAt}>
                      {formatTimestamp(createdAt)}
                    </time>{' '}
                    ⋅ {readTimeEstimate(unescapeString(content))} read ⋅{' '}
                    <a
                      className="article-category-link"
                      href={`${websiteURL}${category.slug}`}>
                      {category.name}
                    </a>
                  </div>

                  <div className="article-adworkaround-classname">
                    {/* {twitterLink} */}
                  </div>
                </div>
              </div>
              <div className="article-content">
                {/* <ReactMarkdown
                  source={unescapeString(content)}
                  renderers={{ code: CodeBlock, heading: HeadingRenderer }}
                /> */}
              </div>
              <div className="article-footer">
                <div className="article-tags">
                  {filteredTags.map(tag => (
                    <a
                      key={tag.slug}
                      className="article-tag"
                      href={`${websiteURL}${tag.slug}`}>
                      {tag.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default SingleArticle
