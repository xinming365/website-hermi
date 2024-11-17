import http from "@/utils/http/request";

const CART = {
  LIST: "/cart/list",
  ADD: "/cart/add",
};

/**
 * 获取购物车列表
 */
export const getCartListApi = () => {
  return http({
    method: "get",
    url: CART.LIST,
  });
};

/**
 * 添加到购物车
 * @param data { p_id,p_num,sn}
 */
export const addCartApi = (data) => {
  return http({
    url: CART.ADD,
    method: "post",
    data,
  });
};
