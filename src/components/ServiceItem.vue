<script setup>
import { ref } from 'vue'

const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const activeTab = ref('features')

const switchTab = (tab) => {
  activeTab.value = tab
}
</script>

<template>
  <div class="em-service-center-section em-service-center-section--1">
    <div class="em-service-center-section__title">
      <span>{{ service.title }}</span>
    </div>

    <div class="em-service-center-section__item">
      <a :href="`/product_center/${service.id}`" :title="service.category">
        <div class="em-service-center-section__img">
          <img :src="service.image" :alt="service.imageAlt"/>
        </div>
        <div class="em-service-center-section__text">{{ service.category }}</div>
      </a>
    </div>

    <div class="em-service-center-section__description">
      <div class="service-tabs">
        <div class="service-tabs__header">
          <div class="service-tabs__title">{{ service.tabTitle }}</div>
          <div class="service-tabs__buttons">
            <button 
              :class="['tab-btn', { active: activeTab === 'features' }]" 
              @click="switchTab('features')"
            >
              特点
            </button>
            <button 
              :class="['tab-btn', { active: activeTab === 'applications' }]" 
              @click="switchTab('applications')"
            >
              应用
            </button>
          </div>
        </div>

        <div class="service-tabs__content">
          <div v-if="activeTab === 'features'" class="tab-content">
            <div class="abstract-section">
              <p class="abstract-text">{{ service.abstract }}</p>
            </div>
            <ul>
              <li v-for="(feature, index) in service.features" :key="index">
                <span v-html="feature"></span>
              </li>
            </ul>
          </div>
          
          <div v-else-if="activeTab === 'applications'" class="tab-content">
            <ul>
              <li v-for="(application, index) in service.applications" :key="index">
                {{ application }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="em-service-center-section__actions">
      <button class="action-btn cart-btn">
        <i class="icon-cart"></i>
        加入购物车
      </button>
      <button class="action-btn wishlist-btn">
        <i class="icon-heart"></i>
        收藏
      </button>
    </div>
  </div>
</template>

<style scoped>
.em-service-center-section {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.em-service-center-section__title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.em-service-center-section__item {
  margin-bottom: 20px;
}

.em-service-center-section__img {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
}

.em-service-center-section__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.em-service-center-section__text {
  margin-top: 10px;
  font-size: 16px;
  color: #666;
}

/* 服务标签样式 */
.service-tabs {
  padding: 15px;
  background: #fff;
  border-radius: 8px;
}

.service-tabs__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.service-tabs__title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.service-tabs__buttons {
  display: flex;
  gap: 10px;
}

.tab-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  background: #409EFF;
  color: #fff;
  border-color: #409EFF;
}




.abstract-section {
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #409EFF;
}

.abstract-text {
  color: #2c3e50;
  font-size: 15px;
  line-height: 1.8;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.3px;
}





.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

.tab-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tab-content li {
  position: relative;
  padding: 12px 0 12px 24px;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  line-height: 1.8;
  transition: all 0.3s ease;
}

.tab-content li:last-child {
  border-bottom: none;
}

.tab-content li:before {
  content: "";
  position: absolute;
  left: 0;
  top: 20px;
  width: 6px;
  height: 6px;
  background: #409EFF;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.tab-content li:hover {
  padding-left: 28px;
  color: #409EFF;
  background-color: #f6f9fe;
}

.tab-content li:hover:before {
  transform: scale(1.5);
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}




</style>