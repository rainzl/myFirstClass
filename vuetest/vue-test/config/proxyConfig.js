module.exports = {
  proxyList: {
    '/normalLx': {
      //target: 'http://localhost:8090',
      target: 'http://172.23.4.73:8080',
      changeOrigin: true,
      pathRewrite: {'^/normalLx': '/normalLx' }
    }
  }
}
