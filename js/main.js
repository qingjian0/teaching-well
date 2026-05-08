// 乡村教师教学助手 - 主脚本
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ 乡村教师教学助手已加载');
    initLocalAI();
    bindEventListeners();
});

function initLocalAI() {
    console.log('🤖 本地智能引擎初始化中...');
    if (typeof LocalAIEngine !== 'undefined') {
        LocalAIEngine.init();
        console.log('✅ 本地智能引擎初始化完成');
    } else {
        console.warn('⚠️ 本地智能引擎未找到，使用备用方案');
    }
}

function bindEventListeners() {
    const startBtn = document.querySelector('.btn-primary');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            console.log('开始使用按钮点击');
            window.location.href = 'courseware.html';
        });
    }
    
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const mainNav = document.querySelector('.main-nav');
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            console.log('移动端菜单切换');
        });
    }
    
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
}

function showNotification(message, type = 'info') {
    console.log(type + ':', message);
}

function validateForm(formData) {
    for (const [key, value] of Object.entries(formData)) {
        if (!value || value.trim() === '') {
            return { valid: false, message: `请填写${key}` };
        }
    }
    return { valid: true };
}

function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('存储数据失败：', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('获取数据失败：', error);
        return null;
    }
}

window.showToast = function(message, type = 'info') {
    console.log(type + ':', message);
};

console.log('📚 教学助手主脚本加载完成');
