document.addEventListener('DOMContentLoaded', () => {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    
    // 监听侧边栏加载完成
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                initializeSidebar();
            }
        });
    });
    
    observer.observe(sidebarPlaceholder, { childList: true });
    
    function initializeSidebar() {
        const menuItems = document.querySelectorAll('.has-submenu');
        
        menuItems.forEach(item => {
            const submenu = item.querySelector('.submenu');
            let timeoutId;
            
            // 鼠标进入主菜单项
            item.addEventListener('mouseenter', (e) => {
                clearTimeout(timeoutId);
                
                // 隐藏其他所有子菜单
                menuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherSubmenu = otherItem.querySelector('.submenu');
                        if (otherSubmenu) {
                            otherSubmenu.style.display = 'none';
                        }
                    }
                });
                
                // 显示当前子菜单
                if (submenu) {
                    submenu.style.display = 'block';
                    // 设置子菜单的top位置为相对于视口的位置
                    // submenu.style.top = `${e.target.getBoundingClientRect().top}px`;
                    // const itemRect = item.getBoundingClientRect();
                    // submenu.style.top = `${itemRect.top}px`;
                }
            });
            
            // 鼠标离开主菜单项
            item.addEventListener('mouseleave', (e) => {
                // 检查鼠标是否移动到子菜单
                if (!isMouseInSubmenu(e, submenu)) {
                    timeoutId = setTimeout(() => {
                        if (submenu) {
                            submenu.style.display = 'none';
                        }
                    }, 200); // 200ms 延迟，提供更好的用户体验
                }
            });
            
            // 如果有子菜单，为子菜单添加事件监听
            if (submenu) {
                submenu.addEventListener('mouseenter', () => {
                    clearTimeout(timeoutId);
                });
                
                submenu.addEventListener('mouseleave', () => {
                    timeoutId = setTimeout(() => {
                        submenu.style.display = 'none';
                    }, 200);
                });
            }
        });
    }
    
    function isMouseInSubmenu(event, submenu) {
        if (!submenu) return false;
        
        const submenuRect = submenu.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        return (
            mouseX >= submenuRect.left &&
            mouseX <= submenuRect.right &&
            mouseY >= submenuRect.top &&
            mouseY <= submenuRect.bottom
        );
    }
});