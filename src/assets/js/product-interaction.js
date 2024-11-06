document.addEventListener('DOMContentLoaded', function() {
    // 获取所有侧边栏链接
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    // 为每个侧边栏链接添加点击事件监听器
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
