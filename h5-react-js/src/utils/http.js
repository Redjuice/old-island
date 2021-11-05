import axios from "axios";
import { Base64 } from "js-base64";
import { Toast } from "antd-mobile";

// api 配置
let config = {
  baseURL: "v1",
  timeout: 10000,
  withCredentials: true,
};

const http = axios.create(config);

http.defaults.headers.post["Content-Type"] = "application/json";

/** 请求拦截器 **/
http.interceptors.request.use(
  (config) => {
    Toast.loading("Loading...", 0);
    config.headers["Authorization"] = encode();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** 响应拦截器 **/
http.interceptors.response.use(
  (response) => {
    Toast.hide();
    const { code } = response.data;
    if (code === 0) {
      return Promise.resolve(response.data.data);
    } else {
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    Toast.hide();
    if (error.response) {
      return Promise.reject(error);
    } else {
      return Promise.reject("请求超时, 请刷新重试");
    }
  }
);

/**
 * 转码-base64
 * 只服务于 request()
 * */
const encode = () => {
  const token = localStorage.getItem("TOKEN") || "";
  const base64 = Base64.encode(token + ":");
  return `Basic ${base64}`;
};

export default http;
