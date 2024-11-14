<script setup>
const navItems = [
  { path: '/', name: '首页' },
  { path: '/product_center', name: '产品信息' },
  { path: '/daili', name: '代理品牌' },
  { path: '/articles', name: '技术文章' },
  { path: '/downloads', name: '下载中心' },
  { path: '/contact', name: '联系我们' }
]
</script>

<template>
  <nav>

    <ul>
      <div>
        <router-link to="/">
        <img src="../../assets/images/logo.png" alt="Logo" class="logo"/>
        </router-link>
      </div>

      <li v-for="item in navItems" :key="item.path">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
      <li>
        <!-- <router-link :to="{path: '/login'}" <router-link></router-link> -->
      </li>
    </ul>
  </nav>

</template>

<style scoped>
.logo {
    height: 100px; /* 设置logo的高度 */
    margin-bottom: 0; /* 调整底部间距 */
    /* align-items: flex-end; */
    /* margin-right: 0rem; logo与导航项之间的间距 */
} 

/* 导航栏样式 */
nav {
    background-color: #0a1929;
    padding: 0rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    
}

nav ul li {
    margin: 0 1.5rem;
    line-height: 100px;
    font-size: 1.2rem;
}

nav ul li a {
    color: #a0b4c7;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

/* nav ul li a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #4fc3f7;
    transition: width 0.3s ease;
} */

/* nav ul li a:hover {
    /* color: #4fc3f7; */
    /* background-color: #555; */
/* } */ 


nav ul li a:hover::after {
    width: 100%;
    color:none;
}

.router-link-active {
  color: #d5d8d7; /* 激活状态的颜色 */
  font-weight: bold;
}
</style>