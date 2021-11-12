/**
 * @description 导出默认通用配置
 */

const setting = {
  // 开发以及部署时的URL，hash模式时在不确定二级目录名称的情况下建议使用""代表相对路径或者"/二级目录/"，history模式默认使用"/"或者"/二级目录/"
  publicPath: '/',
  // 生产环境构建文件的目录名
  outputDir: process.env.outputDir || 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 设置生产环境的 source map 开启与关闭。正式环境不需要
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: false,
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: false,
  // 默认的接口地址
  baseURL: getBaseUrL(),
  // API版本
  apiVersion: process.env.VUE_APP_API_VERSION,
  // 代理地址
  proxyURL: process.env.VUE_APP_API_ROOT,
  // 图片上传地址
  uploadUrl: getBaseUrL() + 'common/upload',
  // 开发环境端口号
  devPort: '9999',
  // 开发服务器启动时自动在浏览器中打开应用程序
  open: true,
  // 标题 （包括页面的标题 浏览器的标题）
  title: '壳牌电商管理系统',
  // 路由模式，可选值为 history 或 hash
  routerMode: 'history',
  // 不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/callback', '/404', '/403'],
  // 加载时显示文字
  loadingText: '正在加载中...',
  // token名称
  tokenName: 'accessToken',
  // token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: 'accessToken',
  // token存储位置localStorage sessionStorage cookie
  storage: 'localStorage',
  // 上传图片限制大小(MB)
  imageSize: 10,
  // 上传视频限制大小(MB)
  videoSize: 100
}

// 获取baseurl
function getBaseUrL() {
  let api
  // typeof可以用来检查一个没有声明的变量，而不报错。
  // http://javascript.ruanyifeng.com/grammar/types.html#toc1
  if (
    typeof window != 'undefined' &&
    window.location.hostname === 'localhost'
  ) {
    api = `${window.location.origin}/${process.env.VUE_APP_API_VERSION}`
  } else {
    api = `${process.env.VUE_APP_API_ROOT}${process.env.VUE_APP_API_VERSION}`
  }
  return api
}
module.exports = setting
