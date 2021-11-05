import { createModuleRequest } from "../utils/http";

const request = createModuleRequest();

// 点赞
export function setLikeApi(data) {
  return request("like", {
    method: "POST",
    data,
  });
}
// 取消点赞
export function setCancelLikeApi(data) {
  return request("like/cancel", {
    method: "POST",
    data,
  });
}