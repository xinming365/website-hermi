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

// 测试mock
export const loginMockApi = () => {
  return http({
    method: "post",
    url: "/user/login",
    data: {
      username: "admin",
      password: "123456",
    },
  });
};
