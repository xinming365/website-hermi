import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  getCartListApi,
  deleteCartApi,
  deleteAllApi,
  deletePatchApi,
  createPriceReportApi,
  createShoppingReportApi,
  addCartApi,
} from "@/api/cart";
import { ElMessage, ElMessageBox } from "element-plus";
import { createModalForDownload } from "@/utils/blob/blob";

const useCartStore = defineStore(
  "cart",
  () => {
    //state
    const cartList = ref([]);
    async function getCartData() {
      const res = await getCartListApi();
      console.log("获取购物车", res);
      addPropsInData(res);
      // cartList.value = res.data.items;
    }
    function addPropsInData(res) {
      cartList.value = res.data.items.map((item) => {
        item.isSelected = false;
        return item;
      });
    }
    async function addCart(sku_id, quantity) {
      const res = await addCartApi({ sku_id, quantity });
      if (res.status) {
        ElMessage({
          type: "success",
          message: "添加成功",
          showClose: true,
          duration: 1000,
        });
      }
    }
    async function deleteOne(cart_id) {
      const res = await deleteCartApi(cart_id);
      console.log(res);
      if (res.status) ElMessage.success("删除成功");
    }
    async function deletePatch(cartIds) {
      const res = await deletePatchApi(cartIds);
      console.log(res);
      if (res.status) ElMessage.success("删除成功");
    }
    async function deleteAll() {
      await ElMessageBox.confirm("确定清空购物车吗?", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "不，再想想",
        type: "warning",
      }).then(async () => {
        const res = await deleteAllApi();
        if (res.status) ElMessage.success("已全部移出!");
      });
    }
    function updateBadge() {}
    //   getters
    const totalCount = computed(() =>
      cartList.value.reduce((total, current) => total + current.quantity, 0)
    );
    async function createPriceReport(params) {
      const res = await createPriceReportApi(params);
      if (res) createModalForDownload(res, "pdf");
    }
    async function createShoppingReport(params) {
      const res = await createShoppingReportApi(params);
      if (res) createModalForDownload(res, "xlsx");
    }

    return {
      cartList,
      totalCount,
      getCartData,
      deleteOne,
      deletePatch,
      deleteAll,
      updateBadge,
      createPriceReport,
      createShoppingReport,
      addCart,
    };
  },
  {
    persist: true,
  }
);

export default useCartStore;
