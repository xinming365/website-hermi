<script setup>
import TheWelcome from "../components/TheWelcome.vue";
import Solution from "../components/Solution.vue";
import { onMounted, onUnmounted, ref } from "vue";
// import '../assets/js/slideshow.js'
import Layui from "@layui/layui-vue";
import { LayCarousel, LayCarouselItem } from "@layui/layui-vue";

import "@layui/layui-vue/lib/index.css";
// import '@fortawesome/fontawesome-free/css/all.min.css'
</script>

<!-- <script type="text/javascript" src="/js/slideshow.js"></script> -->

<style>
/* @import url('https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.4/css/all.min.css'); */
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'); */
@import "../assets/css/index.css";
@import "/libs/quotes/css_v2.css";
@import "/libs/quotes/header.css";
@import "/libs/quotes/homepage.css";
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'); */
.module-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.module-icon i {
  display: inline-block;
}

.product-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.lb-subnav__item {
  transition: transform 0.3s ease;
}

.lb-subnav__item:hover {
  transform: translateY(-5px);
}

.lb-subnav__inner {
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  padding: 15px;
}

.lb-subnav__text {
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  width: 100%;
}
</style>

<template>
  <main>
    <!-- <TheWelcome /> -->

    <!-- <div class="slideshow-container">
            <div class="mySlides fade">
                <img src="/images/slides/66162d058d7d7.png" alt="图片描述 1">
            </div>

            <div class="mySlides fade">
                <img src="/images/slides/630740263850d.png" alt="图片描述 2">
            </div>

            <div class="mySlides fade">
                <img src="/images/slides/66162d058d7d7.png" alt="图片描述 3">
            </div>

            <a class="prev" @click="plusSlides(-1)">&#10094;</a>
            <a class="next" @click="plusSlides(1)">&#10095;</a>

            <div class="dots">
                <span class="dot" @click="currentSlide(1)"></span> 
                <span class="dot" @click="currentSlide(2)"></span> 
                <span class="dot" @click="currentSlide(3)"></span> 
            </div>
        </div> -->

    <div class="lb-homepage__section lb-homepage__section--gray">
      <div class="lb-homepage__title" @click="testFn">解决方案</div>
      <Solution />
    </div>

    <div class="content-modules">
      <!-- <div class="lb-homepage__section lb-homepage__section--gray"> -->
      <div class="module-grid">
        <div class="module" data-module="product">
          <div class="module-icon"><i class="fas fa-server"></i></div>
          <h2>产品中心</h2>
          <ul>
            <li><a href="#">服务器</a></li>
            <li><a href="#">光学器件</a></li>
            <li><a href="#">隔震平台</a></li>
            <li><a href="#">实验定制</a></li>
          </ul>
          <a href="/product.html#product" class="more-button">更多</a>
        </div>

        <div class="module" data-module="tech">
          <div class="module-icon"><i class="fas fa-microchip"></i></div>
          <h2>技术文章</h2>
          <ul>
            <li><a href="#">锁相放大器原理解析</a></li>
            <li><a href="#">高光谱成像技术进展</a></li>
            <li><a href="#">激光器应用案例</a></li>
            <li><a href="#">减震平台选型指南</a></li>
          </ul>
          <a href="/articles.html#articles" class="more-button">更多</a>
        </div>

        <div class="module" data-module="download">
          <div class="module-icon"><i class="fas fa-download"></i></div>
          <h2>常用下载</h2>
          <ul>
            <li><a href="#">产品说明书</a></li>
            <li><a href="#">软件驱动程序</a></li>
            <li><a href="#">技术白皮书</a></li>
            <li><a href="#">应用案例集</a></li>
          </ul>
          <a href="/downloads.html#download" class="more-button">更多</a>
        </div>

        <div class="module" data-module="partners">
          <div class="module-icon"><i class="fas fa-handshake"></i></div>
          <h2>合作单位</h2>
          <ul>
            <li><a href="#">科研院所</a></li>
            <li><a href="#">高等院校</a></li>
            <li><a href="#">工业企业</a></li>
            <li><a href="#">国际伙伴</a></li>
          </ul>
          <a href="/contact.html#contact" class="more-button">更多</a>
        </div>
      </div>
    </div>

    <!-- 
          <div class="lb-topnav__item is-sub">
            <a href="/product_center">
              <i class="lb-topnav__icon lb-topnav__icon--product"></i><span class="lb-topnav__text">产品中心</span>
            </a> -->
    <!-- <div class="lb-homepage__product_item"> -->

    <div class="lb-homepage__section">
      <div class="lb-homepage__title">产品中心</div>
      <div class="lb-homepage__product">
        <div class="lb-homepage__product_item">
          <a href="/product_center/148">
            <h3>微纳光学</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/test/mall/category/微纳光学-FieYtPgHtT4iElq-8oB51lyERjBF.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center/28">
            <h3>光学元件</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/mall/category/光学元件-FnMsBAxRWo_G9Ii4ygCbVQ-uri8T.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center/146">
            <h3>光学系统</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/mall/category/光学系统-FgMCOzYiOQo2os6FFTOhriYOIiFy.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center/129">
            <h3>光纤及光纤组件</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/mall/category/光纤与光纤组件-Fvde-4A1YeIFcFvu_VTmgCtbaccT.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center/185">
            <h3>光学平台与面包板</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/mall/category/光学平台及面包板-FgHFVavYwbEnILCxk9J7Uo0Ay7zy.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center/36">
            <h3>光机械件</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/mall/category/光机械件-Fv_M9IKI0fWWclUnz94gUigRCO-7.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center/183">
            <h3>运动控制</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/mall/category/运动控制-Fs-lbWRxrWVxZ0_1IQBAVt7wnseH.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center/147">
            <h3>实验室工具</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/test/mall/category/实验室工具-Fiw-pXii8uFJO4Oz725Hpej9X21S.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center/184">
            <h3>光电探测与分析</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/mall/category/光学系统与仪器-Flj9PnIU8rYRs6Hk3ZNc005pIWQm.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center/144">
            <h3>光源</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/mall/category/光源-Fn34GkfhCttBduewsZbwzy1ub02e.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center/326">
            <h3>光谱</h3>
            <img
              width="200px"
              src="https://images.lbtek.com/mall/category/光谱-FnveLgsldw7Oe7QF4bLAeCBnO-Od.png"
            />
          </a>
        </div>
        <div class="lb-homepage__product_item">
          <a href="/product_center" style="justify-content: start">
            <h3 style="margin-top: 20px">查看更多产品</h3>
            <i
              style="font-size: 100px; margin-top: 30px"
              class="lb-icon-more-product"
            ></i>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
