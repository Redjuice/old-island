import { createModuleRequest } from '../utils/http';

const request = createModuleRequest();

// 获取最新期刊
export function getLatestApi(data) {
  return request("classic/latest", {
    method: "GET",
    data,
  });
}
// 下一个期刊
export function getClassicNextApi(index) {
  return request(`classic/${index}/next`, {
    method: "GET",
  });
}
// 上一个期刊
export function getPreviousNextApi(index) {
  return request(`classic/${index}/previous`, {
    method: "GET",
  });
}