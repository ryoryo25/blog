import type Author from './author'
import Dates from './dates'

type PostType = {
  slug: string
  title: string
  dates: Dates
  coverImage: string
  author: Author
  ogImage: {
    url: string
  }
  content: string
}

export default PostType
