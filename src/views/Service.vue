<script setup>
import '@/assets/css/main.css'
import '/public/libs/quotes/icon_font.css'
import '/public/libs/quotes/service.css'
import { ElPagination } from 'element-plus'
import { shallowRef, computed, onMounted } from 'vue'
import ServiceItem from '@/components/ServiceItem.vue'

// 静态服务数据
const staticServices = [
  {
    id: 1,
    title: '微纳光学',
    category: '涡旋波片及相位板',
    image: 'https://images.lbtek.com/mall/category/涡旋波片阵列-FsRBD0d9OApC4XICbwP_ALQNamRO.jpg',
    tabTitle: '精密镀膜设备',
    abstract: '专业的微纳光学解决方案提供商，致力于为客户提供高质量的涡旋波片及相位板产品。',
    features: [
      '使用喷嘴的扫描式喷涂系统，例如旋转雾化，低压雾化和静电雾化',
      '通过最佳系统配置来提高涂层的精度和喷涂效率',
      '可实现在大型、三维、凹凸工件上灵活形成从纳米级超薄膜到数微米薄膜厚度的镀膜工艺'
    ],
    applications: [
      '光学通信领域',
      '激光加工',
      '光学成像'
    ]
  },

  {
    id: 2,
    title: '镀膜服务商',
    category: '涡旋波片及相位板',
    image: 'https://images.lbtek.com/mall/category/涡旋波片阵列-FsRBD0d9OApC4XICbwP_ALQNamRO.jpg',
    tabTitle: '光学镀膜服务',
    abstract: '提供品种齐全的镀膜产品系列，如抗划伤硬质减反膜、截止和带通滤光片、紫外带通滤光片以及激光防护滤光片等各种专用的镀膜产品。',
    features: [
      '我们的减反膜和滤光片膜确保从紫外到红外的宽光谱范围高透射率。 取决于所需的带宽和激光波长的数量，我们可根据您的特定需求量身定制透射率。',
      '截止和带通滤光片：产品系列包括从紫外到近红外波段的窄带滤光片和高截止短通与长通滤光片。 采用 <span class="tooltip-term" data-tooltip="离子辅助沉积(Ion Assisted Deposition)，一种先进的光学薄膜沉积技术，可提高薄膜的致密性和稳定性">IAD</span> 和溅射技术，我们确保滤光片具有最高的精度和耐用性。',
      '紫外带通滤光片：用于流体和气体分析的紫外带通滤光片可为各种光谱应用提供长期可靠的性能。 这些滤光片模组在窄带通之外具有高截止特性以确保高信噪比。',
      '低缺陷：通过在滤光玻璃的经验积累和专业知识以及齐全的镀膜种类，我们可以为 <span class="tooltip-term" data-tooltip="电荷耦合器件(Charge-Coupled Device)，一种用于图像捕捉的感光元件">CCD</span> 和 <span class="tooltip-term" data-tooltip="互补金属氧化物半导体(Complementary Metal-Oxide-Semiconductor)，一种用于制造图像传感器的技术">CMOS</span> 传感器的保护玻璃提供低缺陷减反和截紫外解决方案。 我们的低缺陷镀膜经过优化可显著提高肖特 BG 滤光玻璃的环境耐久性。'
    ],
    applications: [
      '大功率激光器的镀膜，可用于激光加工、医药和科研领域的各种应用。采用E-Beam、IAD 和 IBS 等现代镀膜技术生产的低损耗、高激光损伤阈值（LIDT）激光薄膜广泛应用于非球面、窗口和棱镜等光学元件。',
      '品种繁多的滤光片，适用于机器视觉、自动化和生命科学领域以改善您的成像对比度并提高信噪比。',
      '减反膜通过减少表面反射来增加光学系统的整体透射率。 我们提供品种繁多的减反膜系列，广泛应用于从DUV 深紫外到 IR近红外波长范围的成像、激光、国防和航空航天等应用领域。'
    ],
    url: 'https://www.schott.com/zh-cn/products/optical-coatings-p1000264/product-variants'
  },

  {
    id: 3,
    title: '微纳光学',
    category: '涡旋波片及相位板',
    image: 'https://images.lbtek.com/mall/category/涡旋波片阵列-FsRBD0d9OApC4XICbwP_ALQNamRO.jpg',
    tabTitle: '精密镀膜设备',
    abstract: '专业的微纳光学解决方案提供商，致力于为客户提供高质量的涡旋波片及相位板产品。',
    features: [
      '使用喷嘴的扫描式喷涂系统，例如旋转雾化，低压雾化和静电雾化',
      '通过最佳系统配置来提高涂层的精度和喷涂效率',
      '可实现在大型、三维、凹凸工件上灵活形成从纳米级超薄膜到数微米薄膜厚度的镀膜工艺'
    ],
    applications: [
      '光学通信领域',
      '激光加工',
      '光学成像'
    ]
  },


  {
    id: 4,
    title: '微纳光学',
    category: '涡旋波片及相位板',
    image: 'https://images.lbtek.com/mall/category/涡旋波片阵列-FsRBD0d9OApC4XICbwP_ALQNamRO.jpg',
    tabTitle: '精密镀膜设备',
    abstract: '专业的微纳光学解决方案提供商，致力于为客户提供高质量的涡旋波片及相位板产品。',
    features: [
      '使用喷嘴的扫描式喷涂系统，例如旋转雾化，低压雾化和静电雾化',
      '通过最佳系统配置来提高涂层的精度和喷涂效率',
      '可实现在大型、三维、凹凸工件上灵活形成从纳米级超薄膜到数微米薄膜厚度的镀膜工艺'
    ],
    applications: [
      '光学通信领域',
      '激光加工',
      '光学成像'
    ]
  },


  {
    id: 5,
    title: '微纳光学',
    category: '涡旋波片及相位板',
    image: 'https://images.lbtek.com/mall/category/涡旋波片阵列-FsRBD0d9OApC4XICbwP_ALQNamRO.jpg',
    tabTitle: '精密镀膜设备',
    abstract: '专业的微纳光学解决方案提供商，致力于为客户提供高质量的涡旋波片及相位板产品。',
    features: [
      '使用喷嘴的扫描式喷涂系统，例如旋转雾化，低压雾化和静电雾化',
      '通过最佳系统配置来提高涂层的精度和喷涂效率',
      '可实现在大型、三维、凹凸工件上灵活形成从纳米级超薄膜到数微米薄膜厚度的镀膜工艺'
    ],
    applications: [
      '光学通信领域',
      '激光加工',
      '光学成像'
    ]
  },

  {
    id: 6,
    title: '微纳光学',
    category: '涡旋波片及相位板',
    image: 'https://images.lbtek.com/mall/category/涡旋波片阵列-FsRBD0d9OApC4XICbwP_ALQNamRO.jpg',
    tabTitle: '精密镀膜设备',
    abstract: '专业的微纳光学解决方案提供商，致力于为客户提供高质量的涡旋波片及相位板产品。',
    features: [
      '使用喷嘴的扫描式喷涂系统，例如旋转雾化，低压雾化和静电雾化',
      '通过最佳系统配置来提高涂层的精度和喷涂效率',
      '可实现在大型、三维、凹凸工件上灵活形成从纳米级超薄膜到数微米薄膜厚度的镀膜工艺'
    ],
    applications: [
      '光学通信领域',
      '激光加工',
      '光学成像'
    ]
  },

  {
    id: 7,
    title: '微纳光学',
    category: '涡旋波片及相位板',
    image: 'https://images.lbtek.com/mall/category/涡旋波片阵列-FsRBD0d9OApC4XICbwP_ALQNamRO.jpg',
    tabTitle: '精密镀膜设备',
    abstract: '专业的微纳光学解决方案提供商，致力于为客户提供高质量的涡旋波片及相位板产品。',
    features: [
      '使用喷嘴的扫描式喷涂系统，例如旋转雾化，低压雾化和静电雾化',
      '通过最佳系统配置来提高涂层的精度和喷涂效率',
      '可实现在大型、三维、凹凸工件上灵活形成从纳米级超薄膜到数微米薄膜厚度的镀膜工艺'
    ],
    applications: [
      '光学通信领域',
      '激光加工',
      '光学成像'
    ]
  },
  // ... 其他静态服务数据 ...
]

