import Container from '../components/container'
import ListPosts from '../components/list-posts'
import Intro from '../components/intro'
import Header from '../components/header'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import Post from '../interfaces/post'
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
          {/* <div className="max-w-3xl"> */}
            {allPosts.length > 0 && <ListPosts posts={allPosts} />}
          {/* </div> */}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'dates',
    'slug',
    'author',
    'coverImage',
  ])

  return {
    props: { allPosts },
  }
}
