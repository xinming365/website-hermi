import axios from "axios";
import { checkStatus } from "./checkSatus";
import useUserStore from "@/store/modules/user";

const http = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 拦截请求
http.interceptors.request.use(
  (config) => {
    console.log("拦截请求", config);
    const userStore = useUserStore();
    const token = userStore.getToken;
    console.log("请求拦截token", token);
    config.headers["Authorization"] = token;
    // config.headers['Authorization'] = 'Bearer ' + token
    // console.log("请求", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 拦截响应
http.interceptors.response.use(
  (response) => {
    // // console.log("拦截响应", response);
    // //刷新token
    // const newToken = response.headers['x-token']
    // // console.log("newToken", newToken);
    // newToken && localStorage.setItem('token', newToken)
    return response.data;
  },
  (error) => {
    const status = error.response.status;
    const errMsg = "";
    checkStatus(status, errMsg);
    return Promise.reject(error);
  }
);

export default http;
