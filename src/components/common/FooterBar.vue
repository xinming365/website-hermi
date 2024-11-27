<template>
    <footer>
      <div class="footer-container">
        <div v-for="(column, index) in footerColumns" 
             :key="index" 
             class="footer-column">
          <h4>{{ column.title }}</h4>
          <ul>
            <li v-for="item in column.items" :key="item.text">
              <template v-if="item.link">
                <router-link :to="item.link">{{ item.text }}</router-link>
              </template>
              <template v-else>
                {{ item.text }}
              </template>
            </li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <p>{{ copyright }}</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterBar',
    data() {
      return {
        copyright: '© 2023 厄米科技. 引领创新，成就未来。',
        footerColumns: [
          {
            title: '关于厄米',
            items: [
              { text: '了解厄米', link: '/contact#contact' },
              { text: '加入厄米', link: '/contact#join-us' },
              { text: '厄米新闻', link: '/articles#articles' }
            ]
          },
          {
          title: '产品信息',
          items: [
            { text: '相关应用', link: '/product#products' },
            { text: '代理品牌', link: '/daili#daili' },
            { text: '产品信息', link: '/product#products' }
          ]
        },
        {
          title: '资源中心',
          items: [
            { text: '常用下载', link: '/downloads#download' },
            { text: '技术文章', link: '/articles#articles' },
            { text: '网站导航', link: '/index#home' }
          ]
        },
        {
          title: '联系我们',
          items: [
            { text: '电话：+86 123 4567 8900' },
            { text: '邮箱：info@ermitech.com' },
            { text: '微信：ErmiTechService' }
            ]
          }
        ]
      }
    }
  }
  </script>