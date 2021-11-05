module.exports = {
  environment: 'dev',
  database: {
    dbName: '7yue',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
  },
  security: {
    secretKey: 'abcdefg', //一般钥匙设置比较复杂且没有规律
    expiresIn: 60 * 60 * 24 * 30, //过期时间
  },
  wx: {
    appId: 'wxe0a364749b3d45b4',
    appSecret: '757940b1e28fbee42c7944f2dd7cde8d',
    loginUrl:
      'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  },
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl:
      'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s',
  },
  host: 'http://localhost:3000/',
};