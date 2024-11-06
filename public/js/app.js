// import DevicesOptics from './devices-optics.js';
// import DevicesTemplate from './components/devices-optics.js';




const DevicesTemplate = {
   template: `
    <div class="device-template">
      <div class="global-product-title">{{ title }}</div>


        <div class="product-showcase">
          <div class="image-gallery">
            <img :src="currentImage" :alt="title" class="main-image"  @click="openImageViewer(currentImageIndex)">
            <div class="thumbnails">
              <img v-for="(img, index) in images" 
                  :key="index" 
                  :src="img" 
                  @click="setCurrentImage(index)" 
                  class="thumbnail">
            </div>
          </div>



          <div v-if="showImageViewer" class="image-viewer-overlay" @click.self="closeImageViewer">
          <div class="image-viewer-container">
            <img :src="currentImage" :alt="title" class="viewer-image" 
                :style="{ transform: 'rotate(' + rotation + 'deg) scaleX(' + scaleX + ')' }">
            
              <div class="viewer-controls">
                <button @click="rotateImage(-90)" title="逆时针旋转">
                  <i class="fa-solid fa-rotate-left fa-2x"></i>
                </button>
                <button @click="rotateImage(90)" title="顺时针旋转">
                  <i class="fa-solid fa-rotate-right fa-2x"></i>
                </button>
                <button @click="zoomIn" title="放大">
                  <i class="fa-solid fa-magnifying-glass-plus fa-2x"></i>
                </button>
                <button @click="zoomOut" title="缩小">
                  <i class="fa-solid fa-magnifying-glass-minus fa-2x"></i>
                </button>
                <button @click="flipImage" title="水平翻转">
                  <i class="fa-solid fa-left-right fa-2x"></i>
                </button>
                <button @click="closeImageViewer" title="关闭">
                  <i class="fa-solid fa-xmark fa-2x"></i>
                </button>
              </div>
            </div>
          </div>


        <div class="product-info">
    
          <div class="description">
            <p v-for="(paragraph, index) in descriptionParagraphs" :key="index">{{ paragraph }}</p>
          </div>

          <div class="product-advantages">
            <h2>产品优点</h2>
            <ul>
              <li v-for="advantage in advantages" :key="advantage">{{ advantage }}</li>
            </ul>
          </div>
        </div>
      </div>


    <div class="product-details">
      <div class="section-headers">
        <h2 v-for="(section, index) in sections" 
            :key="index"
            @click="toggleSection(section.id)"
            :class="{ active: activeSection === section.id }"
            class="clickable-header">
          {{ section.title }}
        </h2>
      </div>

      <div class="section-content">

        <div v-show="activeSection === 'features'" class="product-features">

          <div class="product-introduction">
            <div class="product-introduction-title">产品说明</div>
            <ul v-for="(category, index) in featureCategories" :key="index">
              <h4>{{ category.title }}</h4>
              <li v-for="item in category.items" :key="item">{{ item }}</li>
            </ul>
            
            <div class="feature-description">
              <p>{{ featureDescription }}</p>
            </div>
          </div>



          <div class="item-product-table">
              <div class="item-product-table">
                <div class="item-product-table-title">产品特性</div>
                  <table>
                      <thead>
                        <tr>
                          <th v-for="header in formattedItemTableData.headers" :key="header">
                            {{ header }}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="row in formattedItemTableData.rows" :key="row[0]">
                          <td v-for="(cell, index) in row" :key="index">{{ cell }}</td>
                        </tr>
                        <tr v-for="fullWidthRow in formattedItemTableData.fullWidthRows" :key="fullWidthRow">
                          <td :colspan="formattedItemTableData.headers.length">{{ fullWidthRow }}</td>
                        </tr>
                      </tbody>
                  </table>
          </div>

          <div class="item-product-table-notes">
            <h3>说明：</h3>
            <ol>
            <li v-for="(note, index) in itemTableNotes" :key="index">{{ note }}</li>
            </ol>
          </div>

        </div>
        </div>



        <div v-show="activeSection === 'applications'" class="main-applications">
          <ul>
            <li v-for="application in applications" :key="application">
              {{ application }}
            </li>
          </ul>
          {{ applications.length }} <!-- 检查点5: 添加这行来显示数组长度 -->
        </div>

        


        <div v-show="activeSection === 'installation'" class="installation-guide">

          <div class="installation-image">
            <img :src="installationImage" alt="安装指南" class="guide-image">
          </div>
          
          <table class="installation-table">
            <thead>
              <tr>
                <th v-for="header in installationTableHeaders" :key="header">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in installationTableData" :key="row.id">
                <td v-for="(cell, index) in row" :key="index">
                  <a v-if="cell.isLink" :href="cell.url" target="_blank">{{ cell.text }}</a>
                  <template v-else>{{ cell }}</template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        

        <div v-show="activeSection === 'inquiry'" class="product-inquiry">
            <div class="info-section">
              <div class="info-title">所属品牌：</div>  
                <div class="brand-info">
                    <div class="brand-header">
                      <img :src="brandInfo.logo" :alt="brandInfo.name" class="brand-logo">
                      <h2>{{ brandInfo.name }}</h2>
                    </div>
                    <p class="brand-description">{{ brandInfo.description }}</p>
                    <a :href="brandInfo.website" target="_blank" class="brand-website">访问官网</a>
                </div>
            </div>

            <div class="info-section">
              <div class="info-title">联系我们：</div> 
                <div class="contact-info">
                  <div class="contact-section sales">
                    <h3>销售咨询</h3>
                    <ul>
                      <li><strong>联系人：</strong>{{ contactInfo.sales.name }}</li>
                      <li><strong>电话：</strong>{{ contactInfo.sales.phone }}</li>
                      <li><strong>邮箱：</strong>{{ contactInfo.sales.email }}</li>
                      <li><strong>微信：</strong>{{ contactInfo.sales.wechat }}</li>
                      <li><strong>工作时间：</strong>{{ contactInfo.sales.officeHours }}</li>
                    </ul>
                  </div>

                  <div class="contact-section support">
                    <h3>技术支持</h3>
                    <ul>
                      <li><strong>部门：</strong>{{ contactInfo.support.name }}</li>
                      <li><strong>电话：</strong>{{ contactInfo.support.phone }}</li>
                      <li><strong>邮箱：</strong>{{ contactInfo.support.email }}</li>
                      <li><strong>微信：</strong>{{ contactInfo.support.wechat }}</li>
                    </ul>
                  </div>
                </div>
            </div>
        </div>


   
        </div>




      </div>



      <div class="product-table">
        <h2>StockOptics - 库存标准产品</h2>
        <table>
          <thead>
            <tr>
              <th v-for="header in formattedProductTableData.headers" :key="header">
                {{ header }}
              </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in formattedProductTableData.rows" :key="row[0]">
              <td v-for="(cell, index) in row" :key="index">{{ cell }}</td>
            </tr>
            <tr v-for="fullWidthRow in formattedProductTableData.fullWidthRows" :key="fullWidthRow">
              <td :colspan="formattedProductTableData.headers.length">{{ fullWidthRow }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="related-products">
        <h2>相关产品</h2>
        <div class="product-grid">
          <div v-for="product in relatedProducts" :key="product.id" class="product-item">
            <a :href="product.link">
              <img :src="product.image" :alt="product.title" class="product-thumbnail">
              <p class="product-title">{{ product.title }}</p>
            </a>
          </div>
        </div>
      </div>
  </div>
    </div>
    </div>
    `,
    data() {
      return {
        title: '',
        images:[],
        currentImageIndex: 0,
        imageCaption: '',
        description: '',
        descriptionParagraphs: [],
        advantages: [],
        features: [],
        applications: [],
        tableHeaders: [],
        tableData: [],
        itemTableData: [],
        itemTableNotes: [],
        productTableData: [],
        relatedProducts: [],
        // sections: [],
        sections: [
          { id: 'features', title: '产品特性' },
          { id: 'installation', title: '安装指南' },
          { id: 'applications', title: '主要应用' },
          { id: 'inquiry', title: '产品询价' }   // 确保包含installation部分
        ],

        brandInfo: {},
        contactInfo: {},

        activeSection: 'features',

        // activeSection: 'features',
        featureCategories: [],
        featureDescription: '',
        showImageViewer: false,
        rotation: 0,
        scaleX: 1,
        installationTableData: [],
        installationTableHeaders: [],
        installationImage: ''
      } 
    },
    computed: {
        currentImage() {
          return this.images[this.currentImageIndex];
        },

        isInstallationVisible() {
          const isVisible = this.activeSection === 'installation';
          console.log('Installation visibility computed?????????:', isVisible);
          return isVisible;
        },

        formatTableData() {
          return (tableData) => {
            if (!tableData || !tableData.headers) {
              return {
                headers: [],
                rows: [],
                fullWidthRows: []
              };
            }
            
            return {
              headers: tableData.headers,
              rows: tableData.tableData.filter(row => Array.isArray(row))
                .map(row => row),
              fullWidthRows: tableData.tableData.filter(row => !Array.isArray(row))
            };
          };
        },


       // 使用通用函数处理两种表格数据
        formattedItemTableData() {
          return this.formatTableData(this.itemTableData);
        },
  
        formattedProductTableData() {
          return this.formatTableData(this.productTableData);
        }

      
      },

    created() {
        console.log('DevicesTemplate组件已创建');
        console.log('路由参数id:', this.$route.params.id);
      this.loadData();
      this.loadStyles();
    },

    methods: {
      loadData() {
        console.log('开始加载数据，路由参数id:', this.$route.params.id);
        const fileName = this.$route.params.id.replace('.html', '');
        fetch(`/devices/optics/${fileName}.json`)
          .then(response => response.json())
          .then(data => {
            console.log('解析后的数据:', data);
            this.title = data.title;
            this.images = data.images; // 假设JSON中现在提供了多个图片
            this.imageCaption = data.imageCaption;
            this.description = data.description;
            this.descriptionParagraphs = this.description.split('\n\n');
            this.advantages = data.advantages;
            this.features = data.features || [];
            this.applications = data.applications || [];
            console.log('加载的applications数据:', this.applications); 

            this.featureCategories = data.featureCategories || [];
            this.featureDescription = data.featureDescription || '';
            this.itemTableData = data.itemTableData || [];
            this.itemTableNotes = data.itemTableNotes || [];
            this.productTableData = data.productTableData || [];
            this.loadRelatedProducts(data.relatedProducts);

            this.installationTableData = data.installationTableData || [];
            this.installationTableHeaders = data.installationTableHeaders || [];
            this.installationImage = data.installationImage || '';

            this.brandInfo = data.brandInfo || {};
            this.contactInfo = data.contactInfo || {};

            console.log('安装指南数据:', {
              tableData: this.installationTableData,
              headers: this.installationTableHeaders,
              image: this.installationImage
          });

            
            // 设置默认显示的部分
            if (this.sections.length > 0) {
              this.activeSection = this.activeSection || this.sections[0].id;
              console.log('设置的默认显示部分??????:', this.activeSection);
            }

          })
          .catch(error => console.error('加载数据失败:', error));
      },
      setCurrentImage(index) {
        this.currentImageIndex = index;
      },

      toggleSection(sectionId) {
        // console.log('切换到部分:', sectionId); // 添加日志
        this.activeSection = sectionId;
        console.log('切换前的 activeSection ==>> toggleSection:', this.activeSection);


          // 验证数据
        if(sectionId === 'installation') {

          this.$nextTick(() => {
            this.activeSection = sectionId;
            console.log('切换后的 activeSection:', this.activeSection);
            // 验证 DOM 更新
            console.log('安装指南元素可见性:', 
              document.querySelector('.installation-guide').style.display);
          });

          console.log('安装数据:', {
            tableData: this.installationTableData,
            headers: this.installationTableHeaders,
            image: this.installationImage
          });
        }
      },

      loadStyles() {
        // console.log('开始加载样式，路由参数id:', this.$route.params.id);
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/device-template.css';
        document.head.appendChild(link);
      },

      loadRelatedProducts(relatedProductsData) {
        if (Array.isArray(relatedProductsData)) {
          this.relatedProducts = relatedProductsData.map(product => ({
            id: product.id,
            title: product.title,
            image: product.image,
            link: `/devices/optics/${product.id}.html`
          }));
        } else {
          console.error('相关产品数据格式不正确');
        }
      },
        
      openImageViewer(index) {
        this.currentImageIndex = index;
        this.showImageViewer = true;
        this.rotation = 0;
        this.scale = 1;
        this.scaleX = 1;
        document.body.style.overflow = 'hidden';
      },
      
      closeImageViewer() {
        this.showImageViewer = false;
        document.body.style.overflow = 'auto';
      },
      
      rotateImage(degrees) {
        this.rotation = (this.rotation + degrees) % 360;
      },
      
      zoomIn() {
        if (this.scale < 3) {
          this.scale += 0.2;
        }
      },
      
      zoomOut() {
        if (this.scale > 0.4) {
          this.scale -= 0.2;
        }
      },
      
      flipImage() {
        this.scaleX *= -1;
      }



    }
  };




