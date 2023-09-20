module.exports = {
  output: process.env.NODE_ENV == 'development' ? undefined : 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? undefined : '',
  trailingSlash: true,
}