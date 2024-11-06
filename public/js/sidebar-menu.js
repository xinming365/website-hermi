document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');

    sidebar.addEventListener('mouseover', function(event) {
        const target = event.target.closest('.has-submenu');
        if (target) {
            const submenu = target.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'block';
            }
        }
    });

    sidebar.addEventListener('mouseout', function(event) {
        const target = event.target.closest('.has-submenu');
        if (target) {
            const submenu = target.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'none';
            }
        }
    });

    // 如果需要点击展开/收起功能，可以保留这部分代码
    sidebar.addEventListener('click', function(event) {
        const target = event.target.closest('.has-submenu > a');
        if (target) {
            event.preventDefault();
            const submenu = target.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('active');
            }
        }
    });
});