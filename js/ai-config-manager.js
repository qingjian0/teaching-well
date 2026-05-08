/**
 * AI服务配置管理器
 * 提供可选的AI服务集成和智能降级
 */

const AIConfigManager = {
    // 配置存储键
    STORAGE_KEY: 'ai_config',
    
    // 默认配置
    defaultConfig: {
        mode: 'local',           // local | api | hybrid
        apiProvider: 'openai',   // openai | claude | custom
        apiEndpoint: '',
        apiKey: '',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 2000,
        timeout: 30000,
        retryAttempts: 3,
        fallbackEnabled: true,
        cacheEnabled: true,
        cacheExpiry: 3600000
    },
    
    // 当前配置
    config: null,
    
    // 初始化
    init() {
        this.loadConfig();
        console.log('🔧 AI配置管理器初始化完成');
        return this;
    },
    
    // 加载配置
    loadConfig() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                this.config = { ...this.defaultConfig, ...JSON.parse(stored) };
            } else {
                this.config = { ...this.defaultConfig };
            }
        } catch (e) {
            this.config = { ...this.defaultConfig };
        }
        return this.config;
    },
    
    // 保存配置
    saveConfig(config) {
        this.config = { ...this.config, ...config };
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config));
            console.log('✅ 配置已保存');
            return true;
        } catch (e) {
            console.error('配置保存失败:', e);
            return false;
        }
    },
    
    // 获取配置
    getConfig() {
        return { ...this.config };
    },
    
    // 获取当前模式
    getMode() {
        return this.config.mode;
    },
    
    // 是否使用本地模式
    isLocalMode() {
        return this.config.mode === 'local';
    },
    
    // 是否使用API模式
    isAPIMode() {
        return this.config.mode === 'api';
    },
    
    // 是否使用混合模式
    isHybridMode() {
        return this.config.mode === 'hybrid';
    },
    
    // 检查API配置是否完整
    isAPIConfigured() {
        return !!(this.config.apiKey && this.config.apiEndpoint);
    },
    
    // 调用AI服务
    async callAI(prompt, options = {}) {
        // 根据模式选择调用方式
        switch (this.config.mode) {
            case 'local':
                return this.callLocalAI(prompt, options);
            case 'api':
                return this.callAPI(prompt, options);
            case 'hybrid':
                return this.callHybrid(prompt, options);
            default:
                return this.callLocalAI(prompt, options);
        }
    },
    
    // 本地AI调用
    async callLocalAI(prompt, options = {}) {
        console.log('🤖 使用本地AI引擎');
        // 使用本地智能引擎
        if (window.LocalAIEngine) {
            return LocalAIEngine.generateLessonPlan(options);
        }
        throw new Error('本地AI引擎不可用');
    },
    
    // API调用
    async callAPI(prompt, options = {}) {
        if (!this.isAPIConfigured()) {
            console.warn('⚠️ API未配置，回退到本地模式');
            return this.callLocalAI(prompt, options);
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        try {
            const response = await fetch(this.config.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.apiKey}`
                },
                body: JSON.stringify({
                    model: this.config.model,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: options.temperature || this.config.temperature,
                    max_tokens: options.maxTokens || this.config.maxTokens
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`API错误: ${response.status}`);
            }
            
            const data = await response.json();
            return {
                content: data.choices[0].message.content,
                usage: data.usage
            };
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (this.config.fallbackEnabled) {
                console.warn('⚠️ API调用失败，回退到本地模式');
                return this.callLocalAI(prompt, options);
            }
            
            throw error;
        }
    },
    
    // 混合模式
    async callHybrid(prompt, options = {}) {
        // 优先尝试API
        if (this.isAPIConfigured()) {
            try {
                return await this.callAPI(prompt, options);
            } catch (error) {
                console.warn('⚠️ API调用失败，使用本地模式');
                return this.callLocalAI(prompt, options);
            }
        } else {
            return this.callLocalAI(prompt, options);
        }
    },
    
    // 测试API连接
    async testAPIConnection() {
        if (!this.isAPIConfigured()) {
            return { success: false, error: 'API未配置' };
        }
        
        try {
            const result = await this.callAPI('你好', {});
            return { success: true, message: 'API连接成功' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // 重置配置
    resetConfig() {
        this.config = { ...this.defaultConfig };
        localStorage.removeItem(this.STORAGE_KEY);
        console.log('🔄 配置已重置');
    },
    
    // 导出配置
    exportConfig() {
        return JSON.stringify(this.config, null, 2);
    },
    
    // 导入配置
    importConfig(jsonString) {
        try {
            const config = JSON.parse(jsonString);
            this.saveConfig(config);
            return true;
        } catch (e) {
            console.error('配置导入失败:', e);
            return false;
        }
    },
    
    // 创建配置面板
    createConfigPanel() {
        const overlay = document.createElement('div');
        overlay.id = 'ai-config-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10010;
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
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        `;
        
        panel.innerHTML = `
            <button id="config-close" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
            ">×</button>
            
            <h2 style="margin-bottom: 1.5rem; color: #2d3748;">🤖 AI服务配置</h2>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">运行模式</label>
                <select id="ai-mode" style="width: 100%; padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 8px;">
                    <option value="local" ${this.config.mode === 'local' ? 'selected' : ''}>本地智能引擎（推荐）</option>
                    <option value="hybrid" ${this.config.mode === 'hybrid' ? 'selected' : ''}>混合模式（本地优先）</option>
                    <option value="api" ${this.config.mode === 'api' ? 'selected' : ''}>API模式（需要配置）</option>
                </select>
            </div>
            
            <div id="api-config-section" style="display: ${this.config.mode !== 'local' ? 'block' : 'none'};">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">API Endpoint</label>
                    <input type="text" id="api-endpoint" value="${this.config.apiEndpoint}" placeholder="https://api.openai.com/v1/chat/completions" style="width: 100%; padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 8px;">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">API Key</label>
                    <input type="password" id="api-key" value="${this.config.apiKey}" placeholder="sk-..." style="width: 100%; padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 8px;">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">模型</label>
                    <input type="text" id="ai-model" value="${this.config.model}" placeholder="gpt-3.5-turbo" style="width: 100%; padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 8px;">
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" id="fallback-enabled" ${this.config.fallbackEnabled ? 'checked' : ''}>
                    <span>启用智能降级（API失败时自动回退到本地）</span>
                </label>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="config-reset" style="padding: 0.75rem 1.5rem; background: #e2e8f0; color: #4a5568; border: none; border-radius: 8px; cursor: pointer;">重置</button>
                <button id="config-save" style="padding: 0.75rem 1.5rem; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">保存</button>
            </div>
            
            <div style="margin-top: 1rem; padding: 1rem; background: #f7fafc; border-radius: 8px; font-size: 0.875rem; color: #4a5568;">
                <strong>💡 提示：</strong>
                <ul style="margin: 0.5rem 0 0 1rem; padding-left: 0;">
                    <li>本地模式完全离线可用，无需网络</li>
                    <li>API模式需要有效的API密钥</li>
                    <li>混合模式优先使用本地，API失败时自动降级</li>
                </ul>
            </div>
        `;
        
        overlay.appendChild(panel);
        
        // 事件绑定
        panel.querySelector('#config-close').addEventListener('click', () => this.closeConfigPanel(overlay));
        panel.querySelector('#config-save').addEventListener('click', () => this.saveConfigFromPanel(panel));
        panel.querySelector('#config-reset').addEventListener('click', () => {
            if (confirm('确定要重置所有配置吗？')) {
                this.resetConfig();
                this.closeConfigPanel(overlay);
                alert('配置已重置');
            }
        });
        
        // 模式切换
        panel.querySelector('#ai-mode').addEventListener('change', (e) => {
            const apiSection = panel.querySelector('#api-config-section');
            apiSection.style.display = e.target.value !== 'local' ? 'block' : 'none';
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeConfigPanel(overlay);
            }
        });
        
        return overlay;
    },
    
    // 保存配置
    saveConfigFromPanel(panel) {
        const config = {
            mode: panel.querySelector('#ai-mode').value,
            apiEndpoint: panel.querySelector('#api-endpoint').value,
            apiKey: panel.querySelector('#api-key').value,
            model: panel.querySelector('#ai-model').value,
            fallbackEnabled: panel.querySelector('#fallback-enabled').checked
        };
        
        this.saveConfig(config);
        this.closeConfigPanel(panel.parentElement);
        alert('配置已保存！');
    },
    
    // 关闭配置面板
    closeConfigPanel(overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    },
    
    // 打开配置面板
    openConfigPanel() {
        const existing = document.getElementById('ai-config-overlay');
        if (existing) {
            existing.remove();
        }
        
        const panel = this.createConfigPanel();
        document.body.appendChild(panel);
        
        setTimeout(() => {
            panel.style.opacity = '1';
        }, 10);
    }
};

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    AIConfigManager.init();
    window.AIConfigManager = AIConfigManager;
});

console.log('🔧 AI配置管理器已加载');
