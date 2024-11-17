// 购物车业务的mock
/* 
[
  {
    id: 1,
    isSelected: false,
    name: "Nd:YAG激光线反射镜，UVFS，直径 12.7 mm，工作波长 349 nm-358 nm，背面磨砂",
    price: 100,
    count: 1,
    type: "NPM05-355-HP",
    image:
      "https://www.lbtek.com/uploads/images/others/20240229/7adf9c2b3905ce50a56ce98ccf4d5a79.jpg",
  },
  {
    id: 2,
    isSelected: false,
    name: "Nd:YAG激光线反射镜，UVFS，直径 12.7 mm，工作波长 349 nm-358 nm，背面磨砂",
    price: 200,
    count: 1,
    type: "NPM05-355-HP",
    image:
      "https://www.lbtek.com/uploads/images/others/20240229/7adf9c2b3905ce50a56ce98ccf4d5a79.jpg",
  },
  {
    id: 3,
    isSelected: false,
    name: "Nd:YAG激光线反射镜，UVFS，直径 12.7 mm，工作波长 349 nm-358 nm，背面磨砂",
    price: 300,
    count: 1,
    type: "NPM05-355-HP",
    image:
      "https://www.lbtek.com/uploads/images/others/20240229/7adf9c2b3905ce50a56ce98ccf4d5a79.jpg",
  },
  {
    id: 4, // id
    isSelected: false, // 是否选中状态
    name: "Nd:YAG激光线反射镜，UVFS，直径 12.7 mm，工作波长 349 nm-358 nm，背面磨砂", // 名称
    price: 400, // 价格
    count: 1, // 数量
    type: "NPM05-355-HP", // 型号
    image:
      "https://www.lbtek.com/uploads/images/others/20240229/7adf9c2b3905ce50a56ce98ccf4d5a79.jpg",
  },
]
*/
function createCartList() {
  return [
    {
      //总id
      id: 148,
      //子id
      sid: 247,
      //产品id
      p_id: 1001,
      //数量
      p_num: 1,
      //价格
      price: 200,
      // 缩略图
      p_thumb:
        "https://www.lbtek.com/uploads/images/others/20240229/7adf9c2b3905ce50a56ce98ccf4d5a79.jpg", //缩略图
      //产品型号
      p_code: "NPM05-355-HP",
      //产品描述
      p_desc:
        "Nd:YAG激光线反射镜，UVFS，直径 12.7 mm，工作波长 349 nm-358 nm，背面磨砂", //详细规格描述
      // 是否选中
      isSelected: false,
    },
    {
      //总id
      id: 149,
      //子id
      sid: 248,
      //产品id
      p_id: 1002,
      //数量
      p_num: 2,
      //价格
      price: 300,
      // 缩略图
      p_thumb:
        "https://www.lbtek.com/uploads/images/others/20240229/7adf9c2b3905ce50a56ce98ccf4d5a79.jpg", //缩略图
      //产品型号
      p_code: "NPM05-355-HP 222",
      //产品描述
      p_desc:
        "Nd22:YAG激光线反射镜，UVFS，直径 12.7 mm，工作波长 349 nm-358 nm，背面磨砂", //详细规格描述
      isSelected: false,
    },
    {
      //总id
      id: 149,
      //子id
      sid: 249,
      //产品id
      p_id: 1003,
      //数量
      p_num: 1,
      //价格
      price: 1000,
      // 缩略图
      p_thumb:
        "https://www.lbtek.com/uploads/images/others/20240229/7adf9c2b3905ce50a56ce98ccf4d5a79.jpg", //缩略图
      //产品型号
      p_code: "NPM05-355-HP 333",
      //产品描述
      p_desc:
        "Nd333:YAG激光线反射镜，UVFS，直径 12.7 mm，工作波长 349 nm-358 nm，背面磨砂", //详细规格描述
      isSelected: false,
    },
    {
      //总id
      id: 150,
      //子id
      sid: 250,
      //产品id
      p_id: 1004,
      //数量
      p_num: 3,
      //价格
      price: 600,
      // 缩略图
      p_thumb:
        "https://www.lbtek.com/uploads/images/others/20240229/7adf9c2b3905ce50a56ce98ccf4d5a79.jpg", //缩略图
      //产品型号
      p_code: "NPM05-355-HP 444",
      //产品描述
      p_desc:
        "Nd444:YAG激光线反射镜，UVFS，直径 12.7 mm，工作波长 349 nm-358 nm，背面磨砂", //详细规格描述
      isSelected: false,
    },
  ];
}
const cartList = createCartList();
/**
 * 获取购物车接口
 * /api/cart/list
 * Get
 */
const getCartList = {
  url: "/api/cart/list",
  method: "get",
  response: (request) => {
    return {
      code: 200,
      msg: "success",
      data: {
        list: cartList,
      },
    };
  },
};

/**
 * 添加购物车接口
 * /api/cart/add
 * Post
 * @param p_id 商品id
 * @param p_num 商品数量
 * @param sn 商品型号
 */
function createItem(p_id, p_num, sn) {
  const lastItem = createCartList()[createCartList().length - 1];
  return {
    id: lastItem.id + 1,
    sid: lastItem.sid + 1,
    p_id,
    p_num,
    price: lastItem.price + 5,
    p_thumb:
      "https://www.lbtek.com/uploads/images/others/20240229/7adf9c2b3905ce50a56ce98ccf4d5a79.jpg", //缩略图
    p_code: sn,
    p_desc:
      "Nd:YAG激光线反射镜，UVFS，直径 12.7 mm，工作波长 349 nm-358 nm，背面磨砂",
    isSelected: false,
  };
}
const addCart = {
  url: "/api/cart/add",
  method: "post",
  response: (request) => {
    let { p_id, p_num, sn } = request.body;
    p_num = +p_num;
    const goods = cartList.find((item) => item.p_id === p_id);
    if (!goods) {
      const newItem = createItem(p_id, p_num, sn);
      cartList.push(newItem);
      return {
        code: 200,
        msg: "新添加成功",
        data: { ...newItem },
      };
    } else {
      goods.p_num += p_num;
      return {
        code: 200,
        msg: "已存在商品,数量已经+1",
        data: { ...goods },
      };
    }
  },
};

// 导出
export default [getCartList, addCart];
