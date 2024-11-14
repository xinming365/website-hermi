<template>
    <div class="content-wrapper">
      <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">
          <li 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="{ 'layui-this': currentCategory === tab.category }"
            @click="switchTab(tab.category)"
          >
            {{ tab.name }}
          </li>
        </ul>
  
        <div class="layui-tab-content">
          <div class="article-list">
            <div v-for="article in articles" :key="article.id" class="layui-card">
              <div class="layui-card-header">
                <h3>
                  <router-link 
                    :to="`/article/${article.id}`" 
                    class="article-title"
                    target="_blank"
                  >
                    {{ article.title }}
                  </router-link>
                </h3>
                <span class="article-date">{{ formatDate(article.createdAt) }}</span>
              </div>
              <div class="layui-card-body">
                {{ truncateContent(article.content) }}
              </div>
            </div>
          </div>
  
          <!-- 分页组件 -->
          <div class="article-pager">
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              @current-change="handlePageChange"
              layout="prev, pager, next"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ElPagination } from 'element-plus'
  import 'element-plus/dist/index.css'
  import Layui from '@layui/layui-vue'
  import '@layui/layui-vue/lib/index.css'

  export default {
    name: 'TechArticles',
    
    data() {
      return {
        tabs: [
          { name: '实验测量', category: 'measurements' },
          { name: '光电设备', category: 'tech' },
          { name: '计算机前沿', category: 'computers' },
          { name: '搭建使用', category: 'experiments' }
        ],
        currentCategory: 'measurements',
        articles: [],
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    },
  
    methods: {
      async fetchArticles() {
        try {
          const response = await fetch(
            `http://localhost:3000/admin/articles?currentPage=${this.currentPage}&pageSize=${this.pageSize}&category=${this.currentCategory}`,
            {
              method: 'GET',
              mode: 'cors',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
  
          if (!response.ok) {
            if (response.status === 401) {
              this.$router.push('/login')
              return
            }
            throw new Error(`HTTP error! status: ${response.status}`)
          }
  
          const result = await response.json()
          this.articles = result.data.articles
          this.total = result.data.pagination.total
        } catch (error) {
          console.error('获取文章列表失败:', error)
        }
      },
  
      switchTab(category) {
        this.currentCategory = category
        this.currentPage = 1
        this.fetchArticles()
      },
  
      handlePageChange(page) {
        this.currentPage = page
        this.fetchArticles()
      },
  
      formatDate(date) {
        return new Date(date).toLocaleDateString()
      },
  
      truncateContent(content) {
        return content.substring(0, 200) + '...'
      }
    },
  
    created() {
      this.fetchArticles()
    }
  }
  </script>
  
  <style scoped>
  .article-title {
    text-decoration: none;
    color: #333;
  }
  
  .article-date {
    color: #999;
    font-size: 0.9em;
  }
  
  .layui-card {
    margin-bottom: 15px;
  }
  
  .article-pager {
    margin-top: 20px;
    text-align: center;
  }
  </style>