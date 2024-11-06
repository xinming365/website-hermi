layui.use(['element', 'laypage'], function(){
  const element = layui.element;
  const laypage = layui.laypage;
  
  // 当前选中的文章类别
  let currentCategory = 'tech';
  const pageSize = 10;
  
  // 获取文章列表
  async function fetchArticles(page = 1, category = 'tech') {
      try {
        //   const response = await fetch(`http://localhost:3000/admin/articles?currentPage=${page}&pageSize=${pageSize}&category=${category}`, {
        //     method: 'GET', // 请求方法
        //     mode: 'cors', // 跨域
        //     credentials: 'include', // 允许跨域请求携带cookie
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        // const response = await fetch(`/admin/articles?currentPage=${page}&pageSize=${pageSize}&category=${category}`, {
        console.log('查询参数：');
        console.log(page, pageSize, category);
        const response = await fetch(`http://localhost:3000/admin/articles?currentPage=${page}&pageSize=${pageSize}&category=${category}`, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          }
        });

        // 添加响应状态检查
        if (!response.ok) {
          if (response.status === 401) {
              // 未授权，重定向到登录页面
                      window.location.href = '/login';
                      return null;
                  }
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
      
          // 检查响应的 Content-Type
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
              throw new Error('返回的不是 JSON 数据!');
          }

          const result = await response.json();
          return result.data;

      } catch (error) {
          console.error('获取文章列表失败:', error);
          return null;
      }
  }
  
  // 渲染文章列表
  function renderArticles(articles, containerId) {
      const container = document.getElementById(containerId);

          // 添加错误检查
    if (!articles || !Array.isArray(articles)) {
      console.error('无效的文章数据:', articles);
      container.innerHTML = '<div class="layui-card"><div class="layui-card-body">暂无文章数据</div></div>';
      return;
  }

      container.innerHTML = articles.map(article => `
          <div class="layui-card">
              <div class="layui-card-header">
             
                  
                  <h3><a href="http://localhost:3000/article/page/${article.id}" class="article-title" target="_blank">${article.title}</a></h3>
                 <span class="article-date">${new Date(article.createdAt).toLocaleDateString()}</span>
                  

              </div>
              <div class="layui-card-body">
                  ${article.content.substring(0, 200)}...
              </div>
          </div>
      `).join('');
  }
  
  // 初始化分页
  function initPagination(total, pagerId, category) {
      laypage.render({
          elem: pagerId,
          count: total,
          limit: pageSize,
          jump: async function(obj) {
              const data = await fetchArticles(obj.curr, category);
              if (data) {
                  renderArticles(data.articles, category + 'Articles');
              }
          }
      });
  }
  
  // 初始化标签页切换事件
  element.on('tab(articleTabs)', function(data){
      const categories = ['measurements', 'tech', 'computers', 'experiments'];
      currentCategory = categories[data.index];
      loadArticles(currentCategory);
  });
  
  // 加载文章列表
  async function loadArticles(category) {
      const data = await fetchArticles(1, category);
      if (data) {
          renderArticles(data.articles, category + 'Articles');
          // console.log('文章数量：');
          // console.log(data.pagination.total);
          initPagination(data.pagination.total, category + 'ArticlesPager', category);
      }
  }
  
  // 初始加载全部文章
  loadArticles('measurements');
});

// 开发环境 服务器端口不匹配：你的API服务器运行在3000端口，但是你在访问5500端口
// <h3><a href="/article/page/${article.id}" class="article-title" target="_blank">${article.title}</a></h3>