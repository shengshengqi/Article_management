import axios from "axios";

// export default service;
export const baseUrl = "http://localhost:3001";

axios.defaults.baseURL = baseUrl;
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// 封装GET请求
export function get(url, params) {
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
export function post(url, params) {
  console.log("post", url, params);
  return axios
    .post(url, params)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export const upload = function (url, formdata) {
  return fetch(baseUrl + "/upload", {
    method: "POST",
    body: formdata,
  }).then((res) => res.json());
};

export default {
  get,
  post,
  upload,
};