// 定义路由组件
const Home = { template: '<div>首页内容</div>' };

// 定义路由
const routes = [
    { path: '/', component: Home },
    // { path: '/devices-optics/:id', component: DevicesOptics },
    { path: '/devices/optics/:id', 
        component: DevicesTemplate,
        beforeEnter: (to, from, next) => {
            console.log('进入 /devices/:id 路由，参数:', to.params);
            next();
        }
    }
];

// 创建路由实例
const router = new VueRouter({
    mode: 'history',
    routes
});



// 使用 VueRouter
// Vue.use(VueRouter);

// 创建Vue实例
new Vue({
    el: '#app',
    router,
    components: {
        // DevicesOptics
        DevicesTemplate,
    },
    mounted() {
        console.log('Vue组件模板已挂载');
        console.log('路由:', this.$route);
        console.log('当前路由:', this.$route.path);
        console.log('路由参数:', this.$route.params);
        console.log('DevicesTemplate组件:', this.$options.components.DevicesTemplate);
        this.loadStaticComponents();
        // this.loadData();
        // console.log('DevicesOptics已加载', DevicesOptics);
    },
    methods: {
        loadStaticComponents() {
            fetch('/components/header.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('header-placeholder').innerHTML = data;
                });
            fetch('/components/nav.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('nav-placeholder').innerHTML = data;
                });
            fetch('/components/sidebar.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('sidebar-placeholder').innerHTML = data;
                });
            fetch('/components/footer.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('footer-placeholder').innerHTML = data;
                });
        }
    }
});

// 在路由变化时添加日志
router.beforeEach((to, from, next) => {
    console.log('路由变化:', to.path);
    console.log('路由参数:', to.params);
    console.log('查询参数:', to.query);
    next();
});