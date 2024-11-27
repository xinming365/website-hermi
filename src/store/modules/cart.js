import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCartListApi, addCartApi, updateCartApi, selectCartApi, deleteCartApi, deleteAllCartApi } from "@/api/cart";

const useCartStore = defineStore(
  "cart",
  () => {
    //state
    const cartList = ref([]);
    async function getCartData() {
      const res = await getCartListApi();
      console.log(res);
      cartList.value = res.data.list;
    }

    // 添加到购物车
    async function addCart(data) {
      await addCartApi(data);
      // 重新获取最新购物车数据
      getCartData();
    }

    // 更新购物车商品数量
    async function updateCart(data) {
      await updateCartApi(data);
      getCartData();
    }

    // 选择/取消选择购物车商品
    async function selectCart(data) {
      await selectCartApi(data);
      getCartData();
    }

    // 删除购物车商品
    async function deleteCart(data) {
      await deleteCartApi(data);
      getCartData();
    }

    // 清空购物车
    async function deleteAllCart() {
      await deleteAllCartApi();
      getCartData();
    }

    //   getters
    const totalCount = computed(() =>
      cartList.value.reduce((total, current) => total + current.p_num, 0)
    );

    return {
      cartList,
      totalCount,
      getCartData,
      addCart,
      updateCart,
      selectCart,
      deleteCart,
      deleteAllCart,
    };
  },
  {
    persist: true,
  }
);

export default useCartStore;
