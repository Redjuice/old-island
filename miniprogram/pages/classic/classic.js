import {
  getLatestApi,
  getClassicNextApi,
  getPreviousNextApi,
} from "../../apis/classic";
import { setLikeApi, setCancelLikeApi } from "../../apis/like";
import { isRegistered } from "../../utils/http";
import { setLatestIndex, isFirst, isLatest, getKey } from "./utils";

const { globalData } = getApp();

Component({
  properties: {
    cid: Number,
    type: Number,
  },

  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false,
  },

  lifetimes: {
    async attached(options) {
      if (!globalData.identity) await isRegistered();
      const {data} = await getLatestApi();
      this.setData({
        classic: data,
        likeCount: data.fav_nums,
        likeStatus: data.like_status,
      });
      // 设置最新期刊
      setLatestIndex(data.index);
      let key = getKey(data.index);
      wx.setStorageSync(key, data);
    },
  },

  methods: {
    // 点赞/取消点赞
    async onLike(event) {
      const { id, type } = this.data.classic;
      const behavior = event.detail.behavior;
      const params = {
        art_id: id,
        type,
      };
      if (behavior == "like") {
        await setLikeApi(params);
      } else {
        await setCancelLikeApi(params);
      }
    },

    // 下一个期刊
    onNext(event) {
      this.updateClassic("next");
    },

    // 上一个期刊
    onPrevious(event) {
      this.updateClassic("previous");
    },

    // 更新期刊
    async updateClassic(nextOrPrevious) {
      const index = this.data.classic.index;
      let key =
        nextOrPrevious == "next" ? getKey(index + 1) : getKey(index - 1);
      let classic = wx.getStorageSync(key);
      let res = null;
      if (classic) {
        res = classic;
      }else {
        if (nextOrPrevious === "previous") {
          res = await getPreviousNextApi(index);
        } else {
          res = await getClassicNextApi(index);
        }
      }
      this.setData({
        classic: res,
        latest: isLatest(res.index),
        first: isFirst(res.index),
      });
      wx.setStorageSync(getKey(res.index), res);
    },
  },
});
