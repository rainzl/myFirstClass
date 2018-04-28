module.exports = {
  proxyList: {
    '/normalLx': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {'^/normalLx': '/normalLx' }
    }
  }
}
