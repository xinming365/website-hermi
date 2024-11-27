import { defineStore } from 'pinia'
import productDataJson from '@/assets/product_data.json'

export const useProductStore = defineStore('product', {
  state: () => ({
    productData: null,
    currentTid: '',
    tidList: [],
    activeTab: 0
  }),
  
  actions: {
    async fetchProductData(sid, tid) {
      try {
        // 模拟数据获取
        const data = productDataJson
        
        // 处理 tid 列表
        this.tidList = data.tid_list || []
        this.currentTid = tid
        
        this.productData = {
          ...data,
          tabs: [
            {
              name: '参数规格',
              content: {
                detail_desc: data.detail_desc,
                detail_points: data.detail_points,
                common_desc: data.common_desc,
                common_points: data.common_points,
                generalParams: data.general_params
              }
            },
            // ... 其他 tabs 保持不变 ...
          ]
        }
      } catch (error) {
        console.error("获取产品数据失败:", error)
      }
    },
    
    setActiveTab(index) {
      this.activeTab = index
    },
    
    setCurrentTid(tid) {
      this.currentTid = tid
    }
  }
})