import axios from "axios";

// export default service;
axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// 封装GET请求
function get(url, params) {
  return axios
    .get(url, { params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}
// 封装POST请求
function post(url, params) {
  return axios
    .post({
      url,
      data: params,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export default {
  get,
  post,
};
