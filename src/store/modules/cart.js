import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCartListApi } from "@/api/cart";

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
    //   getters
    const totalCount = computed(() =>
      cartList.value.reduce((total, current) => total + current.p_num, 0)
    );

    return {
      cartList,
      totalCount,
      getCartData,
    };
  },
  {
    persist: true,
  }
);

export default useCartStore;
