const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/setting': {
        target: 'https://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      },
      '/pattern': {
        target: 'http://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      },
      '/data': {
        target: 'https://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      }
    }
  },
})
