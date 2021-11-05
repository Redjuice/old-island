import {
  Base64
} from 'js-base64';

Page({
  // 获取token
  onGetToken() {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100,
            },
            success: (res) => {
              wx.setStorageSync('token', res.data.token);
            },
          });
        }
      },
    });
  },
  // 验证token
  onVerifyToken() {
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token'),
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },



  // 获取最新期刊
  onGetLatest() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/latest',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取下一个期刊
  onGetNext() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/7/next',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取上一个期刊
  onGetPrevious() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/7/previous',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取点赞信息
  onGetFavorInfo() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/100/1/favor',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取我喜欢的期刊
  onGetClassicFavor() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/favor',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取期刊详情
  onGetDetail() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/100/1',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },



  // 点赞
  onLike() {
    wx.request({
      url: 'http://localhost:3000/v1/like',
      method: 'POST',
      data: {
        art_id: 2,
        type: 100
      },
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 取消点赞
  onDislike() {
    wx.request({
      url: 'http://localhost:3000/v1/like/cancel',
      method: 'POST',
      data: {
        art_id: 1,
        type: 100
      },
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取热门书籍
  onGetHotBook() {
    wx.request({
      url: 'http://localhost:3000/v1/book/hot_list',
      method: 'GET',
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取书籍详情
  onGetBookDetail() {
    wx.request({
      url: 'http://localhost:3000/v1/book/1889/detail',
      method: 'GET',
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 搜索书籍
  onSearchBook() {
    wx.request({
      url: 'http://localhost:3000/v1/book/search',
      method: 'GET',
      data: {
        q: '东野圭吾',
        start: 0,
        count: 10
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取我喜欢书籍的数量
  onGetFavorCount() {
    wx.request({
      url: 'http://localhost:3000/v1/book/favor/count',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取书籍点赞的数量
  onGetBookFavor() {
    wx.request({
      url: 'http://localhost:3000/v1/book/1120/favor',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },

  // 新增书籍短评
  onAddBookShortComment() {
    wx.request({
      url: 'http://localhost:3000/v1/book/add/short_comment',
      method: 'POST',
      data: {
        book_id: 1120,
        content: '这本书真酷!'
      },
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取书籍短评
  onGetBookShortComment() {
    wx.request({
      url: 'http://localhost:3000/v1/book/1120/short_comment',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },

  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return `Basic ${base64}`
  }
});