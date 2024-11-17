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
              @click="handleDeleteAll"
              >批量删除</el-button
            >
          </div>
        </div>
        <GoodCard
          class="goods-card"
          v-for="item in cartItems"
          :selected="item.isSelected"
          :key="item.p_id"
          :goodInfo="item"
          @goodClick="handleClick"
          @goodDelete="handleDelete"
          @goodSelect="handleSelect"
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
            :key="item.p_id"
            :src="item.p_thumb"
            alt=""
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
        <el-button type="danger" class="button" round>结算</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, onMounted } from "vue";
import GoodCard from "./GoodCard.vue";
import useCartStore from "@/store/modules/cart";

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
      return total + item.price * item.p_num;
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
const handleDelete = (id: number) => {
  const index = cartItems.value.findIndex((item) => item.id === id);
  if (index > -1) {
    cartItems.value.splice(index, 1);
  }
};
const handleDeleteAll = () => {
  cartItems.value = cartItems.value.filter((item) => !item.isSelected);
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
  const item = cartItems.value.find((item) => item.id === id);
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
</script>
<style scoped>
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
  right: 80px;
  width: 268px;
  padding: 20px;
}
.detail-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.detail-iamges {
  display: flex;
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
