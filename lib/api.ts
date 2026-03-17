import fs from 'fs'
import matter from 'gray-matter'
import { join, relative } from 'path'
import { execSync } from 'child_process'
import { DEFAULT_COVER, POSTS_PER_PAGE } from './constants'
import type Dates from '../interfaces/dates'
import { PostEntry } from '../interfaces/post'

const contentDirectory = join(process.cwd(), 'content')
const postsDirectory = fs.existsSync(join(contentDirectory, 'posts')) 
  ? join(contentDirectory, 'posts') 
  : join(process.cwd(), '_posts')

function getGitDates(filePath: string): Dates {
  try {
    // If the file is inside the content directory, run git log there
    const isInsideContent = filePath.startsWith(contentDirectory)
    const gitCwd = isInsideContent ? contentDirectory : process.cwd()
    const gitRelativePath = relative(gitCwd, filePath)

    // Get the first commit date (creation date)
    const postDate = execSync(`git log --follow --format=%aI "${gitRelativePath}" | tail -1`, { cwd: gitCwd, encoding: 'utf8' }).trim()
    // Get the last commit date (update date)
    const updateDate = execSync(`git log -1 --format=%aI "${gitRelativePath}"`, { cwd: gitCwd, encoding: 'utf8' }).trim()

    if (postDate && updateDate) {
      return { postDate, updateDate }
    }
  } catch (error) {
    // Fallback if git command fails or file is not tracked
  }

  // Fallback to filesystem stats
  const stats = fs.statSync(filePath)
  return {
    postDate: stats.birthtime.toISOString(),
    updateDate: stats.mtime.toISOString(),
  }
}

export function getPostSlugs() {
  const filesAndDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
  return filesAndDirs.filter(e => e.isFile()).map(e => e.name)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const gitDates = getGitDates(fullPath)

  type Items = {
    [key: string]: string | string[] | Dates | null
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
    if (field === PostEntry.DATES) {
      items[field] = {
        postDate: (data[field]?.postDate as string) || gitDates.postDate,
        updateDate: (data[field]?.updateDate as string) || gitDates.updateDate,
      }
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

export function paginationRange(numberOfPosts: number) {
  return range(1, Math.ceil(numberOfPosts / POSTS_PER_PAGE))
}
