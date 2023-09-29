import type Dates from './dates'

type PostType = {
  slug: string
  title: string
  dates: Dates
  coverImage: string
  toc: string
  content: string
}

export enum PostEntry {
  SLUG = 'slug',
  TITLE = 'title',
  DATES = 'dates',
  COVER_IMAGE = 'coverImage',
  TOC = 'toc',
  CONTENT = 'content',
}

export const arrayPostEntry = Object.entries(PostEntry).map((e) => e[1])

export default PostType
