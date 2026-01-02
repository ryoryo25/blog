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
import { Root, Paragraph, Code, Image, InlineCode, Html } from 'mdast'

import { ASSETS_PREFIX } from './constants'
import { url } from '../utils/config'

const URL_PREFIX = /https?:\/\//
const YOUTUBE_EMBED_PREFIX = 'youtube-embed:'
const VIDEO_EMBED_PREFIX = 'video-embed:'

/**
 * A unified plugin that inspects the AST and logs it to the console.
 * Useful for debugging.
 *
 * @returns Plugin
 */
const unifiedInspect: Plugin = () => {
  return (tree, file) => {
    console.log(inspect(tree))
  }
}

/**
 * Embeds YouTube videos in markdown.
 * * Usage: Use inline code with the format `youtube-embed:VIDEO_ID`
 * * Example: `` `youtube-embed:dQw4w9WgXcQ` ``
 *
 * See also: https://github.com/pkolt/remark-youtube
 *
 * @returns Plugin
 */
const remarkYoutubeEmbed: Plugin = () => {
  return (tree: Root, file) => {
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (node.children && node.children.length === 1 && node.children[0].type === 'inlineCode') {
        const inlineCode = node.children[0] as InlineCode
        if (inlineCode.value.startsWith(YOUTUBE_EMBED_PREFIX)) {
          const videoId = inlineCode.value.replace(YOUTUBE_EMBED_PREFIX, '').trim()
          const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`
          const htmlNode: Html = {
            type: 'html',
            value: `<div class="video-container"><iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`,
          }
          parent.children.splice(index, 1, htmlNode)
        }
      }
    })
  }
}

/**
 * Embeds videos from various platforms in markdown.
 * * Usage: Use code block with the format:
 *   ```video-embed:
 *   {
 *     "src": "VIDEO_URL",
 *     "allow": "ALLOW_ATTRIBUTES",
 *     "allowfullscreen": true/false
 *   }
 *   ```
 *
 * @returns Plugin
 */
const remarkVideoEmbed: Plugin = () => {
  return (tree: Root, file) => {
    visit(tree, 'code', (node: Code, index, parent) => {
        const code = node.value
        // Add other video platforms here
        if (code.startsWith(VIDEO_EMBED_PREFIX)) {
          const videoInfo = eval(`(${code.replace(VIDEO_EMBED_PREFIX, '').trim()})`) // hack
          const htmlNode: Html = {
            type: 'html',
            value: `<div class="video-container"><iframe src="${videoInfo.src}" allow="${videoInfo.allow}" allowfullscreen="${videoInfo.allowfullscreen}"></iframe></div>`,
          }
          parent.children.splice(index, 1, htmlNode)
        }
    })
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
    .use(remarkVideoEmbed)
    .use(unifiedInspect) // for debugging
    .use(remarkYoutubeEmbed)
    .use(remarkLinkCard, { cache: false })
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