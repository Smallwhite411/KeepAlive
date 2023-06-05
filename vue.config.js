const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        // ws: true,
        secure: false,
        pathRewrite: {"^/api":""}
      }
    }
  }
})
