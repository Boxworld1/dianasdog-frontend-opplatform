const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/setting': {
        target: 'http://localhost:80', // todo:修改为你的Django服务器地址
        changeOrigin: true,
      },
      '/pattern': {
        target: 'http://localhost:80', // todo:修改为你的Django服务器地址
        changeOrigin: true,
      },
      '/data': {
        target: 'http://localhost:80', // todo:修改为你的Django服务器地址
        changeOrigin: true,
      },      
      '/login': {
        target: 'http://localhost:80', // todo:修改为你的Django服务器地址
        changeOrigin: true,
      }
    }
  },
})
