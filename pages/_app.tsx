import { AppProps } from 'next/app'
import '../styles/index.css'
import { notojp, roboto } from '../utils/font'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${notojp.variable} ${roboto.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
