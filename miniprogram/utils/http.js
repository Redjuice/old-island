import { Base64 } from "js-base64";

/**
 * 判断session 是否过期
 * 只服务于 request()
 * _request {function} 需要回调的方法
 * */
function checkSession(_request) {
  const { globalData } = getApp();
  let resolve = null;
  let reject = null;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  wx.checkSession({
    success: function () {
      // 没有过期
      let code = wx.getStorageSync("tokenWx");
      let codeTimes = wx.getStorageSync("codeTimes");
      let nowTimes = new Date().getTime() - codeTimes;
      if (code && nowTimes <= 60 * 4 * 1000) {
        // 4分钟内, 不重新拿 code
        globalData.code = code;
        _request && _request();
        resolve();
      } else {
        // 超过4分钟, 重新拿 code
        getCode().then(
          () => {
            // 成功拿到 code
            _request && _request();
            resolve();
          },
          () => {
            // 失败
            reject();
          }
        );
      }
    },
    fail: function () {
      // 已过期 重新拿 code
      getCode().then(
        () => {
          // 成功拿到 code
          _request && _request();
          resolve();
        },
        () => {
          // 失败
          reject();
        }
      );
    },
  });
  return promise;
}

/**
 * 微信登陆获取 code
 * 只服务于 checkSession()
 * */
function getCode() {
  const { globalData } = getApp();
  let resolve = null;
  let reject = null;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  wx.login({
    success: (res) => {
      globalData.code = res.code;
      // code写入缓存
      wx.setStorageSync("tokenWx", res.code);
      wx.setStorageSync("codeTimes", new Date().getTime());
      resolve(res);
    },
    fail: (err) => {
      console.log("wxlogin 登录失败");
      wx.showModal({
        title: "Sorry！我还不知道你是谁",
        content: "快重启小程序，注册下告诉我你是谁",
      });
      reject(err);
    },
  });
  return promise;
}

async function isRegistered(_request) {
  wx.showLoading({
    title: "加载中……",
  });
  const { globalData } = getApp();
  let resolve = null;
  let reject = null;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  try {
    await getCode();
    const { statusCode, data, code, message } = await request("token", {
      method: "POST",
      data: {
        account: globalData.code,
        type: 100,
      },
    });
    if (statusCode === 200 && code === 0) {
      wx.hideLoading();
      globalData.identity = data.register_status;
      globalData.token = data.token;
      globalData.user = data.user_info;
      _request && _request();
      resolve(true);
    } else if (statusCode === 200 && code !== 0) {
      wx.hideLoading();
      globalData.identity = 0;
      wx.showToast({
        title: message,
      });
      resolve(true);
    } else {
      wx.hideLoading();
      console.error("身份获取失败", message);
      wx.showToast({
        title: message,
      });
      reject(false);
    }
  } catch (err) {
    wx.hideLoading();
    console.error("app-isRegistered:", err);
    reject(false);
  }
  return promise;
}

/**
 * 网络状况
 * 只服务于 request()
 * */
function detectNetwork() {
  let resolve = null;
  let reject = null;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  wx.getNetworkType({
    success(res) {
      // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
      if (res.networkType === "none") {
        reject();
      } else {
        resolve();
      }
    },
  });
  return promise;
}

/**
 * 转码-base64
 * 只服务于 request()
 * */
function encode() {
  const { globalData } = getApp();
  const token = globalData.token || "";
  const base64 = Base64.encode(token + ":");
  return `Basic ${base64}`;
}

/**
 * 网络请求
 * path {string} 地址
 * options {object} 参数对象
 * contentType {string} 表头, 内容类型
 * */
function request(path, options, contentType = "application/json") {
  const { globalData } = getApp();
  let resolve;
  let reject;
  const requesting = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  // 初始化 options
  options = {
    method: "GET",
    header: {
      "content-type": contentType,
      Accept: "application/json",
    },
    data: {},
    needToken: true,
    ...options,
  };

  // 过滤 不存在健值的字段
  if (options.data) {
    options.data = Object.keys(options.data).reduce((result, key) => {
      if (
        options.data[key] &&
        (!Array.isArray(options.data[key]) || options.data[key].length)
      ) {
        result[key] = options.data[key];
      }
      return result;
    }, {});
  }

  // 微信请求
  const $request = () =>
    wx.request({
      url: globalData.host + globalData.apiRoot + path,
      data: options.data,
      method: options.method,
      header: {
        Authorization: encode(),
        ...options.header,
      },
      success: ({ data, statusCode, header }) => {
        // 400002 = token失效
        if (data.code === 400002) {
          globalData.token = "";
          isRegistered($request);
        } else if (data.code) {
          wx.showToast({
            title: data.message,
            icon: "none",
            duration: 2000,
          });
        } else {
          resolve({
            ...data,
            statusCode,
            header,
          });
        }
      },
      fail: (err) => {
        reject(err);
      },
    });

  detectNetwork()
    .then((_) => {
      $request();
    })
    .catch((_) => {
      wx.showModal({
        title: "你的网络好像罢工了",
        content: "我不喜欢网络罢工，快去检查下吧",
      });
    });

  return requesting;
}

/**
 * 网络请求(加标识)
 * module {string} 标示
 *
 * 实例方法
 * path {string} 地址
 * options {object} 参数对象
 * contentType {string} 表头, 内容类型
 * */
const createModuleRequest = (module) => {
  return (path, options, contentType) => {
    if (module) {
      return request(`${module}/${path}`, options, contentType);
    } else {
      return request(`${path}`, options, contentType);
    }
  };
};

export { checkSession, getCode, request, createModuleRequest, isRegistered };
