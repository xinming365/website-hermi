import http from "@/utils/http/request";

const CART = {
  LIST: "/cart/list",
  ADD: "/cart/add",
  UPDATE: "/cart/update",
  SELECT: "/cart/select",
  DELETE: "/cart/delete",
  DELETE_ALL: "/cart/deleteAll",
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
 * @param data { sn,p_num }
 */
export const addCartApi = (data) => {
  return http({
    url: CART.ADD,
    method: "post",
    data,
  });
};

/**
 * 更新购物车商品数量
 * @param data { sku_id, quantity }
 */
export const updateCartApi = (data) => {
  return http({
    url: CART.UPDATE,
    method: "put",
    data,
  });
};

/**
 * 选择/取消选择购物车商品
 * @param data { selected, cartIds }
 */
export const selectCartApi = (data) => {
  return http({
    url: CART.SELECT,
    method: "put",
    data,
  });
};

/**
 * 删除购物车商品
 * @param data { cartId  }
 */
export const deleteCartApi = (data) => {
  return http({
    url: CART.DELETE,
    method: "delete",
    data,
  });
};

/**
 * 清空购物车
 */
export const deleteAllCartApi = () => {
  return http({
    url: CART.DELETE_ALL,
    method: "delete",
  });
};