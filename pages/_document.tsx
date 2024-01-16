import { Html, Head, Main, NextScript } from 'next/document'
import { GA_MEASUREMENT_ID } from '../lib/gtag'
import GoogleAnalytics from '../components/google-analytics'

export default function Document() {
  return (
    <Html lang="ja-JP">
      <Head>
        {/* style for highlihgt.js */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css"></link>
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
