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
      <img class="good-image" :src="props.goodInfo.image" alt="" />
      <div class="good-detail">
        <div class="good-name">{{ props.goodInfo.name }}</div>
        <div class="good-name">型号：{{ props.goodInfo.type }}</div>
      </div>
      <div class="good-price">￥{{ props.goodInfo.price }}</div>
      <div class="good-count">
        <el-input-number v-model="props.goodInfo.count" />
      </div>
      <el-button type="primary" text @click="goodDelete"> 删除 </el-button>
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
  emit("goodClick", props.goodInfo.id);
};
const goodSelect = () => {
  emit("goodSelect", props.goodInfo.id);
};
const goodDelete = () => {
  emit("goodDelete", props.goodInfo.id);
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
  height: 96px;
}
.good-price {
  font-weight: bolder;
  color: rgb(122, 122, 122);
  margin-left: 84px;
  margin-right: 34px;
}
</style>
