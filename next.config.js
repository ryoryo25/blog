const prefix = process.env.GITHUB_ACTIONS ? undefined : ''

module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: prefix,
  basePath: prefix,
  trailingSlash: true,
}