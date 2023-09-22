import Head from 'next/head'
import { BLOG_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'
import { url } from '../utils/config'

const Meta = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={url('/favicon/apple-touch-icon.png')}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={url('/favicon/favicon-32x32.png')}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={url('/favicon/favicon-16x16.png')}
      />
      <link rel="manifest" href={url('/favicon/site.webmanifest')} />
      <link
        rel="mask-icon"
        href={url('/favicon/safari-pinned-tab.svg')}
        color="#5bbad5"
      />
      <link rel="shortcut icon" type="image/x-icon" href={url('/favicon/favicon.ico')} />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content={url('/favicon/browserconfig.xml')} />
      <meta name="theme-color" content="#ffffff" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={BLOG_NAME}
      />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css"></link>
    </Head>
  )
}

export default Meta
