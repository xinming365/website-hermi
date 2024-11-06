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
      <li v-for="item in navItems" :key="item.path">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

.router-link-active {
  color: #d5d8d7; /* 激活状态的颜色 */
  font-weight: bold;
}
</style>