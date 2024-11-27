import http from "@/utils/http/request";
const USER = {
  LOGIN: "/auth/sign_in",
  REGIST: "/auth/sign_up",
  EAMIL: "/api/email/send-code",
  VERIFY: "/api/email/verify-code",
  ME: "/users/me",
  UPDATE: "/users/account",
  RESET_PWD: "/api/email/reset-password",
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
export const getUserInfoApi = () => {
  return http({
    method: "get",
    url: USER.ME,
  });
};

/**
 * 获取用户mock信息
 */
export const getUserInfoMockApi = () => {
  return http({
    method: "get",
    url: "/user/info",
  });
};

/**
 * 注册接口
 * @param {*} data
 */
export const registerApi = (data) => {
  return http({
    method: "post",
    url: USER.REGIST,
    data,
  });
};

/**
 * 发送email验证码
 * @param {*} data {email:string}
 */
export const sendEmailCodeApi = (data) => {
  return http({
    method: "post",
    url: USER.EAMIL,
    data,
  });
};

/**
 * 验证验证码
 * @param {*} data {email:String code:String}
 */
export const verfyCodeApi = (data) => {
  return http({
    url: USER.VERIFY,
    method: "post",
    data,
  });
};

export const changePwdApi = (data) => {
  return http({
    url: USER.RESET_PWD,
    method: "post",
    data,
  });
};
