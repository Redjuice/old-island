import http from "@/utils/http";

export function getTokenApi(data) {
  return http("token", {
    method: "POST",
    data,
  });
}
