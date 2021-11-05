import http from "@/utils/http";

// 点赞
export function setLikeApi(data) {
  return http("like", {
    method: "POST",
    data,
  });
}
// 取消点赞
export function setCancelLikeApi(data) {
  return http("like/cancel", {
    method: "POST",
    data,
  });
}
