import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypeStringify from 'rehype-stringify'
import { toHtml } from 'hast-util-to-html'

export default async function markdownToHtml(markdown: string) {
  let tocNode = null
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeSlug) // add ids to h* tags
    .use(rehypeToc, {
      nav: false, // no wrapping with nav
      customizeTOC: (toc) => {
        tocNode = toc
        return false
      },
    })
    .use(rehypeStringify)
    .process(markdown)

  const toc = tocNode ? toHtml(tocNode) : ''

  return {
    toc: toc,
    content: result.toString(),
  }
}