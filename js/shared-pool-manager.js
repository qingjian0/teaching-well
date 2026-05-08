/**
 * 教研群共享池管理模块
 * FR-7: 教研群共享池功能
 */

// 共享池管理
const SharedPoolManager = {
    sharedPlans: [],
    currentUser: null,
    
    // 初始化
    async init() {
        await this.loadSharedPlans();
        this.loadCurrentUser();
    },
    
    // 加载当前用户信息
    loadCurrentUser() {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            this.currentUser = JSON.parse(stored);
        } else {
            // 创建默认用户
            this.currentUser = {
                id: 'user_' + Date.now(),
                name: '匿名教师',
                school: '未设置学校',
                region: '未知地区',
                avatar: '👤'
            };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
    },
    
    // 保存当前用户信息
    saveCurrentUser(userData) {
        this.currentUser = { ...this.currentUser, ...userData };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    },
    
    // 从本地存储加载共享教案
    async loadSharedPlans() {
        const stored = localStorage.getItem('sharedPlans');
        this.sharedPlans = stored ? JSON.parse(stored) : this.getDefaultSharedPlans();
        
        // 如果是空数组，添加一些示例数据
        if (this.sharedPlans.length === 0) {
            this.sharedPlans = this.getDefaultSharedPlans();
            await this.saveSharedPlans();
        }
        
        return this.sharedPlans;
    },
    
    // 获取默认共享教案
    getDefaultSharedPlans() {
        return [
            {
                id: 'shared_1',
                title: '三年级数学 - 分数的初步认识',
                author: '张老师',
                school: '青山村小',
                region: '西部山区',
                subject: 'math',
                grade: '3',
                content: `
# 分数的初步认识 - 教案

## 教学目标
- 知识目标：理解分数的意义，认识几分之一
- 能力目标：能正确读写分数
- 情感目标：体验数学与生活的联系

## 教学重难点
- 重点：理解分数的含义
- 难点：几分之一的含义

## 教学过程
### 一、导入（5分钟）
通过分月饼的实际例子引入分数概念

### 二、新授（20分钟）
1. 认识二分之一
2. 动手操作：用纸片折出各种分数
3. 读写分数

### 三、练习（10分钟）
完成课本练习题

### 四、总结（5分钟）
回顾本节所学内容
                `.trim(),
                tags: ['分数', '数学', '动手操作'],
                downloadCount: 45,
                viewCount: 128,
                rating: 4.8,
                createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
                synced: true
            },
            {
                id: 'shared_2',
                title: '二年级语文 - 识字教学：田家四季歌',
                author: '李老师',
                school: '河畔小学',
                region: '中部地区',
                subject: 'chinese',
                grade: '2',
                content: `
# 识字教学：田家四季歌 - 教案

## 教学目标
- 认识课文中的生字词
- 理解田家四季的特点
- 培养观察自然的习惯

## 教学重难点
- 重点：12个生字的认读
- 难点：四季农活的理解

## 教学方法
- 游戏识字法
- 图文结合法
- 朗读感悟法

## 教学过程
### 一、游戏导入（5分钟）
农具图片配对游戏

### 二、识字环节（15分钟）
1. 带拼音认读
2. 去拼音认读
3. 组词练习

### 三、朗读感悟（10分钟）
有感情地朗读课文

### 四、拓展活动（5分钟）
绘画：画一画你眼中的四季
                `.trim(),
                tags: ['识字', '语文', '乡村生活'],
                downloadCount: 32,
                viewCount: 96,
                rating: 4.6,
                createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
                synced: true
            },
            {
                id: 'shared_3',
                title: '四年级科学 - 植物的生长',
                author: '王老师',
                school: '阳光完小',
                region: '南方山区',
                subject: 'science',
                grade: '4',
                content: `
# 植物的生长 - 教案

## 教学目标
- 了解植物生长的基本条件
- 掌握种子萌发的过程
- 培养观察记录能力

## 教学重难点
- 重点：植物生长的条件
- 难点：生长过程的观察记录

## 教学准备
- 黄豆种子、培养皿
- 观察记录表
- 浇水壶

## 教学过程
### 一、导入（5分钟）
回顾种子的结构

### 二、新授（20分钟）
1. 种子萌发的条件（阳光、水分、空气）
2. 萌发过程讲解
3. 观察记录方法指导

### 三、实践操作（15分钟）
学生动手种植黄豆

### 四、课后延伸
持续观察并记录生长情况
                `.trim(),
                tags: ['科学', '植物', '实践活动'],
                downloadCount: 28,
                viewCount: 84,
                rating: 4.9,
                createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
                synced: true
            }
        ];
    },
    
    // 保存共享教案到本地存储
    async saveSharedPlans() {
        localStorage.setItem('sharedPlans', JSON.stringify(this.sharedPlans));
    },
    
    // 分享教案
    async sharePlan(planData) {
        const sharedPlan = {
            id: 'shared_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            title: planData.title,
            author: this.currentUser.name,
            school: this.currentUser.school,
            region: this.currentUser.region,
            subject: planData.subject || 'other',
            grade: planData.grade || 'unknown',
            content: planData.content,
            tags: planData.tags || [],
            downloadCount: 0,
            viewCount: 0,
            rating: 0,
            createdAt: new Date().toISOString(),
            synced: false
        };
        
        this.sharedPlans.unshift(sharedPlan);
        await this.saveSharedPlans();
        
        // 如果在线，尝试同步到服务器
        if (window.NetworkManager && window.NetworkManager.isOnline) {
            this.syncPlan(sharedPlan);
        }
        
        return sharedPlan;
    },
    
    // 同步教案到服务器
    async syncPlan(plan) {
        try {
            const response = await fetch('/api/shared-plans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(plan)
            });
            
            if (response.ok) {
                plan.synced = true;
                await this.saveSharedPlans();
            }
        } catch (error) {
            console.log('教案将在下次联网时同步');
        }
    },
    
    // 获取所有共享教案
    getAllPlans() {
        return this.sharedPlans;
    },
    
    // 根据ID获取教案
    getPlanById(id) {
        return this.sharedPlans.find(p => p.id === id);
    },
    
    // 搜索共享教案
    searchPlans(query, filters = {}) {
        let results = this.sharedPlans;
        
        // 关键词搜索
        if (query) {
            const lowerQuery = query.toLowerCase();
            results = results.filter(plan => 
                plan.title.toLowerCase().includes(lowerQuery) ||
                plan.author.toLowerCase().includes(lowerQuery) ||
                plan.school.toLowerCase().includes(lowerQuery) ||
                plan.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
        }
        
        // 筛选条件
        if (filters.subject) {
            results = results.filter(plan => plan.subject === filters.subject);
        }
        
        if (filters.grade) {
            results = results.filter(plan => plan.grade === filters.grade);
        }
        
        if (filters.region) {
            results = results.filter(plan => plan.region === filters.region);
        }
        
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'rating':
                    results.sort((a, b) => b.rating - a.rating);
                    break;
                case 'downloads':
                    results.sort((a, b) => b.downloadCount - a.downloadCount);
                    break;
                case 'recent':
                    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
            }
        }
        
        return results;
    },
    
    // 查看教案
    viewPlan(id) {
        const plan = this.sharedPlans.find(p => p.id === id);
        if (plan) {
            plan.viewCount++;
            this.saveSharedPlans();
        }
        return plan;
    },
    
    // 下载/收藏教案
    async downloadPlan(id) {
        const plan = this.sharedPlans.find(p => p.id === id);
        if (plan) {
            plan.downloadCount++;
            await this.saveSharedPlans();
            
            // 保存到本地教案库
            if (window.OfflineStorage) {
                const lessonPlan = {
                    id: 'local_' + Date.now(),
                    title: plan.title,
                    content: plan.content,
                    source: 'shared-pool',
                    sourceId: plan.id,
                    author: plan.author,
                    createdAt: new Date().toISOString(),
                    synced: false
                };
                await window.OfflineStorage.saveLessonPlan(lessonPlan);
            }
            
            return true;
        }
        return false;
    },
    
    // 评价教案
    async ratePlan(id, rating) {
        const plan = this.sharedPlans.find(p => p.id === id);
        if (plan) {
            // 计算新的平均评分
            const totalRating = plan.rating * plan.rating + rating;
            plan.rating = Math.round((totalRating / (plan.rating + 1)) * 10) / 10;
            await this.saveSharedPlans();
            return true;
        }
        return false;
    },
    
    // 删除自己分享的教案
    async deleteMyPlan(id) {
        const planIndex = this.sharedPlans.findIndex(p => p.id === id);
        if (planIndex !== -1 && this.sharedPlans[planIndex].author === this.currentUser.name) {
            this.sharedPlans.splice(planIndex, 1);
            await this.saveSharedPlans();
            return true;
        }
        return false;
    },
    
    // 获取我分享的教案
    getMySharedPlans() {
        return this.sharedPlans.filter(plan => plan.author === this.currentUser.name);
    },
    
    // 获取优质教案（评分>=4.5）
    getHighQualityPlans() {
        return this.sharedPlans.filter(plan => plan.rating >= 4.5);
    },
    
    // 获取热门教案（下载量前10）
    getPopularPlans() {
        return [...this.sharedPlans].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, 10);
    },
    
    // 导出教案为文本
    exportPlanAsText(plan) {
        let text = `${plan.title}\n`;
        text += `${'='.repeat(40)}\n\n`;
        text += `作者：${plan.author}\n`;
        text += `学校：${plan.school}\n`;
        text += `地区：${plan.region}\n`;
        text += `学科：${this.getSubjectName(plan.subject)}\n`;
        text += `年级：${this.getGradeName(plan.grade)}\n`;
        text += `标签：${plan.tags.join(', ')}\n`;
        text += `评分：${plan.rating} ⭐\n`;
        text += `下载：${plan.downloadCount} 次\n`;
        text += `浏览：${plan.viewCount} 次\n`;
        text += `时间：${new Date(plan.createdAt).toLocaleDateString('zh-CN')}\n\n`;
        text += `${'='.repeat(40)}\n\n`;
        text += plan.content;
        
        return text;
    },
    
    // 获取学科名称
    getSubjectName(subject) {
        const subjects = {
            'chinese': '语文',
            'math': '数学',
            'english': '英语',
            'science': '科学',
            'other': '其他'
        };
        return subjects[subject] || '其他';
    },
    
    // 获取年级名称
    getGradeName(grade) {
        const grades = {
            '1': '一年级',
            '2': '二年级',
            '3': '三年级',
            '4': '四年级',
            '5': '五年级',
            '6': '六年级'
        };
        return grades[grade] || grade;
    }
};

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    SharedPoolManager.init();
    
    // 暴露到全局
    window.SharedPoolManager = SharedPoolManager;
});
