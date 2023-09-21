import Link from 'next/link'
import { AUTHOR_ICON, AUTHOR_NAME, BLOG_NAME } from '../lib/constants'
import { url } from '../utils/config'

const Header = () => {
  return (
    <header className="sticky w-full top-0 left-0 mb-14 bg-white border-b border-neutral-200">
      <div className="container py-7 px-8 md:px-16">
        <Link href="/" className="flex items-center">
          <img src={url(AUTHOR_ICON)} className="w-12 h-12 rounded-full mr-4" alt={AUTHOR_NAME} />
          <div className="text-4xl font-bold tracking-tight md:tracking-tighter leading-tight whitespace-nowrap pl-4 border-l-2 border-neutral-200">
            {BLOG_NAME}
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header
