import http from "@/utils/http/request";

export const PRODUCT = {
  DETAIL: "/api/product",
};

// 获取商品列表（支持 sid/tid 筛选）
export const getProductListApi = (params) => {
  return http({
    method: "get",
    url: PRODUCT.DETAIL,
    params,
  });
};

// 获取商品详情
export const getProductDetailApi = (id) => {
  return http({
    method: "get",
    url: PRODUCT.DETAIL,
    params: { id }
  });
};

// 通过 sid 获取商品列表
export const getProductsBySidApi = (sid) => {
  return http({
    method: "get",
    url: PRODUCT.DETAIL,
    params: { sid }
  });
};

// 通过 tid 获取商品列表
export const getProductsByTidApi = (tid) => {
  return http({
    method: "get",
    url: PRODUCT.DETAIL,
    params: { tid }
  });
};

// 组合查询（支持多个条件）
export const getProductsByFiltersApi = (params) => {
  return http({
    method: "get",
    url: PRODUCT.DETAIL,
    params
  });
};
