/**
 * 校验手机号或者邮箱
 * @param {string} type "phone" || "email"
 * @param {string} value 手机号/邮箱
 */
export const validateFn = (type, value) => {
  if (type === "phone") {
    const phoneRegex = /^1[3456789]\d{9}$/;
    return phoneRegex.test(value);
  } else if (type === "email") {
    const regEmailRegex =
      /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    return regEmailRegex.test(value);
  } else {
    throw new Error("type参数错误,只能是phone或者email");
  }
};

export const getType = (value) => {
  const phoneRegex = /^1[3456789]\d{9}$/;
  const regEmailRegex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  if (phoneRegex.test(value)) {
    return "phone";
  } else if (regEmailRegex.test(value)) {
    return "email";
  }
};
