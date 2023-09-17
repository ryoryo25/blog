const prefix = process.env.GITHUB_ACTIONS ? "/blog" : ""

module.exports = {
  images: {
    unoptimized: true,
  },
  basePath: prefix,
  assetPrefix: prefix,
}