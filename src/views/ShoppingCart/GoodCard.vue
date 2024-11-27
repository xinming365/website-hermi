<template>
  <div class="good-card" @click="goodClick">
    <div class="checkbox" @click.stop="goodSelect">
      <img
        src="@/assets/images/icon/selected.png"
        v-if="props.selected"
        alt=""
      />
      <img src="@/assets/images/icon/unselected.png" v-else alt="" />
    </div>

    <div class="good-info">
      <img class="good-image" :src="goodInfo.main_image_url" alt="" />
      <div class="good-detail">
        <div class="good-name">
          {{ goodInfo.title }}{{ goodInfo.sku_params.input_spot }}
          {{ goodInfo.sku_params.output_spot }}
          {{ goodInfo.sku_params.wavelength }}
        </div>
        <div class="good-name">型号：{{ goodInfo.sku_id }}</div>
      </div>
      <div class="good-price">￥{{ goodInfo.price }}</div>
      <div class="good-count">
        <el-input-number v-model="goodInfo.quantity" :min="1" />
      </div>
      <el-popconfirm title="确定将该商品移出购物车?" @confirm="goodDelete">
        <template #reference>
          <el-button class="delbtn" type="primary" text> 删除 </el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  goodInfo: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits([
  "goodClick",
  "goodSelect",
  "goodDelete",
  "goodCountChange",
]);
const goodClick = () => {
  emit("goodClick", props.goodInfo.sku_id);
};
const goodSelect = () => {
  emit("goodSelect", props.goodInfo.sku_id);
};
const goodDelete = () => {
  emit("goodDelete", props.goodInfo.cart_id);
};
</script>
<style scoped>
.good-card {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.checkbox {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.5s;
}
.checkbox img {
  width: 100%;
  height: 100%;
}
.good-info {
  display: flex;
  align-items: center;
}
.good-image {
  width: 96px;
  height: 96px;
  border-radius: 10px;
  margin-left: 14px;
  margin-right: 14px;
}
.good-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 600px;
  height: 96px;
}
.good-price {
  width: 170px;
  text-align: center;
  font-weight: bolder;
  color: rgb(122, 122, 122);
}
.delbtn {
  color: #f55;
  margin-left: 10px;
}
</style>
