import Dates from './dates'

type PostType = {
  slug: string
  title: string
  dates: Dates
  coverImage: string
  ogImage: {
    url: string
  }
  content: string
}

export default PostType
