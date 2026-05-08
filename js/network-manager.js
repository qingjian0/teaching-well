/**
 * 网络状态和弱网模式管理模块
 * FR-5: 纯文本弱网模式
 */

// 网络状态检测和弱网模式管理器
const NetworkManager = {
    isOnline: true,
    isWeakNetwork: false,
    checkInterval: null,
    callbacks: [],
    
    // 初始化网络状态检测
    init() {
        this.updateNetworkStatus();
        
        // 监听网络状态变化事件
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
        
        // 定期检测网络质量
        this.startPeriodicCheck();
    },
    
    // 更新网络状态
    updateNetworkStatus() {
        this.isOnline = navigator.onLine;
        
        // 检测网络类型和质量
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            // 检测网络类型和质量指标
            const isSlowConnection = connection.effectiveType === '2g' || 
                                    connection.effectiveType === 'slow-2g' ||
                                    connection.downlink < 1.5 ||
                                    connection.rtt > 500;
            
            this.isWeakNetwork = !this.isOnline || isSlowConnection;
        } else {
            // 如果不支持 Network Information API，基于在线状态判断
            this.isWeakNetwork = !this.isOnline;
        }
        
        // 通知所有回调函数
        this.notifyCallbacks();
    },
    
    // 处理网络恢复
    handleOnline() {
        console.log('网络已恢复');
        this.updateNetworkStatus();
        this.showNotification('网络已恢复，退出纯文本模式');
    },
    
    // 处理网络断开
    handleOffline() {
        console.log('网络已断开');
        this.updateNetworkStatus();
        this.showNotification('网络已断开，切换到纯文本模式，支持离线查看已保存内容');
    },
    
    // 开始定期检测
    startPeriodicCheck() {
        this.checkInterval = setInterval(() => {
            this.checkNetworkQuality();
        }, 30000); // 每30秒检测一次
    },
    
    // 检测网络质量
    async checkNetworkQuality() {
        if (!this.isOnline) {
            this.updateNetworkStatus();
            return;
        }
        
        try {
            const startTime = performance.now();
            await fetch(window.location.origin + '/favicon.ico', { 
                cache: 'no-store',
                mode: 'no-cors'
            });
            const endTime = performance.now();
            const latency = endTime - startTime;
            
            // 如果延迟超过2秒，判定为弱网
            if (latency > 2000) {
                this.isWeakNetwork = true;
                this.notifyCallbacks();
            } else {
                // 重新检测网络状态
                this.updateNetworkStatus();
            }
        } catch (error) {
            // 网络请求失败，可能处于弱网状态
            this.isWeakNetwork = true;
            this.notifyCallbacks();
        }
    },
    
    // 手动触发网络检测
    async forceCheck() {
        await this.checkNetworkQuality();
        return {
            isOnline: this.isOnline,
            isWeakNetwork: this.isWeakNetwork
        };
    },
    
    // 注册状态变化回调
    onStatusChange(callback) {
        this.callbacks.push(callback);
    },
    
    // 通知所有回调
    notifyCallbacks() {
        const status = {
            isOnline: this.isOnline,
            isWeakNetwork: this.isWeakNetwork
        };
        this.callbacks.forEach(callback => callback(status));
    },
    
    // 显示通知
    showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'network-notification';
        notification.innerHTML = `
            <span class="notification-icon">${this.isOnline ? '📶' : '📴'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // 自动隐藏
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
        
        // 手动关闭
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    },
    
    // 应用纯文本模式
    applyTextOnlyMode() {
        document.body.classList.add('text-only-mode');
        document.documentElement.setAttribute('data-network-mode', 'text-only');
        
        // 隐藏图片和复杂元素
        document.querySelectorAll('img, .complex-graphics, video, canvas').forEach(el => {
            el.style.display = 'none';
        });
        
        this.showNotification('已切换到纯文本模式，适合弱网环境');
    },
    
    // 退出纯文本模式
    exitTextOnlyMode() {
        document.body.classList.remove('text-only-mode');
        document.documentElement.setAttribute('data-network-mode', 'normal');
        
        // 恢复图片和复杂元素
        document.querySelectorAll('img, .complex-graphics, video, canvas').forEach(el => {
            el.style.display = '';
        });
    },
    
    // 手动切换模式
    toggleTextOnlyMode() {
        if (document.body.classList.contains('text-only-mode')) {
            this.exitTextOnlyMode();
        } else {
            this.applyTextOnlyMode();
        }
    },
    
    // 获取当前状态
    getStatus() {
        return {
            isOnline: this.isOnline,
            isWeakNetwork: this.isWeakNetwork
        };
    },
    
    // 销毁
    destroy() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }
        this.callbacks = [];
    }
};

// 离线存储管理
const OfflineStorage = {
    DB_NAME: 'TeachingWellDB',
    DB_VERSION: 1,
    STORE_TEMPLATES: 'templates',
    STORE_LESSON_PLANS: 'lessonPlans',
    STORE_FEEDBACKS: 'feedbacks',
    STORE_SHARED_PLANS: 'sharedPlans',
    
    db: null,
    
    // 初始化 IndexedDB
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            
            request.onerror = () => {
                console.error('IndexedDB 初始化失败');
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                console.log('IndexedDB 初始化成功');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // 创建模板存储
                if (!db.objectStoreNames.contains(this.STORE_TEMPLATES)) {
                    db.createObjectStore(this.STORE_TEMPLATES, { keyPath: 'id' });
                }
                
                // 创建教案存储
                if (!db.objectStoreNames.contains(this.STORE_LESSON_PLANS)) {
                    const lessonPlanStore = db.createObjectStore(this.STORE_LESSON_PLANS, { keyPath: 'id' });
                    lessonPlanStore.createIndex('createdAt', 'createdAt', { unique: false });
                }
                
                // 创建反馈存储
                if (!db.objectStoreNames.contains(this.STORE_FEEDBACKS)) {
                    const feedbackStore = db.createObjectStore(this.STORE_FEEDBACKS, { keyPath: 'id' });
                    feedbackStore.createIndex('createdAt', 'createdAt', { unique: false });
                    feedbackStore.createIndex('status', 'status', { unique: false });
                }
                
                // 创建共享教案存储
                if (!db.objectStoreNames.contains(this.STORE_SHARED_PLANS)) {
                    const sharedStore = db.createObjectStore(this.STORE_SHARED_PLANS, { keyPath: 'id' });
                    sharedStore.createIndex('createdAt', 'createdAt', { unique: false });
                    sharedStore.createIndex('author', 'author', { unique: false });
                }
            };
        });
    },
    
    // 保存模板到离线存储
    async saveTemplate(template) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.STORE_TEMPLATES], 'readwrite');
            const store = transaction.objectStore(this.STORE_TEMPLATES);
            const request = store.put(template);
            
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    },
    
    // 获取所有离线模板
    async getTemplates() {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.STORE_TEMPLATES], 'readonly');
            const store = transaction.objectStore(this.STORE_TEMPLATES);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },
    
    // 保存教案到离线存储
    async saveLessonPlan(lessonPlan) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.STORE_LESSON_PLANS], 'readwrite');
            const store = transaction.objectStore(this.STORE_LESSON_PLANS);
            const request = store.put(lessonPlan);
            
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    },
    
    // 获取所有离线教案
    async getLessonPlans() {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.STORE_LESSON_PLANS], 'readonly');
            const store = transaction.objectStore(this.STORE_LESSON_PLANS);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },
    
    // 删除教案
    async deleteLessonPlan(id) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.STORE_LESSON_PLANS], 'readwrite');
            const store = transaction.objectStore(this.STORE_LESSON_PLANS);
            const request = store.delete(id);
            
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }
};

// 初始化网络管理
window.addEventListener('DOMContentLoaded', () => {
    NetworkManager.init();
    OfflineStorage.init();
    
    // 注册网络状态变化回调
    NetworkManager.onStatusChange((status) => {
        if (status.isWeakNetwork) {
            NetworkManager.applyTextOnlyMode();
        } else {
            NetworkManager.exitTextOnlyMode();
        }
    });
    
    // 暴露到全局
    window.NetworkManager = NetworkManager;
    window.OfflineStorage = OfflineStorage;
});
