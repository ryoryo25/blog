import CoverImage from './cover-image'
import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import type Dates from '@/interfaces/dates'
import TagLinks from './tag-links'

type Props = {
  slug: string
  title: string
  coverImage: string
  dates: Dates
  tags: string[]
}

export default function PostHeader({ slug, title, coverImage, dates, tags }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {tags.length > 0 && <TagLinks tags={tags} />}
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <div className="mb-6 text-lg">
        <DateFormatter dates={dates} />
      </div>
    </>
  )
}
