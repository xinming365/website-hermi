document.addEventListener('DOMContentLoaded', function() {
    const components = [
        { id: 'header-placeholder', file: '../../../components/header.html' },
        { id: 'nav-placeholder', file: '../../../components/nav.html' },
        { id: 'sidebar-placeholder', file: '../../../components/sidebar.html' },
        { id: 'footer-placeholder', file: '../../../components/footer.html' }
    ];

    components.forEach(component => {
        fetch(component.file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(component.id).innerHTML = data;
                if (component.id === 'sidebar-placeholder') {
                    // 触发自定义事件，表示侧边栏已加载完成
                    document.dispatchEvent(new Event('sidebarLoaded'));
                }
            })
            .catch(error => console.error(`加载 ${component.file} 时出错:`, error));
    });
});