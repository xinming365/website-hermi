<template>
  <div class="menu-wrapper">
    <nav class="sidebar-nav">
      <!-- 主导航列表 -->
      <h2 class="nav-title">全部产品分类</h2>
      <ul class="primary-nav">
        <li v-for="(category, index) in categories" 
            :key="index"
            class="primary-item"
            :class="{ 'active': activeIndex === index }"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave">
          <span class="primary-link">
            {{ category.name }}
            <i class="arrow">›</i>
          </span>

          <!-- 子菜单面板 - 直接在每个主菜单项中 -->
          <div class="submenu-panel" 
               v-if="activeIndex === index"
               @mouseenter="keepSubmenu"
               @mouseleave="handleMouseLeave">
            <div class="submenu-content">
              <div v-for="subCategory in category.sub_categories" 
                   :key="subCategory.tid"
                   class="submenu-section">
                <h3 class="section-title">{{ subCategory.name }}</h3>
                <div class="product-grid">
                  <router-link
                    v-for="product in subCategory.products"
                    :key="product.id"
                    :to="`/product/${product.id}`"
                    class="product-item"
                  >
                    {{ product.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import productData from '../../assets/hermi_product_center.json'

export default {
  name: 'SideBar',
  data() {
    return {
      categories: productData,
      activeIndex: null,
      timeoutId: null
    }
  },
  computed: {
    activeCategory() {
      return this.activeIndex !== null ? this.categories[this.activeIndex] : null
    }
  },
  methods: {
    handleMouseEnter(index) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      this.activeIndex = index
      
      this.$nextTick(() => {
        const menuItems = document.querySelectorAll('.primary-item')
        const menuItem = document.querySelectorAll('.primary-item')[index-1]
        if (!menuItem) return

        const submenu = menuItem.querySelector('.submenu-panel')
        if (menuItem && submenu) {
          const menuItemRect = menuItem.getBoundingClientRect()
          submenu.style.top = '0'
          submenu.style.left = '100%'
          
          const submenuRect = submenu.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          const BOTTOM_BUFFER = 50

          if (index === this.categories.length - 1) {
            const offset = 300 
            submenu.style.top = `-${offset}px`
          } else if (submenuRect.bottom > (viewportHeight - BOTTOM_BUFFER)) {
            const overflowY = submenuRect.bottom - (viewportHeight - BOTTOM_BUFFER)
            submenu.style.top = `-${overflowY}px`
          }
        }
      })
    },
    handleMouseLeave() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      this.timeoutId = setTimeout(() => {
        this.activeIndex = null
      }, 200)
    },
    keepSubmenu() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
    }
  }
}
</script>

<style scoped>
.menu-wrapper {
  position: relative;
  z-index: 100;
}

.sidebar-nav {
  --primary-color: #0071e3;
  --hover-bg: rgba(0, 0, 0, 0.04);
  --text-primary: #1d1d1f;
  --text-secondary: #86868b;
  
  width: 240px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
}

.nav-title {
  text-align: center;
  padding: 16px 0;
  margin-bottom: 16px;
  font-size: 1.6em;
  font-weight: 600;
  background: linear-gradient(135deg, #0071e3, #40a9ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.nav-container {
  position: relative;
}

.primary-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.primary-item {
  padding: 12px 20px;
  margin: 4px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.primary-item:hover,
.primary-item.active {
  background-color: var(--hover-bg);
  transform: translateX(4px);
}

.primary-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-primary);
  font-weight: 450;
  font-size: 15px;
}

.arrow {
  font-style: normal;
  color: var(--text-secondary);
  transition: transform 0.2s ease;
}

.primary-item:hover .arrow,
.primary-item.active .arrow {
  transform: translateX(4px);
}

.submenu-panel {
  position: absolute;
  left: 100%;
  width: 1200px;
  top: -10px;
  max-height: calc(100vh - 140px);
  margin-left: 8px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  z-index: 1000;
  overflow-y: auto;
}

.submenu-content {
  max-height: 900px;  /* 这里控制内容区域的最大高度 */
  padding: 20px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.submenu-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.product-item {
  color: var(--text-secondary);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: block;
}

.product-item:hover {
  color: var(--primary-color);
  background-color: var(--hover-bg);
  transform: translateX(4px);
}

/* 响应式布局 */
@media (max-width: 1400px) {
  .submenu-panel {
    width: 600px;
  }
}

@media (max-width: 1200px) {
  .submenu-panel {
    width: 500px;
  }
}
</style>