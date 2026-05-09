// 统一Toast通知管理器 - 教案活井
(function(global) {
    'use strict';

    const ToastManager = {
        container: null,
        queue: [],
        isProcessing: false,
        minInterval: 2000,
        lastShowTime: 0,

        init: function() {
            if (this.container) return;
            
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.style.cssText = `
                position: fixed;
                top: 5rem;
                right: 1.5rem;
                z-index: 10001;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                pointer-events: none;
            `;
            document.body.appendChild(this.container);

            const style = document.createElement('style');
            style.textContent = `
                @keyframes toastSlideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes toastSlideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                .toast-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    color: white;
                    font-weight: 600;
                    font-size: 0.95rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    pointer-events: auto;
                    animation: toastSlideIn 0.3s ease;
                    max-width: 360px;
                    min-width: 200px;
                }
                .toast-item.removing {
                    animation: toastSlideOut 0.3s ease forwards;
                }
                .toast-item.success {
                    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
                }
                .toast-item.error {
                    background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
                }
                .toast-item.warning {
                    background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
                }
                .toast-item.info {
                    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
                }
                .toast-icon {
                    font-size: 1.25rem;
                    flex-shrink: 0;
                }
                .toast-message {
                    flex: 1;
                    line-height: 1.4;
                }
            `;
            document.head.appendChild(style);
        },

        getIcon: function(type) {
            const icons = {
                success: '✓',
                error: '✕',
                warning: '⚠',
                info: 'ℹ'
            };
            return icons[type] || icons.info;
        },

        show: function(message, type = 'info') {
            const now = Date.now();
            
            if (now - this.lastShowTime < this.minInterval && this.queue.length > 0) {
                const lastToast = this.container.querySelector('.toast-item:last-child');
                if (lastToast && lastToast.textContent.includes(message.substring(0, 10))) {
                    return;
                }
            }
            
            this.lastShowTime = now;
            this.queue.push({ message, type });
            this.processQueue();
        },

        processQueue: function() {
            if (this.isProcessing || this.queue.length === 0) return;
            
            this.isProcessing = true;
            const { message, type } = this.queue.shift();
            
            const toast = document.createElement('div');
            toast.className = `toast-item ${type}`;
            toast.innerHTML = `
                <span class="toast-icon">${this.getIcon(type)}</span>
                <span class="toast-message">${message}</span>
            `;
            
            this.container.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('removing');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                    this.isProcessing = false;
                    this.processQueue();
                }, 300);
            }, 3000);
        },

        success: function(message) {
            this.show(message, 'success');
        },

        error: function(message) {
            this.show(message, 'error');
        },

        warning: function(message) {
            this.show(message, 'warning');
        },

        info: function(message) {
            this.show(message, 'info');
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ToastManager.init());
    } else {
        ToastManager.init();
    }

    global.ToastManager = ToastManager;
    global.showToast = function(message, type) {
        ToastManager.show(message, type);
    };

})(window);
