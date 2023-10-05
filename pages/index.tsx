import Container from '../components/container'
import ListPosts from '../components/list-posts'
import Layout from '../components/layout'
import { getAllPosts, range } from '../lib/api'
import Head from 'next/head'
import Post, { PostEntry } from '../interfaces/post'
import { BLOG_NAME, INITIAL_PAGE_NUMBER, POSTS_PER_PAGE } from '../lib/constants'
import Pagination from '../components/pagination'

type Props = {
  posts: Post[]
  pages: number[]
}

export default function Index({ posts, pages }: Props) {
  return (
    <Layout>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      <Container>
          {posts.length > 0 && <ListPosts posts={posts} />}
          <Pagination pages={pages} current_page={INITIAL_PAGE_NUMBER} />
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts([
    PostEntry.TITLE,
    PostEntry.DATES,
    PostEntry.SLUG,
    PostEntry.COVER_IMAGE,
  ])
  const pages = range(1, Math.ceil(posts.length / POSTS_PER_PAGE))
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
