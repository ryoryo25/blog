import Link from 'next/link'
import { BLOG_NAME } from '../lib/constants'

const Header = () => {
  return (
    <header className="sticky w-full top-0 left-0 mb-14 bg-white border-b border-neutral-200">
      <div className="container py-7">
        <div className="flex items-center justify-between px-8 md:px-16">
          <Link href="/" className="text-4xl font-bold tracking-tight md:tracking-tighter leading-tight whitespace-nowrap">
            {BLOG_NAME}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
