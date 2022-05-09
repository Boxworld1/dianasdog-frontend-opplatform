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
        target: 'https://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      },
      '/data': {
        target: 'https://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      },      
      '/login': {
        target: 'https://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      },
      '/category': {
        target: 'https://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      },
      '/item': {
        target: 'https://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      },
      '/AllUser': {
        target: 'https://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      },
      '/userDelete': {
        target: 'https://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      },
      '/userAdd': {
        target: 'https://Backend-DianasDog.app.secoder.net', // todo:修改为你的Django服务器地址
        secure: false,
        changeOrigin: true,
      },

    }
  },
})
