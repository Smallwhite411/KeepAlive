const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9099,
    proxy: {
      '/api': {
        target: 'http://localhost:8880',
        changeOrigin: true,
        secure: false,
        // ws: true,
        pathRewrite: {
            '^/api': '/static/mock'   
            // 请求数据路径别名,这里是注意将static/mock放入public文件夹
        }
      }
    }
  }
})
