import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '@/components/container'
import Layout from '@/components/layout'
import ListPosts from '@/components/list-posts'
import Pagination from '@/components/pagination'
import type Post from '@/interfaces/post'
import { PostEntry } from '@/interfaces/post'
import { getAllPosts, paginationRange } from '@/lib/api'
import { BLOG_NAME, INITIAL_PAGE_NUMBER, POSTS_PER_PAGE } from '@/lib/constants'

type Props = {
  posts: Post[]
  pages: number[]
  page: number
}

export default function Page({ posts, pages, page }: Props) {
  const router = useRouter()
  if (page == INITIAL_PAGE_NUMBER) {
    useEffect(() => { router.replace('/') }, [])
  }

  const title = `${BLOG_NAME} | Page ${page}`
  return (
    <>
      <Layout>
        <Head>
          <title>{title}</title>
        </Head>
        <Container>
            {posts.length > 0 && <ListPosts posts={posts} />}
            <Pagination pages={pages} currentPage={page} />
        </Container>
      </Layout>
    </>
  )
}

type Params = {
  params: {
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
  ])
  const pages = paginationRange(posts.length)
  const page = Number(params.page)
  const slicedPosts = posts.slice((page - 1) * POSTS_PER_PAGE,
                                  page * POSTS_PER_PAGE) // end is exclusive

  return {
    props: {
      posts: slicedPosts,
      pages,
      page,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts([PostEntry.SLUG])
  const count_posts = posts.length
  const pageList = paginationRange(count_posts) // [1, ...]

  return {
    paths: pageList.map((page) => {
      return {
        params: {
          page: page.toString(),
        },
      }
    }),
    fallback: false,
  }
}
