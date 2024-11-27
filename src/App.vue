<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

import NavBar from "./components/common/NavBar.vue";
import HeaderBar from "./components/common/HeaderBar.vue";
import FooterBar from "./components/common/FooterBar.vue";
import SideBar from "./components/common/SideBar.vue";
import Login from "./views/login/Login.vue";
import ContactView from "./components/ContactView.vue";

import "@/assets/css/main.css";
import "/public/libs/quotes/icon_font.css";
// import 'jquery'
// import '@/libs/quotes/js/toolbar.js'

import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import useUserStore from "./store/modules/user";
import useCartStore from "./store/modules/cart";
import { loginMockApi } from "./api/user";
import { storeToRefs } from "pinia";
const route = useRoute();
const router = useRouter();
const isShowSideBar = computed(() => {
  console.log("computed", route.path);
  if (route.path === "/cart") return false;
  else return true;
});

const handleJump = (path) => {
  router.push(path);
};
onMounted(() => {
  // 动态加载toolbar.js
  const script = document.createElement("script");
  script.src = "/src/libs/quotes/js/toolbar.js";
  script.async = true;
  document.body.appendChild(script);
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

//
const { totalCount } = storeToRefs(useCartStore());
</script>

<template>
  <div class="app-container">
    <Login />
    <NavBar class="navbar" />
    
    <div class="main-layout">
      <!-- 侧边栏 -->
      <aside class="sidebar-wrapper" v-if="isShowSideBar">
        <SideBar />
      </aside>

      <!-- 主内容区 -->
      <main class="main-content">
        <RouterView />
      </main>
    </div>

    <!-- 工具栏 -->
    <div class="lb-toolbar">
      <div id="toolbarMain">
        <!-- 在线咨询 -->
        <div class="lb-toolbar__item" title="在线咨询" @click="toolbarHandler.contactService()">
          <i class="lb-toolbar__icon lb-icon-kefu"></i>
        </div>

        <!-- 购物车 -->
        <div class="lb-toolbar__item" title="购物车" id="cartAnimationEnd" @click="handleJump('/cart')">
          <div class="lb-toolbar__link">
            <i class="lb-toolbar__icon lb-icon-cart"></i>
            <span class="lb-toolbar__badge">{{ totalCount }}</span>
          </div>
        </div>

        <!-- 个人中心 -->
        <div class="lb-toolbar__item" title="个人中心">
          <a href="/user.html">
            <i class="lb-toolbar__icon lb-icon-user"></i>
          </a>
        </div>

        <!-- 返回顶部 -->
        <div class="lb-toolbar__item" title="返回顶部" id="backTop" @click="scrollToTop">
          <i class="lb-toolbar__icon lb-icon-backtop"></i>
        </div>
      </div>
    </div>

    <FooterBar />
  </div>
</template>

<style lang="less">
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  position: relative;
 
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.main-layout {
  flex: 1;
  display: flex;
  gap: 24px;
  margin: 24px auto;
  padding: 0 24px;
  width: 100%;
  position: relative;
  justify-content: center;
  
  @media (max-width: 1024px) {
    padding: 0 16px;
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 12px;
    gap: 12px;
  }
}

.sidebar-wrapper {
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 90px;
  // height: fit-content;
  height: calc(100vh - 90px); /* 添加这行，限制侧边栏最大高度 */
  overflow-y: visible; /* 改为 visible，允许子菜单溢出 */
  z-index: 1;
  margin-right: 0;
  
  @media (max-width: 1024px) {
    width: 200px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    position: static;
    margin-bottom: 12px;
    margin-right: 0;
  }
}

.main-content {
  flex: 1;
  min-width: 0;
  background: white;
  border-radius: 12px;

  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 24px;
  z-index: 0;
  // max-width: calc(100% - 264px);
  max-width: 1500px;
  
  @media (max-width: 768px) {
    padding: 16px;
    max-width: 100%;
  }
}

// 工具栏样式优化
.lb-toolbar {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 99;
  
  .lb-toolbar__item {
    background: white;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
    
    .lb-toolbar__icon {
      font-size: 24px;
      color: #666;
    }
    
    .lb-toolbar__badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: #ff4d4f;
      color: white;
      border-radius: 10px;
      padding: 0 6px;
      font-size: 12px;
      min-width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  @media (max-width: 768px) {
    right: 16px;
    bottom: 16px;
    
    .lb-toolbar__item {
      width: 40px;
      height: 40px;
      
      .lb-toolbar__icon {
        font-size: 20px;
      }
    }
  }
}
</style>
