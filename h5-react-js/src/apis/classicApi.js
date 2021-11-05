import http from "@/utils/http";

// 获取最新期刊
export function getLatestApi(params) {
  return http("classic/latest", {
    method: "GET",
    params,
  });
}
// 下一个期刊
export function getClassicNextApi(index) {
  return http(`classic/${index}/next`, {
    method: "GET",
  });
}
// 上一个期刊
export function getPreviousNextApi(index) {
  return http(`classic/${index}/previous`, {
    method: "GET",
  });
}
