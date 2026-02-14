module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  outDir: './out',
  autoLastmod: false,
  sitemapSize: 70000, // 1ファイルに収まるように大きめに設定
  exclude: ['/tag/*', '/page/*'], // sitemap.xmlから除外
}