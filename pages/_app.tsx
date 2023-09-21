import { AppProps } from 'next/app'
import '../styles/index.css'
import { roboto, robotomono, notojp } from '../utils/font'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.variable} ${robotomono.variable} ${notojp.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
