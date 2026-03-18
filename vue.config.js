const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const productionGzipExtensions = ['js', 'css']
// 获取当前时间
function getCurrentDate() {
  const time = new Date();
  const year = time.getFullYear();
  const month = (time.getMonth() + 1).toString().padStart(2, '0');
  const day = time.getDate().toString().padStart(2, '0');
  const hour = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hour}-${minute}-${seconds}`;
}
module.exports = {
  homepage: "https://studyraise.github.io/project",
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: '武汉市一文件查看-' + getCurrentDate(),
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 以多页模式构建应用程序。
  pages: undefined,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  // webpack配置
  css: {
    // 启用 CSS modules (使用 requireModuleExtension 代替废弃的 modules)
    requireModuleExtension: true,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
  },
	pwa: {
		iconPaths: {
			favicon32: 'favicon.ico',
			favicon16: 'favicon.ico',
			appleTouchIcon: 'favicon.ico',
			maskIcon: 'favicon.ico',
			msTileImage: 'favicon.ico'
		}
	},
  transpileDependencies: [
    'element-ui',
    'axios',
    'vuex',
    'vue-router'
  ],
  // 图片资源不加hash
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        options.fallback.options.name = 'static/img/[name].[ext]';
        return options;
      });
    config.resolve.alias
      .set('@', resolve('src'))
    },
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: {
    host: '0.0.0.0',
    port: 8080, // 端口号
    open: true, // 配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar
	'hotOnly': true, // 热更新
	'disableHostCheck':true,
    proxy: { // 配置自动启动浏览器
      '/': {
        'target': 'http://192.168.0.57:8081/',//zdy
        // 'target': 'http://36c73d80.r3.cpolar.top/',//li jun
        // target: 'http://192.168.0.234:9527/',
        changeOrigin: true,
        ws: false, // websocket支持
        // 'secure': false
      },
    },

  },
};
