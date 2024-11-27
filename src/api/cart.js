import http from "@/utils/http/request";

const CART = {
  LIST: "/api/cart",
  ADD: "/api/cart/add",
  DELETE: "/api/cart/delete",
  DELETE_PATCH: "/api/cart/delete_batch",
  DELETE_ALL: "/api/cart/deleteAll",
  PRICE_REPORT: "/api/cart/export-pdf",
  SHOPPING_REPORT: "/api/cart/export",
};

export const getCartListApi = () => {
  return http({
    method: "get",
    url: CART.LIST,
  });
};

export const addCartApi = (data) => {
  return http({
    url: CART.ADD,
    method: "post",
    data,
  });
};

export const deleteCartApi = (cart_id) => {
  return http({
    url: CART.DELETE,
    method: "delete",
    data: { cartId: cart_id },
  });
};

export const deletePatchApi = (data) => {
  return http({
    url: CART.DELETE_PATCH,
    method: "delete",
    data: { cartIds: data },
  });
};

export const deleteAllApi = () => {
  return http({
    url: CART.DELETE_ALL,
    method: "delete",
  });
};

export const createPriceReportApi = (data) => {
  return http({
    url: CART.PRICE_REPORT,
    method: "post",
    data,
    responseType: "blob",
  });
};
export const createShoppingReportApi = (data) => {
  return http({
    url: CART.SHOPPING_REPORT,
    method: "post",
    data,
    responseType: "blob",
  });
};
