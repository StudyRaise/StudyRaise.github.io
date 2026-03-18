const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  transpileDependencies: [
    'element-ui',
    'axios',
    'vuex',
    'vue-router'
  ],
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