// 使用 shallowRef 来优化性能
const services = shallowRef(staticServices)
const currentPage = shallowRef(1)
const pageSize = shallowRef(5)
const total = computed(() => services.value.length)

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return services.value.slice(start, end)
})

// 方法
const fetchServiceItems = async () => {
  try {
    // 如果后续需要从API获取数据，可以在这里添加
    // 现在直接使用静态数据，无需模拟延迟
    services.value = staticServices
  } catch (error) {
    console.error('获取服务项目失败:', error)
  }
}

const handlePageChange = (page) => {
  currentPage.value = page
}

// 生命周期钩子
onMounted(() => {
  fetchServiceItems()
})
</script>

<template>
  <div class="service-container">
    <h1 class="main-title">微纳光学服务中心</h1>
    
    <ServiceItem
      v-for="service in paginatedItems"
      :key="service.id"
      :service="service"
    />

    <!-- 只有当总页数大于1时才显示分页 -->
    <div class="pagination" v-if="total > pageSize">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<style scoped>
.service-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.service-list {
  display: flex;
  flex-direction: column;
}

.service-item {
  margin: 10px 0;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: box-shadow 0.3s;
}

.service-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pagination {
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

:deep(.el-pagination) {
  --el-pagination-button-bg-color: #ffffff;
  --el-pagination-hover-color: #409EFF;
}

:deep(.el-pagination .el-pager li),
:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next) {
  min-width: 32px;
  height: 32px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  transition: all 0.3s;
}

:deep(.el-pagination .el-pager li.active) {
  background-color: #409EFF;
  border-color: #409EFF;
  color: #ffffff;
}

:deep(.el-pagination .el-pager li:not(.active):hover),
:deep(.el-pagination .btn-prev:hover),
:deep(.el-pagination .btn-next:hover) {
  border-color: #409EFF;
  color: #409EFF;
  background-color: #ecf5ff;
}

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

.service-tabs__content {
  padding: 10px 0;
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
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}






@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.em-service-center-section__actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  padding: 10px 0;
  border-top: 1px solid #eee;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.action-btn i {
  margin-right: 5px;
  font-size: 16px;
}

.cart-btn {
  background: #409EFF;
  color: #fff;
  border-color: #409EFF;
}

.cart-btn:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}

.wishlist-btn {
  background: #fff;
  color: #666;
}

.wishlist-btn:hover {
  color: #409EFF;
  border-color: #409EFF;
}

.abstract-section {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}


/* 添加tooltip样式 */
:deep(.tooltip-term) {
  position: relative;
  color: #409EFF;
  cursor: help;
  border-bottom: 1px dashed #409EFF;
}

:deep(.tooltip-term:hover::after) {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 12px;
  white-space: nowrap;
  border-radius: 4px;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;
}

:deep(.tooltip-term:hover::before) {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.8);
  margin-bottom: -6px;
  z-index: 1000;
}

</style>