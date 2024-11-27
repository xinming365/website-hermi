<script setup>
import { ref, onMounted, watch } from "vue";
import { addCartApi } from "@/api/cart";
import { useRoute } from "vue-router";
import { RouterView } from "vue-router";
import { ElMessage } from "element-plus";
import useCartStore from "@/store/modules/cart";

// 模拟数据 !!!!!!!!!!!!
import productDataJson from "@/assets/product_data.json";

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

const fetchProductData = async () => {
  try {
    // const response = await fetch(`/api/products/${props.id}?sid=${props.sid}&tid=${props.tid}`);
    // const data = await response.json();
    // 模拟数据
    const data = productDataJson;

    console.log("获取到的原始数据:", data); // 新增
    if (!data.common_image_urls) {
      console.warn("common_image_urls 不存在!"); // 新增
    }

    productData.value = {
      ...data,
      tabs: [
        {
          name: "参数规格",
          content: {
            detail_desc: data.detail_desc,
            detail_points: data.detail_points,
            common_desc: data.common_desc,
            common_points: data.common_points,
            generalParams: data.general_params,
          },
        },
        {
          name: "曲线",
          content: data.assembly?.content || "",
        },
        {
          name: "技术说明",
          content: data.tech_articles?.content || "",
        },
        {
          name: "组装",
          content: data.assembly?.content || "",
        },
        {
          name: "应用案例",
          content: data.application_articles?.content || "",
        },
        {
          name: "定制能力",
          content: data.customization?.content || "",
        },
      ],
    };
  } catch (error) {
    console.error("获取产品数据失败:", error);
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
const onAddCart = async (e, skuid) => {
  console.log("点击事件!!!!!!!!!!", e.target, skuid);
  const { p_num } = getParamsFromTrNode(e.target);
  console.log("商品信息...", p_num);
  await cartStore.addCart(skuid, p_num);
  await cartStore.getCartData();
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
  <div class="product-detail">
    <div v-if="productData">
      <h1>{{ productData.title }}</h1>

      <!-- 标签导航 -->
      <div class="lb-product-tabs__nav">
        <div
          v-for="(tab, index) in productData.tabs"
          :key="index"
          class="lb-product-tabs__nav_item"
          :class="{ 'lb-product-tabs__nav_item--active': activeTab === index }"
          @click="handleTabClick(index)"
        >
          {{ tab.name }}
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="lb-product-tabs__content">
        <div
          v-for="(tab, index) in productData.tabs"
          :key="index"
          class="lb-product-tabs__content_item"
          :class="{
            'lb-product-tabs__content_item--active': activeTab === index,
          }"
          v-show="activeTab === index"
        >
          <!-- 参数规格 -->
          <template v-if="index === 0">
            <div class="lb-product-info">
              <div class="lb-product-info__item">
                <div class="lb-product-info__item_title">产品说明</div>
                <div class="lb-product-info__explain">
                  <ul>
                    <li
                      v-for="(point, idx) in tab.content.detail_points"
                      :key="idx"
                    >
                      {{ point }}
                    </li>
                  </ul>
                  <p>{{ tab.content.detail_desc }}</p>
                </div>
              </div>
            </div>

            <div class="lb-product-table">
              <div class="lb-product-info__item_title">通用参数</div>
              <table>
                <tr
                  v-for="(value, key) in tab.content.generalParams"
                  :key="key"
                >
                  <td>
                    <div class="t">{{ key }}</div>
                    <div class="c">{{ value }}</div>
                  </td>
                </tr>
              </table>
            </div>
          </template>

          <!-- 曲线 -->
          <template v-else-if="index === 1">
            <div
              class="lb-product-tabs__content_item--rich"
              v-html="tab.content"
            ></div>
          </template>

          <!-- 技术说明 -->
          <template v-else-if="index === 2">
            <div
              class="lb-product-tabs__content_item--rich"
              v-html="tab.content"
            ></div>
          </template>

          <!-- 组装 -->
          <template v-else-if="index === 3">
            <div
              class="lb-product-tabs__content_item--rich"
              v-html="tab.content"
            ></div>
          </template>

          <!-- 应用案例 -->
          <template v-else-if="index === 4">
            <div
              class="lb-product-tabs__content_item--rich"
              v-html="tab.content"
            ></div>
          </template>

          <!-- 定制能力 -->
          <template v-else-if="index === 5">
            <div
              class="lb-product-tabs__content_item--rich"
              v-html="tab.content"
            ></div>
          </template>
        </div>
      </div>

      <div class="lb-product-set">
        <div class="lb-product-set__title">
          <span>偏振光栅，相位周期5或8 &mu;m</span>
        </div>
        <div class="lb-product-set__info">
          <div class="lb-product-set__guard">
            <div
              class="lb-product-set__info_img enlarge"
              :data-img="productData.common_image_urls[0].url"
            >
              <img
                :src="productData.common_image_urls[0].url"
                @error="(e) => console.error('图片加载失败:', e.target.src)"
                @load="
                  () =>
                    console.log(
                      '图片加载成功:',
                      productData.common_image_urls[0].url
                    )
                "
              />
            </div>
            <div
              class="lb-product-set__info_annotate"
              v-if="productData.common_image_urls[0].caption"
            >
              {{ productData.common_image_urls[0].caption }}
            </div>
          </div>
          <div class="lb-product-set__info_explain lb-product-info__explain">
            <ul>
              <li v-for="(point, idx) in productData.common_points" :key="idx">
                {{ point }}
              </li>
            </ul>
            <p class="p-text-justify">
              {{ productData.common_desc }}
            </p>
          </div>
          <div class="lb-product-set__guard">
            <div
              class="lb-product-set__info_img enlarge"
              :data-img="productData.common_image_urls[1].url"
            >
              <img :src="productData.common_image_urls[1].url" />
            </div>
            <div
              class="lb-product-set__info_annotate"
              v-if="productData.common_image_urls[1].caption"
            >
              {{ productData.common_image_urls[1].caption }}
            </div>
          </div>
        </div>

        <div class="lb-product-set__goods">
          <table class="lb-goods-table" data-has_curves="">
            <thead>
              <tr>
                <th class="center" width="30px"></th>
                <th
                  v-for="(key, index) in Object.keys(productData.sku_set[0])"
                  :key="index"
                >
                  {{ key === "sku_id" ? "产品型号" : key }}
                </th>
                <th class="center" width="50px">对比</th>
                <th width="70px"></th>
                <th class="center" width="120px"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in productData.sku_set"
                :key="item.sku_id"
                lay-on="openTr"
                name="goods"
                :data-sn="item.sku_id"
                :data-lead_time="item.lead_time"
              >
                <td class="center">
                  <div class="lb-goods-table__extend">
                    <i class="lb-icon-goods-expand"></i>
                  </div>
                </td>
                <td v-for="(value, key) in item" :key="key" :data-order="value">
                  {{ value }}
                </td>
                <td class="center">
                  <div class="layui-form">
                    <input
                      type="checkbox"
                      name="compareProduct"
                      lay-filter="compareProduct"
                    />
                  </div>
                </td>

                <td>
                  <div class="layui-form" name="goods-num-wrapper">
                    <input
                      name="goodsNum"
                      type="number"
                      lay-filter="changeGoodsNum"
                      lay-affix="number"
                      value="1"
                      min="1"
                      class="layui-input"
                    />
                  </div>
                </td>
                <td class="center">
                  <span
                    class="lb-addcart"
                    @click="onAddCart($event, item.sku_id)"
                    >加入购物车</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p>{{ productData.description }}</p>
    </div>
    <div v-else>加载中...</div>
  </div>
</template>

<style scoped>
@import "/libs/quotes/css_v2.css";
@import "/libs/quotes/header.css";
@import "/libs/quotes/homepage.css";
@import "/libs/quotes/product.css";
.product-detail {
  padding: 20px;
}
</style>
