function loadCategories() {
    fetch('./meta_data/categories.json')
        .then(response => response.json())
        .then(data => {
            const contentArea = document.getElementById('content-area');
            for (const [category, subcategories] of Object.entries(data)) {
                const section = document.createElement('section');
                section.className = 'product-category';
                section.innerHTML = `
                    <h2>${category}</h2>
                    <div class="subcategory-grid">
                        ${subcategories.map(sub => `
                            <a href="${sub.url}" class="subcategory-item">${sub.name}</a>
                        `).join('')}
                    </div>
                `;
                contentArea.appendChild(section);
            }
        })
        .catch(error => console.error('加载分类数据时出错:', error));
}

document.addEventListener('DOMContentLoaded', loadCategories);