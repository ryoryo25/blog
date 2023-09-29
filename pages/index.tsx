import Container from '../components/container'
import ListPosts from '../components/list-posts'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import Post, { PostEntry } from '../interfaces/post'
import { BLOG_NAME } from '../lib/constants'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{BLOG_NAME}</title>
        </Head>
        <Container>
            {allPosts.length > 0 && <ListPosts posts={allPosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    PostEntry.TITLE,
    PostEntry.DATES,
    PostEntry.SLUG,
    PostEntry.COVER_IMAGE,
  ])

  return {
    props: { allPosts },
  }
}
