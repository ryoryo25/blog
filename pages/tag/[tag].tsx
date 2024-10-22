import { BLOG_NAME, INITIAL_PAGE_NUMBER, POSTS_PER_PAGE } from "@/lib/constants"
import Layout from "@/components/layout"
import Head from "next/head"
import Container from "@/components/container"
import ListPosts from "@/components/list-posts"
import Pagination from "@/components/pagination"
import type Post from "@/interfaces/post"
import { PostEntry } from "@/interfaces/post"
import { getAllPosts, paginationRange } from "@/lib/api"
import TagPostsTitle from "@/components/tag-posts-title"
import { union } from "@/lib/set-operations"

type Props = {
  posts: Post[]
  pages
  tag: string
}

export default function Tag({ posts, pages, tag }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{`${BLOG_NAME} | Tag: ${tag}`}</title>
        </Head>
        <Container>
            <TagPostsTitle tag={tag} />
            {posts.length > 0 && <ListPosts posts={posts} />}
            <Pagination
              pages={pages}
              currentPage={INITIAL_PAGE_NUMBER}
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
  const page = INITIAL_PAGE_NUMBER
  const slicedPosts = posts.slice((page - 1) * POSTS_PER_PAGE,
                                  page * POSTS_PER_PAGE) // end is exclusive

  return {
    props: {
      posts: slicedPosts,
      pages,
      tag: params.tag,
    },
  }
}

export async function getStaticPaths() {
  const allTags = Array.from(
    getAllPosts([PostEntry.TAGS])
      .map(e => new Set(e.tags))
      .reduce((p, c) => union(p, c), new Set())
  )

  return {
    paths: allTags.map((tag) => {
      return {
        params: {
          tag,
        },
      }
    }),
    fallback: false,
  }
}
