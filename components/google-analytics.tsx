import Script from "next/script"
import { pageview } from "../lib/gtag"
import { useEffect } from "react"
import { useRouter } from "next/router"

type Props = {
  gaId: string
}

export default function GoogleAnalytics({ gaId }: Props) {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());

          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}