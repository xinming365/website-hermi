document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始初始化侧边栏...');
        // 检查sidebar元素是否存在
    const sidebar = document.querySelector('.sidebar');
    console.log('侧边栏元素:', sidebar);
    // 检查tech-nav元素
    const techNav = sidebar.querySelector('tech-nav');
    console.log('tech-nav元素:', techNav);
    
    // const navItems = document.querySelectorAll('.tech-nav > li');
    const navItems = document.querySelectorAll('.tech-nav > li.has-submenu');
    console.log('找到导航项数量:', navItems.length);

    navItems.forEach(item => {
        // const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu'); // 修改这里
        console.log('找到的子菜单:', submenu);
        const hasSubmenu = item.querySelector('.has-submenu'); // 修改这里
        console.log('找到的子菜单222222222:', hasSubmenu);
        if (submenu) {
            item.addEventListener('mouseenter', () => {
                console.log('鼠标进入:', item);
                submenu.style.display = 'block';
                console.log('子菜单已显示 ... ');
                console.log('显示的子菜单的样式:', submenu.style);
            });

            item.addEventListener('mouseleave', () => {
                console.log('鼠标离开:', item);
                submenu.style.display = 'none';
            });
        }
    });
});
