import { AppProps } from 'next/app'
import '../styles/index.css'
import { roboto, robotomono, notojp } from '../utils/font'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { pageview } from '../lib/gtag'

export default function MyApp({ Component, pageProps }: AppProps) {
  // google analytics
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <div className={`${roboto.variable} ${robotomono.variable} ${notojp.variable} font-sans text-base-color`}>
      <Component {...pageProps} />
    </div>
  )
}
