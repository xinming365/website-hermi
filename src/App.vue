<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import NavBar from './components/common/NavBar.vue'
import HeaderBar from './components/common/HeaderBar.vue'
import FooterBar from './components/common/FooterBar.vue'
import SideBar from './components/common/SideBar.vue'
import Login from './views/login/Login.vue'
import ContactView from './components/ContactView.vue'

import '@/assets/css/main.css'
// import 'jquery'
// import '@/libs/quotes/js/toolbar.js'

import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
const route = useRoute()
const router = useRouter()
const isShowSideBar = computed(() => {
  console.log('computed', route.path);
  if(route.path === '/cart') return false
  else return true
})

const handleJump = (path) => {
  router.push(path)
}
onMounted(() => {
  // 动态加载toolbar.js
  const script = document.createElement('script')
  script.src = '/src/libs/quotes/js/toolbar.js'
  script.async = true
  document.body.appendChild(script)
})

 
</script>

<template>
  <div id="app">
    <Login> </Login>
  </div>

    <div class="app-container">
      <HeaderBar class="header" />
      <NavBar class="nav" />
      
      <div class="main-container">
        <aside class="sidebar" v-if="isShowSideBar">
          <SideBar />
        </aside>

        <div class="content-wrapper">
          <main class="main-content">
            <RouterView />
          </main>
        </div>
      </div>


      <div class="lb-toolbar">
  <div id="toolbarMain">
    <div class="lb-toolbar__item" title="在线咨询" onclick="toolbarHandler.contactService()">
      <i class="lb-toolbar__icon lb-icon-kefu"></i>
    </div>
    <div class="lb-toolbar__item" title="浏览记录">
      <a class="lb-toolbar__link" href="/user/browsing_history.html">
        <i class="lb-toolbar__icon lb-icon-history"></i>
      </a>
    </div>
    <div class="lb-toolbar__item" title="购物车" id="cartAnimationEnd" @click="handleJump('/cart')">
      <div class="lb-toolbar__link" href="/cart.html">
        <i class="lb-toolbar__icon lb-icon-cart"></i>
        <span id="cartNums" class="lb-toolbar__badge">12</span>
      </div>
    </div>
    <div class="lb-toolbar__item" title="产品对比" id="compareEntry">
      <a href="/compare.html">
        <i class="lb-toolbar__icon lb-icon-compare"></i>
        <span id="compareNum" class="lb-toolbar__badge">0</span>
      </a>
      <div id="compareModal" class="lb-compare-modal">
      </div>
    </div>
    <div class="lb-toolbar__item" title="个人中心">
      <a href="/user.html">
        <i class="lb-toolbar__icon lb-icon-user"></i>
      </a>
    </div>
    <div class="lb-toolbar__item" title="返回顶部" id="backTop">
      <i class="lb-toolbar__icon lb-icon-backtop"></i>
    </div>
  </div>
  <div class="lb-toolbar__item" title="展开/收起" id="expandBtn">
     <i class="lb-toolbar__icon lb-icon-compress"></i>
  </div>
</div>

      <FooterBar />  
    </div>
    
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  width: 100%;
}

.header, .nav {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

.main-container {
  flex: 1; /* 添加 flex 属性使主内容区域自动填充剩余空间 */
  display: flex;
}

.content-wrapper {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    margin-left: 220px;
    position: relative;
    z-index: 1;
    max-width: 1400px;  /* 添加最大宽度限制 */
    margin: 0 auto;     /* 居中显示 */
}
</style>