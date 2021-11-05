// app.js
App({
  globalData: {
    /* ———————————————————————— 公共参数  —————————————————————— */
    scene: false, // 进入场景
    user: null, // 用户信息
    token: "", // token，传给后端
    system: null, // 手机系统信息
    isIpx: false, // 是否是iphonex
    canUseCustomerNav: false, // 是否可用自定义导航
    identity: 0, // 身份状态： 0=无身份(未判断)
    /* ———————————————————————— 业务参数  —————————————————————— */
  },

  // 第一次进入时 获取基本参数
  onLaunch(option) {
    let token = wx.getStorageSync("token");
    if (token) {
      this.globalData.token = wx.getStorageSync("token");
      this.globalData.user = wx.getStorageSync("user_info");
    }
    this.globalData.scene = option.scene;
    const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
    if (JSON.stringify(extConfig) !== "{}") {
      this.globalData = {
        ...this.globalData,
        ...extConfig,
      };
    } else {
      this.globalData.host = "http://localhost:3000/";
      this.globalData.apiRoot = "v1/";
    }

    //  版本更新
    this.systemUpdateFn();
    // 运行环境
    this.getSystemInfo();
    // 页面增强
    // this.enhancePage();
    // 打开调试
    // wx.setEnableDebug({
    //   enableDebug: true,
    // });
  },

  onShow() {},

  // 比较特殊不要删除
  onHide() {},

  onUnLoad() {},

  onPageNotFound() {},

  onError(err) {
    console.log("出错了: " + err);
  },

  // 版本检测-更新
  systemUpdateFn() {
    if (wx.canIUse("getUpdateManager")) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        wx.showLoading({
          title: "检查更新中...",
          mask: true,
        });
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: (res) => {
                if (res.confirm) {
                  updateManager.applyUpdate();
                  wx.hideLoading();
                } else {
                  wx.hideLoading();
                }
              },
            });
          });
          updateManager.onUpdateFailed(() => {
            wx.hideLoading();
          });
        } else {
          wx.hideLoading();
        }
      });
    }
  },

  // 获取系统环境
  getSystemInfo() {
    try {
      const res = wx.getSystemInfoSync();
      this.globalData.systemInfo = res;
      const { model, version, SDKVersion } = res;
      this.globalData.system = res;
      // 判断是否为iPhoneX iphone 11 12
      if (
        /iphone\sx/i.test(model) ||
        (/iphone/i.test(model) && /unknown/.test(model)) ||
        /iphone\s1[1,2]/i.test(model)
      ) {
        this.globalData.isIpx = true;
      } else {
        this.globalData.isIpx = false;
      }
      // customerNav
      let _version = parseInt(version.split(".").join(""));
      let _SDKVersion = parseInt(SDKVersion.split(".").join(""));
      if (_version > 700 && _SDKVersion > 243) {
        this.globalData.canUseCustomerNav = true;
      }
    } catch (e) {
      console.log("app-getSystemInfo", e);
    }
  },
});
