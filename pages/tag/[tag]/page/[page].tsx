import Container from "@/components/container"
import Layout from "@/components/layout"
import ListPosts from "@/components/list-posts"
import Pagination from "@/components/pagination"
import TagTitle from "@/components/tag-title"
import type Post from "@/interfaces/post"
import { PostEntry } from "@/interfaces/post"
import { getAllPosts, paginationRange } from "@/lib/api"
import { BLOG_NAME, INITIAL_PAGE_NUMBER, POSTS_PER_PAGE } from "@/lib/constants"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

type Props = {
  posts: Post[]
  pages: number[]
  page: number
  tag: string
}

export default function Page({ posts, pages, page, tag }: Props) {
  const router = useRouter()
  if (page == INITIAL_PAGE_NUMBER) {
    useEffect(() => { router.replace(`/tag/${tag}/`) }, [])
  }

  const title = `${BLOG_NAME} | Tag: ${tag} | Page ${page}`
  return (
    <>
      <Layout>
        <Head>
          <title>{title}</title>
        </Head>
        <Container>
            <TagTitle tag={tag} />
            {posts.length > 0 && <ListPosts posts={posts} />}
            <Pagination
              pages={pages}
              currentPage={page}
              basePath={`/tag/${tag}`}
            />
        </Container>
      </Layout>
    </>
  )
}

type Params = {
  params: {
    tag: string
    page: string
  }
}

export async function getStaticProps({ params }: Params) {
  const posts = getAllPosts([
    PostEntry.TITLE,
    PostEntry.DATES,
    PostEntry.TAGS,
    PostEntry.SLUG,
    PostEntry.COVER_IMAGE,
  ]).filter(post => post.tags.includes(params.tag))

  const pages = paginationRange(posts.length)
  const page = Number(params.page)
  const slicedPosts = posts.slice((page - 1) * POSTS_PER_PAGE,
                                  page * POSTS_PER_PAGE) // end is exclusive

  return {
    props: {
      posts: slicedPosts,
      pages,
      page,
      tag: params.tag,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = getAllPosts([PostEntry.TAGS])
  const allTags = Array.from(
    allPosts
      .map(e => new Set(e.tags))
      .reduce((p, c) => p.union(c), new Set())
  )

  return {
    paths: allTags.flatMap(tag => {
      const tagPosts = allPosts.filter(e => e.tags.includes(tag)) // extract posts tagged the tag
      const pageList = paginationRange(tagPosts.length)
      return pageList.map(page => ({
        params: {
          tag,
          page: page.toString(),
        }
      }))
    }),
    fallback: false,
  }
}
