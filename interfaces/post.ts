import type Dates from './dates'

type PostType = {
  slug: string
  title: string
  dates: Dates
  coverImage: string
  content: string
}

export enum PostEntry {
  SLUG = 'slug',
  TITLE = 'title',
  DATES = 'dates',
  COVER_IMAGE = 'coverImage',
  CONTENT = 'content',
}

export const arrayPostEntry = Object.entries(PostEntry).map((e) => e[1])

export default PostType
