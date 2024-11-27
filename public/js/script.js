// 定义产品列表
const products = [
    "智能分析平台", "云端协作系统", "物联网管理平台", "区块链解决方案",
    "高性能服务器", "存储设备", "网络设备", "光纤", "光模块", "光开关",
    "企业管理系统", "数据分析平台", "物联网平台",
    "锁相放大器", "高光谱相机", "激光器", "减震平台"
];

// 获取DOM元素
const searchInput = document.getElementById('product-search');
const searchSuggestions = document.getElementById('search-suggestions');

// 添加输入事件监听器
searchInput.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.toLowerCase().includes(inputValue)
    );

    searchSuggestions.innerHTML = '';
    if (inputValue && filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const div = document.createElement('div');
            div.textContent = product;
            div.addEventListener('click', function() {
                searchInput.value = product;
                searchSuggestions.style.display = 'none';
            });
            searchSuggestions.appendChild(div);
        });
        searchSuggestions.style.display = 'block';
    } else {
        searchSuggestions.style.display = 'none';
    }
});

// 添加点击事件监听器，用于隐藏建议列表
document.addEventListener('click', function(e) {
    if (e.target !== searchInput && e.target !== searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const techNav = document.querySelector('.tech-nav');
    const contentArea = document.getElementById('content-area');

    techNav.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const category = e.target.textContent;
            loadContent(category);
        }
    });

    techNav.addEventListener('mouseover', function(e) {
        if (e.target.tagName === 'A') {
            const submenu = e.target.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.style.display = 'block';
            }
        }
    });

    techNav.addEventListener('mouseout', function(e) {
        if (e.target.tagName === 'A') {
            const submenu = e.target.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.style.display = 'none';
            }
        }
    });

    function loadContent(category) {
        // 这里可以使用 AJAX 请求来加载相应类别的内容
        // 为了演示，我们只是简单地更新内容区域的文本
        contentArea.innerHTML = `<h2>${category}</h2><p>这里是 ${category} 的详细内容。</p>`;
    }
});
