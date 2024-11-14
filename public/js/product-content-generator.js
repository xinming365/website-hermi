document.addEventListener('DOMContentLoaded', function() {
    let productsData;
    fetch('/meta_data/products.json')
        .then(response => response.json())
        .then(data => {
            productsData = data;
            initializeContent();
        })
        .catch(error => console.error('加载产品数据时出错:', error));

    function initializeContent() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.getElementById('main-content');

        if (!sidebar || !mainContent) {
            console.error('无法找到侧边栏或主内容区元素');
            return;
        }

        // 获取一级目录项
        const topLevelItems = sidebar.querySelectorAll('.tech-nav > li > a');
        console.log('找到一级目录项', topLevelItems);

        topLevelItems.forEach(item => {
            // 创建content-title
            const categoryName = item.textContent.trim();
            const contentTitle = document.createElement('div');
            contentTitle.className = 'content-title';
            contentTitle.textContent = categoryName;

            // 创建content-description
            const contentDescription = document.createElement('div');
            contentDescription.className = 'content-description';

            // 创建content-area并设置三列布局
            const contentArea = document.createElement('div');
            contentArea.className = 'content-area';
            contentArea.style.display = 'grid';
            contentArea.style.gridTemplateColumns = 'repeat(3, 1fr)';
            contentArea.style.gap = '20px';

            // 这里您需要根据实际情况填充contentArea的内容
            const categoryProducts = productsData[categoryName] || [];
            categoryProducts.forEach(product => {
                const productItem = createProductItem(product);
                contentArea.appendChild(productItem);
            });

            contentDescription.appendChild(contentArea);

            // 将新创建的元素添加到主内容区
            mainContent.appendChild(contentTitle);
            mainContent.appendChild(contentDescription);
        });
    }

    function createProductItem(product) {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const productLink = document.createElement('a');
        productLink.href = product.url;
        // productLink.textContent = product.name;
        productLink.className = 'product-link';

        const productName = document.createElement('h3');
        productName.textContent = product.name;
        productName.className = 'product-name';

        productLink.appendChild(productName);
        productCard.appendChild(productLink);
        // productCard.appendChild(productName);
        
        productItem.appendChild(productCard);
        productItem.dataset.productId = product.id;
        
        // 添加点击事件监听器
        productItem.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认的链接行为
            window.location.href = product.url; // 跳转到产品页面
        });

        return productItem;
    }

    // 监听sidebar加载完成的自定义事件
    document.addEventListener('sidebarLoaded', initializeContent);
});
