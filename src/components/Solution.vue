<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 轮播图数据
const carouselItems = ref([
  {
    id: 1,
    title: '光学解决方案',
    desc: '提供全方位的光学系统解决方案',
    image: '/images/solutions/quantum.jpg',
    link: '/solutions/optical' // 添加链接
  },
  {
    id: 2,
    title: '精密仪器',
    desc: '高精度光学测量设备',
    image: '/images/solutions/measure.jpg',
    link: '/solutions/instruments' // 添加链接
  },
  {
    id: 3,
    title: '光纤技术',
    desc: '先进的光纤通信解决方案',
    image: '/images/solutions/optics.jpg',
    link: '/solutions/fiber' // 添加链接
  }
])

const currentIndex = ref(0)
let timer = null

// 轮播控制函数
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 
    ? carouselItems.value.length - 1 
    : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

// 自动轮播
onMounted(() => {
  timer = setInterval(nextSlide, 5000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

</script>

<template>
    <!-- 轮播区域 -->
    <section class="carousel">
        <div class="solution-header">
 
        <div class="solution-nav">
            <span v-for="(item, index) in carouselItems" 
                :key="item.id"
                :class="['solution-nav-item', { active: index === currentIndex }]"
                @click="goToSlide(index)">
            {{ item.title }}
            </span>
        </div>
        </div>

      <div class="carousel-container">
        <transition-group name="carousel">
          <div v-for="(item, index) in carouselItems" 
               :key="item.id"
               :class="['carousel-item', {
                 'active': index === currentIndex,
                 'prev': (index === currentIndex - 1) || (currentIndex === 0 && index === carouselItems.length - 1),
                 'next': (index === currentIndex + 1) || (currentIndex === carouselItems.length - 1 && index === 0)
               }]">
            <router-link :to="item.link" class="carousel-link"> 
                <img :src="item.image" :alt="item.title">
                <div class="carousel-content">
                <h2>{{ item.title }}</h2>
                <p>{{ item.desc }}</p>
                <button class="learn-more">了解更多</button>
                </div>
                </router-link>
          </div>
        </transition-group>

        <!-- 轮播控制按钮 -->
        <button class="carousel-btn prev" @click="prevSlide">&lt;</button>
        <button class="carousel-btn next" @click="nextSlide">&gt;</button>

        <!-- 轮播指示器 -->
        <div class="carousel-indicators">
          <button v-for="(item, index) in carouselItems"
                  :key="item.id"
                  :class="['indicator', { active: index === currentIndex }]"
                  @click="goToSlide(index)">
          </button>
        </div>
      </div>
    </section>
</template>




<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000px;  /* 添加3D视角效果 */
}

.carousel-item {
    position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.8s ease;
  opacity: 0;
  transform: scale(0.6) translateX(100%);
  visibility: hidden;
  transform: translateX(-50%) scale(0.6);  /* 修改初始状态 */
  transform-origin: center center;
  /* left: 50%;  新增：居中定位 */
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.carousel-btn {
    position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* background: rgba(13, 12, 12, 0.2); */
  background: rgba(0, 0, 0, 0.7);
  color: rgb(245, 237, 237);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

}
.carousel-btn.prev {
  left: 20px;
}

.carousel-btn.next {
  right: 20px;
}

.carousel-btn:hover {
    /* background: rgba(144, 142, 142, 0.9); */
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
}

.carousel-item.active {
  opacity: 1;
  transform: scale(0.7) translateX(0);
  z-index: 2;
  visibility: visible;
}

.carousel-item.prev {
  opacity: 0.5;
  transform: scale(0.6) translateX(-60%);
  z-index: 1;
  visibility: visible;
}

.carousel-item.next {
  opacity: 0.5;
  transform: scale(0.6) translateX(60%);
  z-index: 1;
  visibility: visible;
}
.carousel-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  width: 80%;
  max-width: 800px;
}

.carousel-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
}

.indicator.active {
  background: white;
}



.learn-more {
  padding: 0.8rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}


.solution-header {
  text-align: center;
  padding: 2rem 0;
  background: #f5f5f5;
  position: relative;
  z-index: 3;
}

.solution-header h1 {
    font-size: 2.8rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
  position: relative;
  display: inline-block;
}
 

.solution-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 0.4rem;
}

.solution-nav-item {
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: #666;
  transition: all 0.3s ease;
}

.solution-nav-item.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.solution-nav-item:hover {
  color: #007bff;
}

.carousel-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}
</style>
