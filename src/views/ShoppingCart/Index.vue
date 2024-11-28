<template>
  <div class="cart">
    <h1>购物车</h1>
    <div class="cart-content">
      <el-empty
        class="cart-empty"
        v-if="cartItems.length === 0"
        description="购物车是空的"
      ></el-empty>
      <div v-else>
        <!-- 全选按钮 -->
        <div class="goods-select">
          <div class="checkbox" @click="handleClickAll">
            <img
              src="@/assets/images/icon/selected.png"
              v-if="isSelectedAll"
              alt=""
            />
            <img src="@/assets/images/icon/unselected.png" v-else alt="" />
          </div>
          <div class="check-text">全选</div>
          <!-- 删除按钮 -->
          <div class="delete">
            <el-button
              type="info"
              text
              size="small"
              round
              @click="handlePatchDelete"
              >批量删除</el-button
            >
            <el-button type="danger" size="small" round @click="onDeleteAll"
              >清空购物车</el-button
            >
            <el-button type="primary" size="small" round @click="onShowModal(0)"
              >导出购物清单</el-button
            >
            <el-button type="primary" size="small" round @click="onShowModal(1)"
              >导出报价单</el-button
            >
          </div>
        </div>
        <GoodCard
          class="goods-card"
          v-for="item in cartItems"
          :selected="item.isSelected"
          :key="item.sku_id"
          :goodInfo="item"
          @goodClick="handleClick"
          @goodDelete="handleDelete"
          @goodSelect="handleSelect"
          @goodCountChange="handleGoodsChange"
        />
      </div>
      <!-- 结算明细卡片 -->
      <div class="detail">
        <div class="detail-title">
          结算明细
          <div class="detail-desc">实际优惠金额如下</div>
        </div>
        <div class="detail-images" v-if="finalGoods.length">
          <img
            v-for="item in finalGoods"
            :key="item.sku_id"
            :src="item.main_image_url"
            alt="产品缩略图"
          />
        </div>
        <el-empty
          class="cart-empty"
          :image-size="68"
          v-else
          description="暂无结算商品"
        ></el-empty>
        <div class="detail-info flex-sp">
          <div>商品总价</div>
          <div>&yen;{{ total }}</div>
        </div>
        <!-- 优惠项 -->
        <div class="detail-info flex-sp">
          <div>优惠券</div>
          <div>&yen;0</div>
        </div>
        <div class="detail-total">
          <div class="total-text">合计:</div>
          <div class="total-price">&yen;{{ total }}</div>
        </div>
        <el-button type="danger" class="button" round @click="onBill"
          >结算</el-button
        >
      </div>
    </div>
    <!--  -->
    <el-dialog
      v-model="modalVisible"
      :title="modalTitle"
      width="500"
      :before-close="onBeforeClose"
    >
      <el-form
        ref="formRef"
        class="my-form"
        :model="reportForm"
        label-width="70px"
        label-position="left"
        :rules="reportRules"
      >
        <el-form-item label="邮 箱" prop="email">
          <el-input
            v-model="reportForm.email"
            placeholder="请输入邮箱地址"
          ></el-input>
        </el-form-item>

        <el-form-item label="手 机" prop="phone">
          <el-input
            v-model="reportForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓 名" prop="name">
          <el-input
            v-model="reportForm.name"
            placeholder="请输入联系人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="单 位" prop="unit">
          <el-input
            v-model="reportForm.unit"
            placeholder="请输入单位"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onReport" :loading="isLoading">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, onMounted } from "vue";
import GoodCard from "./GoodCard.vue";
import useCartStore from "@/store/modules/cart";
import useUserStore from "@/store/modules/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { validateFn } from "@/utils/validate/validate";

const cartStore = useCartStore();
//
const cartItems = ref([]);
const getCartList = async () => {
  await cartStore.getCartData();
  cartItems.value = cartStore.cartList;
};
onMounted(() => {
  getCartList();
});
const total = computed(() => {
  return cartItems.value
    .filter((item) => item.isSelected)
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);
});
const finalGoods = computed(() => {
  return cartItems.value.filter((item) => item.isSelected);
});
// 商品操作
// 商品点击跳转到详情页
const handleClick = (id: number) => {
  console.log("handleClick", id);
};
// 商品删除
const handleDelete = async (cart_id: number) => {
  await cartStore.deleteOne(cart_id);
  getCartList();
};
const handlePatchDelete = async () => {
  const selectedArr = finalGoods.value.map((cartItem) => cartItem.cart_id);
  if (selectedArr.length) {
    await ElMessageBox.confirm("确定删除这几个吗?", "Warning", {
      confirmButtonText: "确定",
      cancelButtonText: "不，再想想",
      type: "warning",
    }).then(async () => {
      await cartStore.deletePatch(selectedArr);
      getCartList();
    });
  } else {
    ElMessage.warning("请选择要移除的商品");
  }
};
const onDeleteAll = async () => {
  await cartStore.deleteAll();
  getCartList();
};
//选中
const isSelectedAll = ref(false);
const handleClickAll = () => {
  isSelectedAll.value = !isSelectedAll.value;
  cartItems.value.forEach((item) => {
    item.isSelected = isSelectedAll.value;
  });
};

