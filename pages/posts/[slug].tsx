import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ArticleContainer from '@/components/article-container'
import BottomNavigation from '@/components/bottom-navigation'
import Container from '@/components/container'
import Layout from '@/components/layout'
import PostBody from '@/components/post-body'
import PostHeader from '@/components/post-header'
import PostTitle from '@/components/post-title'
import SidebarContainer from '@/components/sidebar-container'
import TOC from '@/components/toc'
import type Post from '@/interfaces/post'
import { PostEntry, arrayPostEntry } from '@/interfaces/post'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import { BLOG_NAME, OG_IMAGE_PREFIX } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'

type Props = {
  post: Post
  prev: Post
  next: Post
  preview?: boolean
}

export default function Post({ post, prev, next, preview }: Props) {
  const router = useRouter()
  const title = `${post.title} | ${BLOG_NAME}`
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <div className="flex justify-center">
            <ArticleContainer>
              <Head>
                {/* inject head data */}
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:image" content={`${OG_IMAGE_PREFIX}/${post.slug}/${post.coverImage}`} />
              </Head>
              <PostHeader
                slug={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                dates={post.dates}
              />
              <PostBody content={post.content} />
              <BottomNavigation prev={prev} next={next} />
            </ArticleContainer>
            <SidebarContainer>
              <TOC toc={post.toc} />
              {/* TODO: add ad */}
            </SidebarContainer>
          </div>
        )}
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, arrayPostEntry)
  const { toc, content } = await markdownToHtml(params.slug, (post.content as string) || '')

  const posts = getAllPosts([PostEntry.SLUG, PostEntry.DATES]) // decending order
  const this_post = posts.findIndex(p => p.slug === params.slug)

  return {
    props: {
      post: {
        ...post,
        toc,
        content,
      },
      prev: this_post+1 < posts.length ? posts[this_post+1] : null,
      next: this_post-1 >= 0 ? posts[this_post-1] : null,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts([PostEntry.SLUG])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
