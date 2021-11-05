// 是否第一个期刊
const isFirst = (index) => {
  return index == 1 ? true : false;
};

// 是否最后一个期刊
const isLatest = (index) => {
  let latestIndex = getLatestIndex();
  return latestIndex == index ? true : false;
};

const getMyFavor = (success) => {
  const params = {
    url: "classic/favor",
    success: success,
  };
  this.request(params);
};

const getById = (cid, type, success) => {
  let params = {
    url: `classic/${type}/${cid}`,
    success: success,
  };
  this.request(params);
};

// 设置最后一个期刊
const setLatestIndex = (index) => {
  localStorage.setItem("latest", index);
};

// 获取最后一个期刊
const getLatestIndex = () => {
  const index = localStorage.getItem("latest");
  return index;
};

// 获取缓存的期刊key值
const getKey = (index) => {
  const key = "classic-" + index;
  return key;
};

export {
  isFirst,
  isLatest,
  getMyFavor,
  getById,
  setLatestIndex,
  getLatestIndex,
  getKey,
};
