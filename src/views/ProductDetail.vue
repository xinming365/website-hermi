<script setup>
import { ref, onMounted, watch } from "vue";
import { addCartApi } from "@/api/cart";
import { useRoute } from "vue-router";
import { RouterView } from "vue-router";
import { ElMessage } from "element-plus";
import useCartStore from "@/store/modules/cart";

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
    // 这里添加实际的数据获取逻辑
    // const response = await fetch(`/api/products/${props.id}?sid=${props.sid}&tid=${props.tid}`)
    // productData.value = await response.json()

    // 临时模拟数据
    productData.value = {
      title: `产品 ${props.id}`,
      description: `子类别: ${props.sid}, 三级类别: ${props.tid}`,
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
const onAddCart = async (e) => {
  console.log(e.target);
  const { p_id, list_id, sn, id, p_num } = getParamsFromTrNode(e.target);
  //   console.log(p_id, list_id, sn, id, p_num);
  const res = await addCartApi({ p_id, sn, p_num });
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
  if (trNode.tagName === "TR" && trNode.hasAttribute("data-id")) {
    console.log(trNode);
    //找到请求参数信息
    const p_id = trNode.getAttribute("data-id");
    const list_id = trNode.getAttribute("data-list_id");
    const sn = trNode.getAttribute("data-sn");
    const id = trNode.getAttribute("data-group_id");
    const numNode =
      currentNode.parentElement.previousElementSibling.querySelector(
        "input[name='goodsNum']"
      );
    const p_num = numNode && numNode.value;
    return { p_id, list_id, sn, id, p_num };
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
          v-for="(tab, index) in [
            '参数规格',
            '曲线',
            '技术说明',
            '组装',
            '应用案例',
            '定制能力',
            '反馈',
          ]"
          :key="index"
          class="lb-product-tabs__nav_item"
          :class="{ 'lb-product-tabs__nav_item--active': activeTab === index }"
          @click="handleTabClick(index)"
        >
          {{ tab }}
        </div>
      </div>

      <!-- 内容区域 -->

      <div class="lb-product-tabs__content">
        <div
          v-for="(content, index) in [
            '参数规格',
            '曲线',
            '技术说明',
            '组装',
            '应用案例',
            '定制能力',
            '反馈',
          ]"
          :key="index"
          class="lb-product-tabs__content_item"
          :class="{
            'lb-product-tabs__content_item--active': activeTab === index,
          }"
          v-show="activeTab === index"
        >
          <template v-if="index === 4">
            <div
              class="lb-product-tabs__content_item--rich"
              style="width: 1200px"
            >
              <p style="text-align: center">
                <span style="font-family: 'microsoft yahei'; font-size: 12pt">
                  <strong>LBTEK 偏振光栅——应用案例！！！！！！！！！</strong>
                </span>
              </p>
              <!-- 其他应用案例内容 -->
            </div>
          </template>

          <template v-if="index === 0">
            <div class="lb-product-info">
              <div class="lb-product-info__item">
                <div class="lb-product-info__item_title">产品说明</div>
                <div class="lb-product-info__explain">
                  <ul>
                    <li>
                      液晶聚合物/N-BK7窗口片，三明治平片结构，无外壳，带切边
                    </li>
                    <li>
                      液晶分子快轴取向沿x方向呈周期性连续渐变，&lambda;/2延迟量
                    </li>
                    <li>可用于实现能量比例可调的二分束功能和光束扫描功能</li>
                    <li>平板结构，偏振相关，高衍射效率</li>
                    <li>
                      工作波长&lambda;：488-1550 nm可选，相位周期p：5或8 &mu;m
                    </li>
                    <li>支持参数规格的灵活定制</li>
                  </ul>
                  <p>
                    LBTEK 偏振光栅（Polarization
                    Grating，PG）基于液晶聚合物双折射材料和N-BK7玻璃基底制成，呈现为&ldquo;前后玻璃衬底+中间LCP功能膜层&rdquo;的三明治结构，无外壳，带单侧切边。在LCP层中，液晶分子的快轴取向沿x方向呈现周期性连续渐变，其在整个器件平面上具有相同的
                    &lambda;/2延迟量，为单波长器件。偏振光栅具有偏振相关的光学特性，根据入射光束偏振态的不同，可用于实现分束能量比可调的二分束效果，也可用于实现非机械式的光束扫描。相较于传统的光栅，偏振光栅引入了偏振调制功能；平板结构，无物理凹凸，易于集成；具有极低的零级占比和极高的衍射效率。LBTEK
                    提供工作波长&lambda;在488-1550 nm间可选，光栅周期p为5或8
                    &mu;m的偏振光栅标品，同时支持参数规格的灵活定制，以方便用户在不同应用场景下的多样化需求，详情请咨询LBTEK
                    技术支持。
                  </p>
                </div>
              </div>
            </div>

            <div class="lb-product-table">
              <div class="lb-product-info__item_title">通用参数</div>
              <table>
                <tr>
                  <td>
                    <div class="t">光学元件材质</div>
                    <div class="c">液晶聚合物/N-BK7窗口片</div>
                  </td>
                  <td>
                    <div class="t">透射波前差</div>
                    <div class="c">＜λ/4@633 nm</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="t">光学元件材质</div>
                    <div class="c">液晶聚合物/N-BK7窗口片</div>
                  </td>
                  <td>
                    <div class="t">光学元件材质</div>
                    <div class="c">液晶聚合物/N-BK7窗口片</div>
                  </td>
                </tr>
              </table>
            </div>
          </template>

          <!-- 其他标签页内容 -->
          <template v-else>
            <!-- 在这里添加其他标签页的具体内容 -->
            <div
              class="lb-product-tabs__content_item lb-product-tabs__content_item--rich"
              style="width: 1200px"
            >
              <p style="text-align: center">
                <span style="font-family: 'microsoft yahei'; font-size: 12pt"
                  ><strong>LBTEK 偏振光栅——应用案例</strong></span
                >
              </p>
              <p>&nbsp;</p>
              <p style="text-indent: 2em">
                <span
                  style="
                    background-color: #ffffff;
                    color: #000000;
                    font-family: 'microsoft yahei';
                    font-size: 10pt;
                  "
                  >大周期的偏振光栅可与4F光学系统相结合，用作光学边缘检测系统。光束经过镂空轮廓和起偏器后，变为携带边缘信息的线偏振光，然后经过处于4F系统中的大周期偏振光栅，利用其小衍射角特点和对光束偏振态的调制特性，得到了分束角极小的一束左旋圆偏振光和一束右旋圆偏振光。两光束叠加部分可近似看作均匀的线偏振光，可被检偏器过滤，即得到了镂空轮廓的边缘信息。该方法保留了广谱适用性，且液晶偏振光栅的低成本、易批量生产特点使该边缘检测机制的实际应用成为可能。</span
                >
              </p>
              <p>
                <img
                  style="display: block; margin-left: auto; margin-right: auto"
                  src="https://images.lbtek.com/FoBESyiqOtSZN8JMmuRcwJraTQ_r"
                  width="600"
                />
              </p>
              <p style="text-align: center">
                <strong
                  ><span
                    style="
                      background-color: #ffffff;
                      color: #000000;
                      font-family: 'microsoft yahei';
                      font-size: 10pt;
                    "
                    >图1 光学边缘检测系统</span
                  ></strong
                >
              </p>
            </div>
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
              data-img="https://www.lbtek.com/uploads/images/others/20220819/970c1d6c59637f4975dbfa7e210a2d46.jpg"
            >
              <img
                src="https://www.lbtek.com/uploads/images/others/20220819/970c1d6c59637f4975dbfa7e210a2d46.jpg"
              />
            </div>
          </div>
          <div class="lb-product-set__info_explain lb-product-info__explain">
            <ul>
              <li>
                通光孔径：Ø20 mm，工作波长λ：400-1550 nm可选，相位周期p：5或8 μm
              </li>
              <li>偏振相关的二分束特性</li>
              <li>光束偏转角随波长增大而增大</li>
              <li>衍射效率＞98 %</li>
            </ul>
            <p class="p-text-justify">
              LBTEK 5或8 μm偏振光栅的通光孔径为Ø20 mm，工作波长在400-1550
              nm之间可选。根据入射光偏振态的不同，可用于实现比例可调的二分束效果及光束扫描效果。在相同的相位周期下，不同工作波长的偏振光栅在相应波长的入射光条件下具有不同的光束偏转角。该分组下产品均可保证衍射效率＞98
              %。
            </p>
          </div>
          <div class="lb-product-set__guard">
            <div
              class="lb-product-set__info_img enlarge"
              data-img="https://www.lbtek.com/uploads/images/others/20220818/86560f993b40daa6d0f84dea309c3299.jpg"
            >
              <img
                src="https://www.lbtek.com/uploads/images/others/20220818/86560f993b40daa6d0f84dea309c3299.jpg"
              />
            </div>
            <div class="lb-product-set__info_annotate">
              偏振光栅在线偏振光下形貌
            </div>
          </div>
        </div>

        <div class="lb-product-set__goods">
          <table class="lb-goods-table" data-has_curves="">
            <thead>
              <tr>
                <th class="center" width="30px"></th>
                <th>产品型号</th>
                <th>相位周期p</th>
                <th>工作波长λ</th>
                <th>通光孔径</th>
                <th width="90px">单价</th>
                <th class="center" width="50px">对比</th>
                <th class="center" width="100px">发货日期</th>
                <th width="70px"></th>
                <th class="center" width="120px"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                lay-on="openTr"
                name="goods"
                data-id="7047"
                data-group_id="1567"
                data-list_id="671"
                data-sn="PZGS25-5-488"
                data-lead_time='["\u5f53\u5929"]'
              >
                <td class="center">
                  <div class="lb-goods-table__extend">
                    <i class="lb-icon-goods-expand"></i>
                  </div>
                </td>
                <td>PZGS25-5-488</td>
                <td data-order="5">5 μm</td>
                <td data-order="488">488 nm</td>
                <td data-order="20">Ø20 mm</td>
                <td data-order="918000">
                  <span class="lb-goods-table__price">￥9180</span>
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
                <td class="center" name="leadtime">
                  <span>当天</span>
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
                  <span class="lb-addcart" @click="onAddCart($event)"
                    >加入购物车</span
                  >
                </td>
              </tr>

              <tr
                lay-on="openTr"
                name="goods"
                data-id="7067"
                data-group_id="1567"
                data-list_id="671"
                data-sn="PZGS25-5-532"
                data-lead_time='["\u5f53\u5929"]'
              >
                <td class="center">
                  <div class="lb-goods-table__extend">
                    <i class="lb-icon-goods-expand"></i>
                  </div>
                </td>
                <td>PZGS25-5-532</td>
                <td data-order="5">5 μm</td>
                <td data-order="532">532 nm</td>
                <td data-order="20">Ø20 mm</td>
                <td data-order="918000">
                  <span class="lb-goods-table__price">￥9180</span>
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
                <td class="center" name="leadtime">
                  <span>当天</span>
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
                  <span class="lb-addcart" @click="onAddCart($event)"
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
