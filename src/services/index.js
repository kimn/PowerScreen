import KRequest from "./request";

export function getPowerScreenData() {
  return KRequest.get({
    url: "/powerscreen",
  });
}
