<template>
    <div class="sidebar">
      <h2>全部产品分类</h2>
      <ul class="tech-nav">
        <li v-for="category in categories" 
            :key="category.name" 
            class="has-submenu">
          <a href="#" @mouseover="showSubmenu" @mouseleave="hideSubmenu">
            {{ category.name }}
          </a>
          <ul class="submenu">
            <li v-for="item in category.items" :key="item.name">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SideBar',
    data() {
      return {
        categories: [


 {
          name: '计算机设备',
          items: [
            { name: '工作站', path: '/tower-server' },
            { name: 'gpu工作站', path: '/tower-server' },
            { name: '定制工作站', path: '/tower-server' },
            { name: '电脑组件', path: '/tower-server' }
          ]
        },
        {
          name: '服务器设备',
          items: [
            { name: '刀片服务器', path: '/blade-server' },
            { name: '高性能计算服务器', path: '/hpc-server' },
            { name: 'AI服务器', path: '/hpc-server' }
          ]
        },
        {
          name: '光学器件',
          items: [
            { name: '反射镜', path: '/blade-server' },
            { name: '透镜', path: '/hpc-server' },
            { name: '分束镜', path: '/hpc-server' }
          ]
        },
        // ... 其他分类数据
        {
          name: '光纤及光纤组件',
          items: [
            { name: '光纤准直/耦合器', path: '/blade-server' },
            { name: '光纤及光纤跳线', path: '/hpc-server' },
            { name: '光纤隔离器', path: '/hpc-server' },
            { name: '光纤工具', path: '/hpc-server' }
          ]
        },
        {
          name: 'Minus K 负刚度隔振平台',
          items: [
            { name: 'BM-1', path: '/blade-server' },
            { name: 'BM-4', path: '/hpc-server' },
            { name: 'BM-6', path: '/hpc-server' },
            { name: 'BM-8', path: '/hpc-server' },
            { name: 'BM-10', path: '/hpc-server' }
          ]
        }
          // ... 其他分类
        ]
      }
    },
    methods: {
      showSubmenu(event) {
        const submenu = event.target.nextElementSibling
        if (submenu) submenu.style.display = 'block'
      },
      hideSubmenu(event) {
        const submenu = event.target.nextElementSibling
        if (submenu) submenu.style.display = 'none'
      }
    }
  }
  </script>
  
  <style scoped>
  @import '../../assets/css/sidebar.css';
  </style>