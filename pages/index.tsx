import Head from 'next/head'
import Container from '@/components/container'
import Layout from '@/components/layout'
import ListPosts from '@/components/list-posts'
import Pagination from '@/components/pagination'
import type Post from '@/interfaces/post'
import { PostEntry } from '@/interfaces/post'
import { getAllPosts, paginationRange } from '@/lib/api'
import { BLOG_NAME, INITIAL_PAGE_NUMBER, OG_IMAGE_DEFAULT, POSTS_PER_PAGE } from '@/lib/constants'
import AboutBlog from '@/components/about-blog'

type Props = {
  posts: Post[]
  pages: number[]
}

export default function Index({ posts, pages }: Props) {
  return (
    <Layout>
      <Head>
        <title>{BLOG_NAME}</title>
        <meta property="og:title" content={BLOG_NAME} />
        <meta property="og:image" content={OG_IMAGE_DEFAULT} />
      </Head>
      <Container>
          <AboutBlog />
          {posts.length > 0 && <ListPosts posts={posts} />}
          <Pagination pages={pages} currentPage={INITIAL_PAGE_NUMBER} />
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts([
    PostEntry.TITLE,
    PostEntry.DATES,
    PostEntry.TAGS,
    PostEntry.SLUG,
    PostEntry.COVER_IMAGE,
  ])
  const pages = paginationRange(posts.length)
  const page = INITIAL_PAGE_NUMBER
  const slicedPosts = posts.slice((page - 1) * POSTS_PER_PAGE,
                                  page * POSTS_PER_PAGE) // end is exclusive

  return {
    props: {
      posts: slicedPosts,
      pages,
    },
  }
}
