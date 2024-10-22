import Link from 'next/link'
import CoverImage from './cover-image'
import DateFormatter from './date-formatter'
import type Dates from '../interfaces/dates'
import TagLink from './tag-link'

type Props = {
  title: string
  coverImage: string
  dates: Dates
  tags: string[]
  slug: string
}

export default function PostPreview({
  title,
  coverImage,
  dates,
  tags,
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
      <div className="text-lg mb-2">
        <DateFormatter dates={dates} />
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap text-sm">
          {tags.map(tag => <TagLink tag={tag} noLink={true} />)}
        </div>
      )}
    </Link>
  )
}
