import { Plugin, unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkLinkCard from 'remark-link-card-plus'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypeStringify from 'rehype-stringify'

import { toHtml } from 'hast-util-to-html'
import { visit } from 'unist-util-visit'
import { inspect } from 'unist-util-inspect'
import { Image } from 'mdast'

import { ASSETS_PREFIX } from './constants'
import { url } from '../utils/config'

const URL_PREFIX = /https?:\/\//

const unifiedInspect: Plugin = () => {
  return (tree, file) => {
    console.log(inspect(tree))
  }
}

// Reference: https://zenn.dev/januswel/articles/745787422d425b01e0c1
function remarkImgSrcAddPrefix(slug: string): Plugin {
  return () => {
    return (tree, file) => {
      visit(tree, 'image', (node: Image, index, parent) => {
        const originalSrc = node.url
        if (originalSrc.startsWith(ASSETS_PREFIX) || URL_PREFIX.test(originalSrc)) {
          return
        }
        node.url = url(`${ASSETS_PREFIX}/${slug}/${originalSrc}`)
      })
    }
  }
}

export default async function markdownToHtml(slug: string, markdown: string) {
  let tocNode = null
  const result = await unified()
    .use(remarkParse)
    .use(remarkLinkCard)
    .use(remarkGfm)
    .use(remarkImgSrcAddPrefix(slug))
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeSlug) // add ids to h* tags
    .use(rehypeToc, {
      nav: false, // no wrapping with nav
      customizeTOC: (toc) => {
        tocNode = toc
        return false
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)

  const toc = tocNode ? toHtml(tocNode) : ''

  return {
    toc: toc,
    content: result.toString(),
  }
}