const handleSelect = (id: number) => {
  const item = cartItems.value.find((item) => item.sku_id === id);
  if (item) {
    item.isSelected = !item.isSelected;
  }
};
// 监听全部选中自动改变isSelectedAll
watch(
  () => cartItems.value.map((item) => item.isSelected),
  (newValues) => {
    isSelectedAll.value = newValues.every((value) => value);
  },
  { deep: true }
);

const handleGoodsChange = async (skuid, count) => {
  console.log(skuid, count);
  await cartStore.updateCart(skuid, count);
};

//
const modalVisible = ref(false);
const isPriceTable = ref(false);
const modalTitle = computed(() => {
  return isPriceTable.value ? "导出报价单" : "导出购物清单";
});
const onResetFileds = async () => {
  await formRef.value.resetFields();
};
const onBeforeClose = async (done) => {
  await onResetFileds();
  done();
};
const onShowModal = (status) => {
  if (!cartIds.value.length) return ElMessage.error("请选中要导出的商品!");
  console.log(status);
  status ? (isPriceTable.value = true) : (isPriceTable.value = false);
  console.log("isPriceTable", isPriceTable.value);
  modalVisible.value = true;
};

const formRef = ref();
const reportForm = ref({
  phone: "",
  name: "",
  unit: "",
  email: "",
});
const isLoading = ref(false);
const validateEmail = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入邮箱"));
  }
  console.log("验证email", validateFn("email", value));
  if (!validateFn("email", value)) {
    return callback(new Error("请输入正确的邮箱格式"));
  } else {
    callback();
  }
};
const validatePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入手机号"));
  }
  if (!validateFn("phone", value)) {
    return callback(new Error("请输入正确的手机号"));
  } else {
    callback();
  }
};
const reportRules = ref({
  phone: [
    {
      required: true,
      validator: validatePhone,
      trigger: "change",
    },
  ],
  email: [
    {
      required: true,
      validator: validateEmail,
      trigger: "change",
    },
  ],
});
const cartIds = computed(() => {
  return finalGoods.value.map((item) => item.cart_id);
});
const createReport = async (fromBill) => {
  let params = {};
  if (fromBill) {
    const userStore = useUserStore();
    params = {
      cartIds: cartIds.value,
      email: userStore.userInfo.email,
      phone: userStore.userInfo.phone,
      unit: userStore.userInfo.company,
      name: userStore.userInfo.username,
    };
  } else {
    params = {
      cartIds: cartIds.value,
      ...reportForm.value,
    };
  }

  isPriceTable.value
    ? await cartStore.createPriceReport(params)
    : await cartStore.createShoppingReport(params);
};
const onReport = () => {
  isLoading.value = true;
  try {
    formRef.value.validate(async (valid) => {
      if (!valid) return;
      await createReport();
      onCancel();
    });
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};
const onCancel = () => {
  modalVisible.value = false;
  onResetFileds();
};
const onBill = () => {
  if (!cartIds.value.length) return ElMessage.error("请勾选要结算的商品!");
  isPriceTable.value = true;
  createReport(1);
};
</script>
<style scoped lang="less">
.cart {
  width: 100%;
  padding: 20px;
}
.cart-content {
  display: flex;
  justify-content: space-between;
}
.cart-empty {
  margin: 0 auto;
}
.goods-card {
  margin-top: 24px;
}
.detail {
  z-index: 1;
  position: fixed;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  right: 100px;
  width: 268px;
  padding: 20px;
}
.detail-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.detail-images {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 120px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }

  // ::-webkit-scrollbar-track {
  //   background: transparent;
  // }

  &::-webkit-scrollbar-track {
    background-color: rgb(0 0 0 / 5%);
  }

  &::-webkit-scrollbar-thumb {
    // background-color: rgba(144, 147, 153, 0.3);
    border-radius: 2px;
    // background: rgba(0, 0, 0, 0.6);
    background-color: rgb(144 147 153 / 30%);
    box-shadow: inset 0 0 6px rgb(0 0 0 / 20%);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b6b7b9;
  }
}
.detail-images img {
  width: 48px;
  height: 48px;
  margin: 4px;
}
.goods-select {
  display: flex;
  align-items: center;
}
.goods-select .check-text {
  margin-left: 8px;
}
.goods-select .checkbox {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  transition: all 0.5s;
}
.goods-select .checkbox img {
  width: 100%;
  height: 100%;
}
.goods {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
.detail-desc {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
}
.detail-info {
  font-size: 16px;
  margin-top: 8px;
}
.detail-total {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bolder;
}
.total-price {
  color: red;
}
.button {
  margin-top: 24px;
  width: 100%;
}
.flex-sp {
  display: flex;
  justify-content: space-between;
}
</style>
