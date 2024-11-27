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

export const loginApi = (data) => {
  return http({
    method: "post",
    url: USER.LOGIN,
    data,
  });
};

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

export const getUserInfoApi = () => {
  return http({
    method: "get",
    url: USER.ME,
  });
};

export const getUserInfoMockApi = () => {
  return http({
    method: "get",
    url: "/user/info",
  });
};

export const registerApi = (data) => {
  return http({
    method: "post",
    url: USER.REGIST,
    data,
  });
};

export const sendEmailCodeApi = (data) => {
  return http({
    method: "post",
    url: USER.EAMIL,
    data,
  });
};

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
