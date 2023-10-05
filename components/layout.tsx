import Footer from './footer'
import Header from './header'
import Meta from './meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

export default function Layout({ preview, children }: Props) {
  return (
    <>
      <Meta />
      <Header />
        <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
