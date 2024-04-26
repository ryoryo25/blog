import CoverImage from './cover-image'
import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import type Dates from '../interfaces/dates'

type Props = {
  slug: string
  title: string
  coverImage: string
  dates: Dates
}

export default function PostHeader({ slug, title, coverImage, dates }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <div className="mb-6 text-lg">
        <DateFormatter dates={dates} />
      </div>
    </>
  )
}
