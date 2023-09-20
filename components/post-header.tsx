import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Dates from '../interfaces/dates'

type Props = {
  title: string
  coverImage: string
  dates: Dates
}

const PostHeader = ({ title, coverImage, dates }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="mb-6 text-lg">
        <DateFormatter dates={dates} />
      </div>
    </>
  )
}

export default PostHeader
