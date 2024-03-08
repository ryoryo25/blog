# ry_Tom's Blog

This is repository of ry_Tom's Blog based on [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter).

This blog is hosted on Github Pages using Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature and Markdown files as the data source.

To create the blog posts we use [`remark`](https://github.com/remarkjs/awesome-remark), [`rehype`](https://github.com/rehypejs/awesome-rehype), and some plugins to convert the Markdown files into an HTML string, and then send it down as a prop to the page.

## Notes

`blog-starter` uses [Tailwind CSS](https://tailwindcss.com) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3).

## To-Dos

- [X] ~~*Change markdown parser*~~ [2023-09-22]
- [X] ~~*Add [table of contents](https://zenn.dev/angelecho/articles/8f200e51a6b475)*~~ [2023-09-29]
- [X] ~~*Automate adding post date & update date, & erase metadata & change file name of images used by posts*~~ [2023-10-03]
- [X] ~~*Add previous & next article links*~~ [2023-10-12]
- [X] ~~*[Separate list of post by 20 posts](https://reffect.co.jp/react/nextjs-markdown-blog/#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E5%AE%9F%E8%A3%85)*~~ [2023-10-05]
- [X] ~~*Add support for Google Analytics and make it searchable from Google (generate sitemap.xml)*~~ [2024-01-16]
- [ ] Add tags to posts using front matter; click a tag to show posts containing the tag (ex: ~/tag/[tag], ~/tag/[tag]/page/2)
  ```yaml
  tags: ['foo', 'bar', 'hoge']
  ```
- [ ] Adapt to [Next.js 13](https://dev.to/slanted_dev/nextjs-13-blog-starter-1b6p)
- [ ] Generate OG image using [@vercel/og](https://zenn.dev/hiromu617/articles/c03fef6f4d6c6e)

## References

- やじはむ. [Next.jsを使った個人ブログ作成のまとめ](https://zenn.dev/rorisutarou/articles/813a97d795cf74), 2023.
- Kairi Watanabe. [Next.jsでテックブログを作った話](https://blog.kinto-technologies.com/posts/2022-12-25-develop_techblog/), 2022.
- Vercel, Inc. [Next.js Documentation](https://nextjs.org/docs), 2023.
- Tailwind Labs Inc. [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation), 2023.
- Gen Tamura. [Next.js with Tailwind CSS に Google Fonts を読み込む](https://zenn.dev/gentamura/articles/b3010bdf838554), 2023.
- Reffect. [Next.jsを利用した初めての本格的Markdownブログサイトの構築](https://reffect.co.jp/react/nextjs-markdown-blog/), 2023.