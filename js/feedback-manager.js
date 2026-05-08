/**
 * 内容纠错反馈管理模块
 * FR-6: 内容纠错反馈功能
 */

// 反馈管理
const FeedbackManager = {
    feedbacks: [],
    currentFeedback: null,
    
    // 初始化
    async init() {
        await this.loadFeedbacks();
        this.setupEventListeners();
    },
    
    // 从本地存储加载反馈记录
    async loadFeedbacks() {
        const stored = localStorage.getItem('feedbacks');
        this.feedbacks = stored ? JSON.parse(stored) : [];
        return this.feedbacks;
    },
    
    // 保存反馈到本地存储
    async saveFeedbacks() {
        localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));
    },
    
    // 设置事件监听
    setupEventListeners() {
        document.addEventListener('mouseup', (e) => {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            if (selectedText.length > 0 && selectedText.length < 1000) {
                this.showQuickReportButton(e, selectedText);
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.quick-report-btn') && !e.target.closest('.feedback-form-modal')) {
                this.hideQuickReportButton();
            }
        });
    },
    
    // 显示快速纠错按钮
    showQuickReportButton(event, selectedText) {
        this.hideQuickReportButton();
        
        const button = document.createElement('div');
        button.className = 'quick-report-btn';
        button.innerHTML = `
            <button class="report-error-btn" title="报告错误">
                <span>⚠️</span>
                <span>纠错</span>
            </button>
        `;
        
        button.style.position = 'fixed';
        button.style.left = event.clientX + 'px';
        button.style.top = (event.clientY + 10) + 'px';
        button.style.zIndex = '10000';
        
        button.querySelector('.report-error-btn').addEventListener('click', () => {
            this.openFeedbackForm(selectedText);
        });
        
        document.body.appendChild(button);
        this.currentSelection = selectedText;
    },
    
    // 隐藏快速纠错按钮
    hideQuickReportButton() {
        const existing = document.querySelector('.quick-report-btn');
        if (existing) existing.remove();
    },
    
    // 打开纠错表单
    openFeedbackForm(selectedText = '') {
        this.currentFeedback = {
            id: this.generateId(),
            selectedText: selectedText,
            createdAt: new Date().toISOString(),
            status: 'pending',
            type: 'content_error'
        };
        
        const modal = this.createFeedbackModal();
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    },
    
    // 创建反馈表单模态框
    createFeedbackModal() {
        const overlay = document.createElement('div');
        overlay.className = 'feedback-form-modal';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;
        
        modal.innerHTML = `
            <button class="modal-close" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            ">&times;</button>
            
            <h2 style="margin-bottom: 1.5rem; color: #2d3748; font-size: 1.5rem;">内容纠错反馈</h2>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #4a5568;">
                    错误内容 <span style="color: #e53e3e;">*</span>
                </label>
                <div id="selected-text-display" style="
                    background: #fff5f5;
                    border: 1px solid #fed7d7;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 0.5rem;
                    min-height: 60px;
                    color: #c53030;
                    line-height: 1.6;
                ">${this.currentFeedback?.selectedText || '未选择文本，请手动输入错误内容'}</div>
                <textarea id="error-content-input" rows="3" style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 1rem;
                    resize: vertical;
                    font-family: inherit;
                " placeholder="请输入错误的内容或描述错误位置">${this.currentFeedback?.selectedText || ''}</textarea>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #4a5568;">
                    错误类型 <span style="color: #e53e3e;">*</span>
                </label>
                <select id="error-type-select" style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 1rem;
                    background: white;
                ">
                    <option value="content_error">内容错误</option>
                    <option value="typo">错别字</option>
                    <option value="grammar">语法错误</option>
                    <option value="fact_error">事实错误</option>
                    <option value="inappropriate">不当内容</option>
                    <option value="other">其他问题</option>
                </select>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #4a5568;">
                    正确建议
                </label>
                <textarea id="correction-suggestion" rows="3" style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 1rem;
                    resize: vertical;
                    font-family: inherit;
                " placeholder="请输入正确的建议（选填）"></textarea>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #4a5568;">
                    详细说明
                </label>
                <textarea id="feedback-description" rows="4" style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 1rem;
                    resize: vertical;
                    font-family: inherit;
                " placeholder="请详细描述错误情况（选填）"></textarea>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="cancel-feedback" style="
                    padding: 0.75rem 1.5rem;
                    background: #e2e8f0;
                    color: #4a5568;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">取消</button>
                <button id="submit-feedback" style="
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(135deg, #e53e3e 0%, #fc8181 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">提交反馈</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        
        // 事件绑定
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('#cancel-feedback');
        const submitBtn = modal.querySelector('#submit-feedback');
        const errorContentInput = modal.querySelector('#error-content-input');
        
        closeBtn.addEventListener('click', () => this.closeFeedbackForm(overlay));
        cancelBtn.addEventListener('click', () => this.closeFeedbackForm(overlay));
        submitBtn.addEventListener('click', () => {
            const errorContent = errorContentInput.value.trim();
            if (!errorContent) {
                alert('请输入错误内容');
                return;
            }
            this.submitFeedback(errorContent, modal);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeFeedbackForm(overlay);
            }
        });
        
        return overlay;
    },
    
    // 关闭反馈表单
    closeFeedbackForm(overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
        this.currentFeedback = null;
    },
    
    // 提交反馈
    async submitFeedback(errorContent, modal) {
        const errorType = document.querySelector('#error-type-select').value;
        const correctionSuggestion = document.querySelector('#correction-suggestion').value.trim();
        const description = document.querySelector('#feedback-description').value.trim();
        
        const feedback = {
            id: this.generateId(),
            selectedText: errorContent,
            errorType: errorType,
            correctionSuggestion: correctionSuggestion,
            description: description,
            createdAt: new Date().toISOString(),
            status: 'pending',
            type: 'content_error'
        };
        
        this.feedbacks.push(feedback);
        await this.saveFeedbacks();
        
        this.showSuccessMessage('反馈提交成功，感谢您的纠错！');
        this.closeFeedbackForm(modal);
        
        // 如果在线，尝试同步到服务器
        if (window.NetworkManager && window.NetworkManager.isOnline) {
            this.syncFeedback(feedback);
        }
    },
    
    // 同步反馈到服务器
    async syncFeedback(feedback) {
        try {
            const response = await fetch('/api/feedbacks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            });
            
            if (response.ok) {
                feedback.synced = true;
                await this.saveFeedbacks();
            }
        } catch (error) {
            console.log('反馈将在下次联网时同步');
        }
    },
    
    // 获取所有反馈
    getAllFeedbacks() {
        return this.feedbacks;
    },
    
    // 获取反馈详情
    getFeedbackById(id) {
        return this.feedbacks.find(f => f.id === id);
    },
    
    // 更新反馈状态
    async updateFeedbackStatus(id, status) {
        const feedback = this.feedbacks.find(f => f.id === id);
        if (feedback) {
            feedback.status = status;
            feedback.updatedAt = new Date().toISOString();
            await this.saveFeedbacks();
        }
    },
    
    // 删除反馈
    async deleteFeedback(id) {
        this.feedbacks = this.feedbacks.filter(f => f.id !== id);
        await this.saveFeedbacks();
    },
    
    // 生成唯一ID
    generateId() {
        return 'feedback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // 显示成功消息
    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'feedback-toast success';
        toast.innerHTML = `
            <span class="toast-icon">✅</span>
            <span class="toast-message">${message}</span>
        `;
        
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            padding: '1rem 1.5rem',
            background: 'linear-gradient(135deg, #48bb78 0%, #68d391 100%)',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '10002',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'slideIn 0.3s ease'
        });
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    
    // 打开反馈管理面板
    openFeedbackPanel() {
        const panel = this.createFeedbackPanel();
        document.body.appendChild(panel);
        
        setTimeout(() => {
            panel.classList.add('show');
        }, 10);
    },
    
    // 创建反馈管理面板
    createFeedbackPanel() {
        const overlay = document.createElement('div');
        overlay.className = 'feedback-panel-modal';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const panel = document.createElement('div');
        panel.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 900px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;
        
        let feedbackListHTML = '';
        if (this.feedbacks.length === 0) {
            feedbackListHTML = `
                <div style="text-align: center; padding: 3rem; color: #718096;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📋</div>
                    <p style="font-size: 1.1rem;">暂无反馈记录</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">选择文本后点击"纠错"按钮即可提交反馈</p>
                </div>
            `;
        } else {
            feedbackListHTML = this.feedbacks.map(feedback => `
                <div class="feedback-item" style="
                    background: #f7fafc;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    border-left: 4px solid ${this.getStatusColor(feedback.status)};
                ">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                        <div>
                            <span style="display: inline-block; padding: 0.25rem 0.75rem; background: ${this.getErrorTypeColor(feedback.errorType)}; color: white; border-radius: 4px; font-size: 0.85rem; margin-right: 0.5rem;">
                                ${this.getErrorTypeName(feedback.errorType)}
                            </span>
                            <span style="padding: 0.25rem 0.75rem; background: ${this.getStatusColor(feedback.status)}; color: white; border-radius: 4px; font-size: 0.85rem;">
                                ${this.getStatusName(feedback.status)}
                            </span>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="view-feedback-btn" data-id="${feedback.id}" style="
                                padding: 0.5rem 1rem;
                                background: #4299e1;
                                color: white;
                                border: none;
                                border-radius: 4px;
                                cursor: pointer;
                                font-size: 0.85rem;
                            ">查看</button>
                            <button class="delete-feedback-btn" data-id="${feedback.id}" style="
                                padding: 0.5rem 1rem;
                                background: #e53e3e;
                                color: white;
                                border: none;
                                border-radius: 4px;
                                cursor: pointer;
                                font-size: 0.85rem;
                            ">删除</button>
                        </div>
                    </div>
                    <div style="margin-top: 0.5rem; color: #2d3748; line-height: 1.6;">
                        <strong>错误内容：</strong>${this.escapeHtml(feedback.selectedText)}
                    </div>
                    ${feedback.correctionSuggestion ? `
                        <div style="margin-top: 0.5rem; color: #2d3748; line-height: 1.6;">
                            <strong>建议修正：</strong>${this.escapeHtml(feedback.correctionSuggestion)}
                        </div>
                    ` : ''}
                    <div style="margin-top: 0.5rem; font-size: 0.85rem; color: #718096;">
                        提交时间：${new Date(feedback.createdAt).toLocaleString('zh-CN')}
                    </div>
                </div>
            `).join('');
        }
        
        panel.innerHTML = `
            <button class="panel-close" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            ">&times;</button>
            
            <h2 style="margin-bottom: 1.5rem; color: #2d3748; font-size: 1.5rem;">我的纠错反馈</h2>
            
            <div style="margin-bottom: 1rem; padding: 1rem; background: #ebf8ff; border-radius: 8px; border-left: 4px solid #4299e1;">
                <p style="margin: 0; color: #2b6cb0; line-height: 1.6;">
                    <strong>提示：</strong>选择网页中的错误文本，点击"纠错"按钮即可快速提交反馈。您的每一条反馈都将帮助我们改进内容质量。
                </p>
            </div>
            
            <div class="feedback-list" style="margin-top: 1.5rem;">
                ${feedbackListHTML}
            </div>
        `;
        
        overlay.appendChild(panel);
        
        // 事件绑定
        const closeBtn = panel.querySelector('.panel-close');
        closeBtn.addEventListener('click', () => this.closeFeedbackPanel(overlay));
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeFeedbackPanel(overlay);
            }
        });
        
        // 查看和删除按钮
        panel.addEventListener('click', (e) => {
            const viewBtn = e.target.closest('.view-feedback-btn');
            const deleteBtn = e.target.closest('.delete-feedback-btn');
            
            if (viewBtn) {
                const id = viewBtn.getAttribute('data-id');
                this.viewFeedbackDetail(id);
            }
            
            if (deleteBtn) {
                const id = deleteBtn.getAttribute('data-id');
                if (confirm('确定要删除这条反馈吗？')) {
                    this.deleteFeedback(id);
                    this.closeFeedbackPanel(overlay);
                    this.openFeedbackPanel();
                }
            }
        });
        
        return overlay;
    },
    
    // 关闭反馈面板
    closeFeedbackPanel(overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    },
    
    // 查看反馈详情
    viewFeedbackDetail(id) {
        const feedback = this.getFeedbackById(id);
        if (!feedback) return;
        
        alert(`反馈详情\n\n错误内容：${feedback.selectedText}\n错误类型：${this.getErrorTypeName(feedback.errorType)}\n建议修正：${feedback.correctionSuggestion || '无'}\n详细说明：${feedback.description || '无'}\n状态：${this.getStatusName(feedback.status)}\n提交时间：${new Date(feedback.createdAt).toLocaleString('zh-CN')}`);
    },
    
    // 获取错误类型颜色
    getErrorTypeColor(type) {
        const colors = {
            'content_error': '#e53e3e',
            'typo': '#ed8936',
            'grammar': '#38a169',
            'fact_error': '#3182ce',
            'inappropriate': '#805ad5',
            'other': '#718096'
        };
        return colors[type] || '#718096';
    },
    
    // 获取错误类型名称
    getErrorTypeName(type) {
        const names = {
            'content_error': '内容错误',
            'typo': '错别字',
            'grammar': '语法错误',
            'fact_error': '事实错误',
            'inappropriate': '不当内容',
            'other': '其他问题'
        };
        return names[type] || '其他问题';
    },
    
    // 获取状态颜色
    getStatusColor(status) {
        const colors = {
            'pending': '#ed8936',
            'processing': '#4299e1',
            'resolved': '#38a169',
            'rejected': '#e53e3e'
        };
        return colors[status] || '#718096';
    },
    
    // 获取状态名称
    getStatusName(status) {
        const names = {
            'pending': '待处理',
            'processing': '处理中',
            'resolved': '已解决',
            'rejected': '已驳回'
        };
        return names[status] || '未知状态';
    },
    
    // HTML转义
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// 初始化反馈管理
window.addEventListener('DOMContentLoaded', () => {
    FeedbackManager.init();
    
    // 暴露到全局
    window.FeedbackManager = FeedbackManager;
});
