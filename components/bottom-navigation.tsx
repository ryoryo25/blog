import Link from 'next/link'
import Post from '../interfaces/post'
import { FaAngleLeft, FaAngleRight, FaHouse } from 'react-icons/fa6'
import fa from './fa.module.css'

type Props = {
  prev: Post
  next: Post
}

export default function BottomNavigation({ prev, next }: Props) {
  return (
    <nav className="flex items-center justify-around mt-8">
      <Link
        as={prev ? `/posts/${prev.slug}` : ''}
        href="/posts/[slug]"
        className={!prev ? 'invisible' : ''}
      >
        <FaAngleLeft className={`text-2xl ${fa['fa']}`} />
      </Link>
      <Link href="/"><FaHouse className={`text-2xl ${fa['fa']}`} /></Link>
      <Link
        as={next ? `/posts/${next.slug}` : ''}
        href="/posts/[slug]"
        className={!next ? 'invisible' : ''}
      >
        <FaAngleRight className={`text-2xl ${fa['fa']}`} />
      </Link>
    </nav>
  )
}
