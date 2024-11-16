import http from "@/utils/http/request";
const USER = {
  LOGIN: "/login",
};

/**
 *登录接口
 * @param data
 */
export const loginApi = (data) => {
  return http({
    method: "post",
    url: USER.LOGIN,
    data,
  });
};

/**
 *模拟登录mock接口
 * @param  data {username:string,password:string}
 */
export const loginMockApi = (data) => {
  return http({
    method: "post",
    url: "/user/login",
    data: {
      username: "admin",
      password: "123456",
    },
  });
};

/**
 * 获取用户信息
 */
export const getUserInfoMockApi = () => {
  return http({
    method: "get",
    url: "/user/info",
  });
};
