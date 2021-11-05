import React, { Component } from "react";

import { getTokenApi } from "@/apis/tokenApi";
import {
  getLatestApi,
  getPreviousNextApi,
  getClassicNextApi,
} from "@/apis/classicApi";
import { setLikeApi, setCancelLikeApi } from "@/apis/likeApi";

import Episode from "@/components/Episode";
import Like from "@/components/Like";
import Share from "@/components/Share";
import Movie from "@/components/classic/Movie";
import Music from "@/components/classic/Music";
import Essay from "@/components/classic/Essay";
import Navi from "@/components/Navi";

import { setLatestIndex, isFirst, isLatest, getKey } from "./utils";

import shareIcon from "@/images/icon/share.png";

import style from "./index.module.css";

class Index extends Component {
  state = {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false,
    showElem: "none",
  };

  async componentDidMount() {
    if (!localStorage.getItem("TOKEN")) await this.getTokenApi();
    this.getLatest();
  }

  // 获取token
  getTokenApi = async () => {
    await getTokenApi({
      account: "630352167@qq.com",
      secret: "123$456",
      type: 101,
    }).then((res) => {
      localStorage.setItem("TOKEN", res.token);
    });
  };

  // 获取最新期刊
  getLatest = async () => {
    await getLatestApi().then((res) => {
      const { fav_nums, like_status, index } = res;
      this.setState({
        classic: res,
        likeCount: fav_nums,
        likeStatus: like_status,
      });
      // 设置最新期刊
      setLatestIndex(index);
      let key = getKey(index);
      localStorage.setItem(key, JSON.stringify(res));
    });
  };

  // 点赞/取消点赞
  onLike = async (behavior) => {
    const {
      classic: { id, type },
    } = this.state;
    const params = {
      art_id: id,
      type,
    };
    if (behavior === "like") {
      await setLikeApi(params).then(() => {
        let { likeCount, likeStatus } = this.state;
        this.setState({
          likeCount: (likeCount += 1),
          likeStatus: !likeStatus,
        });
      });
    } else {
      await setCancelLikeApi(params).then(() => {
        let { likeCount, likeStatus } = this.state;
        this.setState({
          likeCount: (likeCount -= 1),
          likeStatus: !likeStatus,
        });
      });
    }
  };

  // 下一个期刊
  onNext = () => {
    if (!this.state.latest) this.updateClassic("next");
  };

  // 上一个期刊
  onPrevious = () => {
    if (!this.state.first) this.updateClassic("previous");
  };

  // 更新期刊
  async updateClassic(nextOrPrevious) {
    const index = this.state.classic.index;
    let key = nextOrPrevious == "next" ? getKey(index + 1) : getKey(index - 1);
    let classic = localStorage.getItem(key);
    let res = null;
    if (classic) {
      res = JSON.parse(classic);
    } else {
      if (nextOrPrevious === "previous") {
        res = await getPreviousNextApi(index);
      } else {
        res = await getClassicNextApi(index);
      }
    }
    this.setState({
      classic: res,
      latest: isLatest(res.index),
      first: isFirst(res.index),
    });
    localStorage.setItem(getKey(res.index), JSON.stringify(res));
  }

  renderComponent = (classic) => {
    if (classic.type === 100) {
      return <Movie img={classic.image} content={classic.content} />;
    }
    if (classic.type === 200) {
      return <Music img={classic.image} content={classic.content} url={classic.url} />;
    }
    if (classic.type === 300) {
      return <Essay img={classic.image} content={classic.content} />;
    }
  };

  render() {
    const { classic, likeStatus, likeCount, first, latest } = this.state;
    if (classic) {
      return (
        <div className={style.container}>
          <div className={style.header}>
            <Episode index={classic.index} />
            <div className={style.likeContainer}>
              <Like like={likeStatus} count={likeCount} onLike={this.onLike} />
              <Share>
                <img className={style.share} src={shareIcon} />
              </Share>
            </div>
          </div>

          {this.renderComponent(classic)}

          <div className={style.navi}>
            <Navi
              title={classic.title}
              first={first}
              latest={latest}
              onPrevious={this.onPrevious}
              onNext={this.onNext}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Index;
