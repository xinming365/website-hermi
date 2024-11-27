document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.has-submenu');
    let hoverTimer;

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                this.querySelector('.submenu').style.display = 'block';
            }, 300); // 300毫秒后显示子菜单
        });

        item.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimer);
            this.querySelector('.submenu').style.display = 'none';
        });
    });

    // 处理子菜单项的点击事件
    const submenuItems = document.querySelectorAll('.submenu a');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            // 这里可以添加加载页面内容的逻辑，例如：
            loadContent(href);
        });
    });
});

function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content-area').innerHTML = data;
        })
        .catch(error => console.error('加载内容时出错:', error));
}
