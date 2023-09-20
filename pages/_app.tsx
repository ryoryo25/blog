import { AppProps } from 'next/app'
import '../styles/index.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { notojp, roboto } from '../utils/font'
config.autoAddCss = false

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${notojp.variable} ${roboto.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
