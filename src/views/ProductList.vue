<script setup>
import { ref, onMounted, watch } from "vue";
import { addCartApi } from "@/api/cart";
import { useRoute } from "vue-router";
import { RouterView } from "vue-router";
import { ElMessage } from "element-plus";
import useCartStore from "@/store/modules/cart";

// 模拟数据 !!!!!!!!!!!!
import productDataJson from '@/assets/product_data.json' 

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sid: String,
  tid: String,
});
console.log("详情数据", props);
const productData = ref(null);

// 添加分类数据状态
const categoryData = ref(null);

// 修改获取数据的方法
const fetchProductData = async () => {
  try {
    const data = await import("@/assets/hermi_product_center.json");
    
    // 根据sid找到对应分类
    const category = data[props.sid];
    if (!category) {
      console.error("未找到对应分类数据");
      return;
    }

    // 如果没有tid,展示所有子分类和产品
    if (!props.tid) {
      categoryData.value = category.sub_categories;
      // 添加: 获取所有产品列表
      productData.value = {
        title: category.name,
        products: category.sub_categories.reduce((acc, curr) => {
          return acc.concat(curr.products)
        }, [])
      };
    } else {
      // 有tid时只展示对应子分类的产品
      const subCategory = category.sub_categories.find(
        item => item.tid === props.tid
      );
      if (subCategory) {
        productData.value = {
          title: subCategory.name,
          products: subCategory.products
        };
      }
    }
  } catch (error) {
    console.error("获取数据失败:", error);
  }
};

// 监听路由参数变化，重新获取数据
watch(
  () => [props.id, props.sid, props.tid],
  () => fetchProductData()
);

onMounted(() => {
  fetchProductData();
});

// 添加活动标签状态
const activeTab = ref(0); // 默认显示第一个标签

// 处理标签点击
const handleTabClick = (index) => {
  activeTab.value = index;
};

//
const cartStore = useCartStore();
const onAddCart = async (e) => {
  console.log("点击事件!!!!!!!!!!", e);
  console.log(e.target);
  const {  sn, p_num } = getParamsFromTrNode(e.target);
  console.log("商品信息...", sn, p_num);
  const res = await addCartApi({ sn, p_num });
  console.log(res);
  await cartStore.getCartData();
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "添加成功",
      showClose: true,
      duration: 1000,
    });
  }
};
/**
 * 获取接口参数从tr节点
 * @param currentNode 当前点击的span元素
 * @returns {Object} 包含p_id, list_id, sn, id的参数对象
 */
function getParamsFromTrNode(currentNode) {
  const trNode = currentNode.parentElement.parentElement;
  if (trNode.tagName === "TR" && trNode.hasAttribute("data-sn")) {
    console.log(trNode);
    //找到请求参数信息
    const sn = trNode.getAttribute("data-sn");
    const numNode =
      currentNode.parentElement.previousElementSibling.querySelector(
        "input[name='goodsNum']"
      );
    const p_num = numNode && numNode.value;
    return { sn, p_num };
  }
}
</script>

<template>
  <div class="product-list">
    <!-- 无tid时显示分类列表和所有产品 -->
    <template v-if="!$route.query.tid && categoryData">
      <!-- 分类列表 -->
      <div class="category-list">
        <div 
          v-for="category in categoryData" 
          :key="category.tid"
          class="category-item"
          @click="$router.push(`/products?sid=${$route.query.sid}&tid=${category.tid}`)"
        >
          <h3>{{ category.name }}</h3>
          <div class="product-grid">
            <div 
              v-for="product in category.products.slice(0, 4)" 
              :key="product.sku_id"
              class="product-card"
            >
              <h4>{{ product.name }}</h4>
              <p>{{ product.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加: 显示所有产品列表 -->
      <div v-if="productData" class="all-products">
        <h2>所有产品</h2>
        <div class="product-grid">
          <div 
            v-for="product in productData.products" 
            :key="product.sku_id"
            class="product-card"
          >
            <h3>{{ product.name }}</h3>
            <p>{{ product.title }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 有tid时显示产品列表 -->
    <div v-else-if="productData" class="product-detail">
      <h2>{{ productData.title }}</h2>
      <div class="product-grid">
        <div 
          v-for="product in productData.products" 
          :key="product.sku_id"
          class="product-card"
        >
          <h3>{{ product.name }}</h3>
          <p>{{ product.title }}</p>
        </div>
      </div>
    </div>

    <div v-else>加载中...</div>
  </div>
</template>

<style scoped>
.product-list {
  padding: 20px;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.category-item {
  cursor: pointer;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.product-card {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.product-card h4 {
  margin: 0 0 10px 0;
}

.product-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>
