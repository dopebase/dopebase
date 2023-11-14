import React from 'react'
import Head from 'next/head'

const MetaHeader = ({
  websiteName,
  seoTitle,
  seoDescription,
  seoKeyword,
  photo = 'https://firebasestorage.googleapis.com/v0/b/dopebase-9b89b.appspot.com/o/react-native-booking-appointments-app-template.png?alt=media&amp;token=8c0ca965-e74d-4bc4-99b1-b274ad6803d6',
  url,
  structuredData,
}) => {
  const image =
    photo ??
    'https://instamobile.io/wp-content/uploads/2019/09/InstamobileSponsor1.png'
  return (
    <Head>
      <title>{seoTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeyword} />
      {url?.length > 0 && <link rel="canonical" href={url} />}

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />

      {url?.length > 0 && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={websiteName} />

      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:alt" content={seoKeyword} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:image" content={image} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="./assets/dopebase-logo.svg"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        sizes="32x32"
        href="./assets/dopebase-logo.svg"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        sizes="16x16"
        href="./assets/dopebase-logo.svg"
      />
      <link rel="manifest" href="./assets/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#4649c2" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link
        rel="stylesheet"
        id="hestia_fonts-css"
        href="https://fonts.googleapis.com/css?family=Roboto%3A300%2C400%2C500%2C700%7CRoboto+Slab%3A400%2C700&#038;subset=latin%2Clatin-ext&#038;ver=1.1.71"
        type="text/css"
        media="all"
      />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${structuredData}`,
          }}
        />
      )}
    </Head>
  )
}

export default MetaHeader
