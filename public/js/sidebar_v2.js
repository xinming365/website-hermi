document.addEventListener('DOMContentLoaded', function() {
    const categoryItems = document.querySelectorAll('.category-item');
    const subcategoryContainer = document.querySelector('.subcategory-container');

    const subcategories = {
        '计算机设备': ['台式机', '笔记本', '服务器', '工作站'],
        '网络设备': ['路由器', '交换机', '防火墙', '网络存储'],
        '外围设备': ['显示器', '打印机', '扫描仪', '投影仪'],
        '软件与服务': ['操作系统', '办公软件', '安全软件', '云服务']
    };

    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const category = this.getAttribute('data-category');
            const subItems = subcategories[category];
            
            let html = `<h4>${category}</h4><ul>`;
            subItems.forEach(subItem => {
                html += `<li><a href="#">${subItem}</a></li>`;
            });
            html += '</ul>';

            subcategoryContainer.innerHTML = html;
            subcategoryContainer.style.display = 'block';
        });

        item.addEventListener('mouseleave', function() {
            subcategoryContainer.style.display = 'none';
        });
    });
});