import React, { useMemo } from 'react'
import NavigationMenu from '../../components/NavigationMenu'
import ReactMarkdown from 'react-markdown'

import MetaHeader from '../../components/MetaHeader'
import CodeBlock from '../../components/CodeBlock'
import { formatTimestamp, unescapeString } from '../../../../utils'
import Footer from '../../components/Footer'
import readTimeEstimate from '../../../../utils/readTimeEstimate'
import { websiteURL } from '../../../../config/config'
import styles from '../../theme.module.css'

export type Tag = {
  slug: string
  name: string
  canonical_url: string
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
    <div className={`${styles.dopebase} dopebase`}>
      <div className={`${styles.container} container`}>
        <div className={styles.articlePageContainer}>
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
          <div className={styles.articleContainer}>
            {tableOfContents?.length > 0 && (
              <div className={styles.tableOfContentsContainer}>
                <p>In this article</p>
                <div
                  className={styles.dynamicTableOfContents}
                  dangerouslySetInnerHTML={{
                    __html: unescapeString(tableOfContents),
                  }}></div>
              </div>
            )}
            <div className={styles.articleBodyContainer}>
              <div className={styles.articleHeader}>
                <h1 className={styles.articleTitle}>{unescapeString(title)}</h1>
                <div className={styles.articleMeta}>
                  <div className={styles.articleInfo}>
                    <time
                      className={styles.articlePostDate}
                      dateTime={createdAt}>
                      {formatTimestamp(createdAt)}
                    </time>{' '}
                    ⋅ {readTimeEstimate(unescapeString(content))} read ⋅{' '}
                    <a
                      className={styles.articleCategoryLink}
                      href={`${websiteURL}${category.slug}`}>
                      {category.name}
                    </a>
                  </div>

                  <div className={styles.articleAdworkaroundClassname}>
                    {/* {twitterLink} */}
                  </div>
                </div>
              </div>
              <div className={styles.articleContent}>
                {/* <ReactMarkdown
                  source={unescapeString(content)}
                  renderers={{ code: CodeBlock, heading: HeadingRenderer }}
                /> */}
                <ReactMarkdown
                  components={{
                    // // Map `h1` (`# heading`) to use `h2`s.
                    h1(props) {
                      return HeadingRenderer({ ...props, level: '1' })
                    },
                    h2(props) {
                      return HeadingRenderer({ ...props, level: '2' })
                    },
                    h3(props) {
                      return HeadingRenderer({ ...props, level: '3' })
                    },
                    h4(props) {
                      return HeadingRenderer({ ...props, level: '4' })
                    },
                    code(props) {
                      if (props.className) {
                        return (
                          <CodeBlock
                            language={
                              props.className?.split('-')[1] ?? 'javascript'
                            }
                            value={props.node.children[0].value}
                          />
                        )
                      }
                      return <code>{props.children}</code>
                    },
                    // // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
                    // em(props) {
                    //   const {node, ...rest} = props
                    //   return <i style={{color: 'red'}} {...rest} />
                    // }
                  }}>
                  {unescapeString(content)}
                </ReactMarkdown>
              </div>
              <div className={styles.articleFooter}>
                {(filteredTags?.length ?? 0) > 0 && (
                  <div className={styles.articleTags}>
                    {filteredTags.map(tag => (
                      <a
                        key={tag.slug}
                        className={styles.articleTag}
                        href={`${tag.canonical_url}`}>
                        {tag.name}
                      </a>
                    ))}
                  </div>
                )}
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
