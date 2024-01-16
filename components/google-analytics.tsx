type Props = {
  gaId: string
}

// Reference: https://github.com/vercel/next.js/tree/deprecated-main/examples/with-google-analytics
export default function GoogleAnalytics({ gaId }: Props) {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag(\'js\', new Date());

          gtag(\'config\', \'${gaId}\');
        ` }} />
    </>
  )
}