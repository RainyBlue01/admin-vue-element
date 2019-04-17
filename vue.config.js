module.exports = {
  devServer: {
    // host: 'localhost',
    port: 9000,
    proxy: {
      '/web/': {
        target: process.env.SERVER_PROXY
      }
    }
  }
}
