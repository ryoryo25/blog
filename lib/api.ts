import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type Dates from '../interfaces/dates'
import { DEFAULT_COVER } from './constants'
import { PostEntry } from '../interfaces/post'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  for (let field of fields) {
    if (field === PostEntry.SLUG) {
      items[field] = realSlug
      continue
    }
    if (field === PostEntry.CONTENT) {
      items[field] = content
      continue
    }
    if (field === PostEntry.TOC) {
      items[field] = null
      continue
    }
    if (field === PostEntry.COVER_IMAGE && data[field] === null) {
      items[field] = DEFAULT_COVER
      continue
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  }

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => {
      try {
        // hack
        const p1 = (post1.dates as unknown as Dates).postDate
        const p2 = (post2.dates as unknown as Dates).postDate

        return p1 > p2 ? -1 : 1
      } catch (error) {
        return 0
      }
    })
  return posts
}

export function range(start: number, end: number, length = end - start + 1) {
  return Array.from({ length }, (_, i) => start + i)
}
