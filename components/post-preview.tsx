import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Dates from '../interfaces/dates'

type Props = {
  title: string
  coverImage: string
  dates: Dates
  slug: string
}

export default function PostPreview({
  title,
  coverImage,
  dates,
  slug,
}: Props) {
  return (
    <Link
      as={`/posts/${slug}`}
      href="/posts/[slug]"
      className="md:px-6 md:py-10 md:shadow-sm"
    >
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-2xl mb-3 leading-snug">
        {title}
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dates={dates} />
      </div>
    </Link>
  )
}
