import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  getProductListApi,
  getProductDetailApi,
  getProductsBySidApi,
  getProductsByTidApi,
  getProductsByFiltersApi
} from "@/api/product";
import { ElMessage } from "element-plus";

const useProductStore = defineStore(
  "product",
  () => {
    // state
    const productList = ref([]);
    const currentProduct = ref(null);
    const loading = ref(false);

    // actions
    async function getProductList(params) {
      try {
        loading.value = true;
        const res = await getProductListApi(params);
        productList.value = res.data;
      } catch (error) {
        console.error("获取商品列表失败:", error);
        ElMessage.error("获取商品列表失败");
      } finally {
        loading.value = false;
      }
    }

    async function getProductDetail(id) {
      try {
        loading.value = true;
        const res = await getProductDetailApi(id);
        currentProduct.value = res.data;
        return res.data;
      } catch (error) {
        console.error("获取商品详情失败:", error);
        ElMessage.error("获取商品详情失败");
        return null;
      } finally {
        loading.value = false;
      }
    }

    async function getProductsBySid(sid) {
      try {
        loading.value = true;
        const res = await getProductsBySidApi(sid);
        productList.value = res.data;
      } catch (error) {
        console.error("获取商品列表失败:", error);
        ElMessage.error("获取商品列表失败");
      } finally {
        loading.value = false;
      }
    }

    async function getProductsByTid(tid) {
      try {
        loading.value = true;
        const res = await getProductsByTidApi(tid);
        productList.value = res.data;
      } catch (error) {
        console.error("获取商品列表失败:", error);
        ElMessage.error("获取商品列表失败");
      } finally {
        loading.value = false;
      }
    }

    async function getProductsByFilters(params) {
      try {
        loading.value = true;
        const res = await getProductsByFiltersApi(params);
        productList.value = res.data;
      } catch (error) {
        console.error("获取商品列表失败:", error);
        ElMessage.error("获取商品列表失败");
      } finally {
        loading.value = false;
      }
    }

    // getters
    const productCount = computed(() => productList.value.length);

    // 清理函数
    function clearCurrentProduct() {
      currentProduct.value = null;
    }

    function clearProductList() {
      productList.value = [];
    }

    return {
      // state
      productList,
      currentProduct,
      loading,

      // actions
      getProductList,
      getProductDetail,
      getProductsBySid,
      getProductsByTid,
      getProductsByFilters,
      clearCurrentProduct,
      clearProductList,

      // getters
      productCount
    };
  },
  {
    persist: {
      paths: ['productList', 'currentProduct']
    }
  }
);

export default useProductStore;