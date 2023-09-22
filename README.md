# ry_Tom's Blog

This is repository of ry_Tom's Blog based on [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter).

This blog is hosted on Github Pages using Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature and Markdown files as the data source.

To create the blog posts we use [`remark`](https://github.com/remarkjs/awesome-remark), [`rehype`](https://github.com/rehypejs/awesome-rehype), and some plugins to convert the Markdown files into an HTML string, and then send it down as a prop to the page.

## Notes

`blog-starter` uses [Tailwind CSS](https://tailwindcss.com) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3).

## To-Dos

- [X] ~~*Change markdown parser*~~ [2023-09-22]
- [ ] Add [table of contents](https://zenn.dev/angelecho/articles/8f200e51a6b475)
- [ ] Adapt to [Next.js 13](https://dev.to/slanted_dev/nextjs-13-blog-starter-1b6p)
- [ ] Generate OG image using [@vercel/og](https://zenn.dev/hiromu617/articles/c03fef6f4d6c6e)
