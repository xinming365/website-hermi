<template>
  <div class="not-found">
    <el-empty
      image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      :image-style="{ textAlign: 'center', height: '200px' }"
    >
      <template #description>
        <span> 抱歉，您访问的页面不存在。 </span>
      </template>
      <el-button type="primary">
        <router-link to="/">返回首页</router-link>
      </el-button>
    </el-empty>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100vh;
  text-align: center;
}
</style>
