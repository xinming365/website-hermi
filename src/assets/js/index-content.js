document.addEventListener('DOMContentLoaded', () => {
    const modules = document.querySelectorAll('.module');

    modules.forEach(module => {
        const moduleType = module.getAttribute('data-module');
        const icon = module.querySelector('.module-icon i');

        // 根据模块类型设置不同的图标颜色
        switch (moduleType) {
            case 'news':
                icon.style.color = '#e74c3c';
                break;
            case 'tech':
                icon.style.color = '#3498db';
                break;
            case 'download':
                icon.style.color = '#2ecc71';
                break;
            case 'partners':
                icon.style.color = '#f39c12';
                break;
        }

        // 添加鼠标悬停效果
        module.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
        });

        module.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });

    // 添加模块出现动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    modules.forEach(module => {
        module.style.opacity = '0';
        module.style.transform = 'translateY(20px)';
        module.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(module);
    });
});