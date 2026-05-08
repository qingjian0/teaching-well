/**
 * 专家审核管理模块
 * FR-8: 专家审核标记功能
 * 为优质教案添加"王明认证"标记，提升可信度和权威性
 */

const ReviewManager = {
    reviewData: {
        approvedTemplates: [],
        approvedSharedPlans: [],
        reviewers: []
    },

    STORAGE_KEY: 'reviewData',
    REVIEWER_STORAGE_KEY: 'reviewers',

    init() {
        this.loadReviewData();
        this.loadReviewers();
        this.initializeSampleData();
    },

    loadReviewData() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            this.reviewData = JSON.parse(stored);
        }
    },

    saveReviewData() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.reviewData));
    },

    loadReviewers() {
        const stored = localStorage.getItem(this.REVIEWER_STORAGE_KEY);
        if (stored) {
            this.reviewData.reviewers = JSON.parse(stored);
        }
    },

    saveReviewers() {
        localStorage.setItem(this.REVIEWER_STORAGE_KEY, JSON.stringify(this.reviewData.reviewers));
    },

    initializeSampleData() {
        if (this.reviewData.approvedTemplates.length === 0) {
            this.reviewData.approvedTemplates = [1, 5, 11, 13, 21, 24];
            this.saveReviewData();
        }
        if (this.reviewData.approvedSharedPlans.length === 0) {
            this.reviewData.approvedSharedPlans = ['shared_1', 'shared_3'];
            this.saveReviewData();
        }
    },

    isTemplateApproved(templateId) {
        return this.reviewData.approvedTemplates.includes(templateId);
    },

    isSharedPlanApproved(planId) {
        return this.reviewData.approvedSharedPlans.includes(planId);
    },

    approveTemplate(templateId, reviewerId) {
        if (!this.reviewData.approvedTemplates.includes(templateId)) {
            this.reviewData.approvedTemplates.push(templateId);
            this.saveReviewData();
            return true;
        }
        return false;
    },

    revokeTemplateApproval(templateId) {
        const index = this.reviewData.approvedTemplates.indexOf(templateId);
        if (index > -1) {
            this.reviewData.approvedTemplates.splice(index, 1);
            this.saveReviewData();
            return true;
        }
        return false;
    },

    approveSharedPlan(planId, reviewerId) {
        if (!this.reviewData.approvedSharedPlans.includes(planId)) {
            this.reviewData.approvedSharedPlans.push(planId);
            this.saveReviewData();
            return true;
        }
        return false;
    },

    revokeSharedPlanApproval(planId) {
        const index = this.reviewData.approvedSharedPlans.indexOf(planId);
        if (index > -1) {
            this.reviewData.approvedSharedPlans.splice(index, 1);
            this.saveReviewData();
            return true;
        }
        return false;
    },

    getReviewerById(id) {
        return this.reviewData.reviewers.find(r => r.id === id);
    },

    getAllReviewers() {
        return this.reviewData.reviewers;
    },

    addReviewer(reviewer) {
        const newReviewer = {
            id: 'reviewer_' + Date.now(),
            name: reviewer.name,
            title: reviewer.title || '审核志愿者',
            specialty: reviewer.specialty || '',
            school: reviewer.school || '',
            joinDate: new Date().toISOString(),
            approvedCount: 0,
            isActive: true
        };
        this.reviewData.reviewers.push(newReviewer);
        this.saveReviewers();
        return newReviewer;
    },

    updateReviewer(id, updates) {
        const reviewer = this.getReviewerById(id);
        if (reviewer) {
            Object.assign(reviewer, updates);
            this.saveReviewers();
            return reviewer;
        }
        return null;
    },

    removeReviewer(id) {
        const index = this.reviewData.reviewers.findIndex(r => r.id === id);
        if (index > -1) {
            this.reviewData.reviewers.splice(index, 1);
            this.saveReviewers();
            return true;
        }
        return false;
    },

    incrementReviewerApprovedCount(reviewerId) {
        const reviewer = this.getReviewerById(reviewerId);
        if (reviewer) {
            reviewer.approvedCount++;
            this.saveReviewers();
        }
    },

    getReviewStats() {
        return {
            totalApprovedTemplates: this.reviewData.approvedTemplates.length,
            totalApprovedSharedPlans: this.reviewData.approvedSharedPlans.length,
            totalReviewers: this.reviewData.reviewers.length,
            activeReviewers: this.reviewData.reviewers.filter(r => r.isActive).length
        };
    },

    createReviewBadge() {
        return `
            <span class="wangming-badge" title="王明认证 - 经专家审核通过">
                <span class="wangming-badge-icon">✓</span>
                <span class="wangming-badge-text">王明认证</span>
            </span>
        `;
    },

    createReviewBadgeSmall() {
        return `
            <span class="wangming-badge-small" title="王明认证">
                <span class="wangming-badge-icon">✓</span>
                王明认证
            </span>
        `;
    },

    createReviewModal(targetType, targetId, callback) {
        const modal = document.createElement('div');
        modal.className = 'review-modal-overlay';
        modal.innerHTML = `
            <div class="review-modal">
                <button class="review-modal-close" onclick="this.closest('.review-modal-overlay').remove()">&times;</button>
                <h3>${targetType === 'template' ? '模板审核' : '教案审核'}</h3>
                
                <div class="review-standards">
                    <h4>审核标准</h4>
                    <ul>
                        <li>✅ 教学目标明确，符合课程标准要求</li>
                        <li>✅ 教学内容准确，无科学性错误</li>
                        <li>✅ 教学方法适切，适合乡村教学实际</li>
                        <li>✅ 教学过程完整，环节清晰合理</li>
                        <li>✅ 适合乡村学校和学生特点</li>
                    </ul>
                </div>
                
                <div class="review-rating-section">
                    <h4>综合评价</h4>
                    <div class="review-rating-options">
                        <label><input type="radio" name="reviewRating" value="excellent" checked> 优秀 (90-100分)</label>
                        <label><input type="radio" name="reviewRating" value="good"> 良好 (75-89分)</label>
                        <label><input type="radio" name="reviewRating" value="qualified"> 合格 (60-74分)</label>
                        <label><input type="radio" name="reviewRating" value="unqualified"> 不合格 (<60分)</label>
                    </div>
                </div>
                
                <div class="review-comment-section">
                    <h4>审核意见</h4>
                    <textarea id="review-comment" placeholder="请输入审核意见（可选）..."></textarea>
                </div>
                
                <div class="review-modal-actions">
                    <button class="btn-approve" onclick="ReviewManager.approveAndClose('${targetType}', '${targetId}', this)">
                        ✓ 通过审核
                    </button>
                    <button class="btn-reject" onclick="this.closest('.review-modal-overlay').remove()">
                        ✗ 取消
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    approveAndClose(targetType, targetId, btn) {
        const rating = document.querySelector('input[name="reviewRating"]:checked').value;
        const comment = document.getElementById('review-comment').value;
        
        if (targetType === 'template') {
            this.approveTemplate(parseInt(targetId), 'default_reviewer');
        } else {
            this.approveSharedPlan(targetId, 'default_reviewer');
        }
        
        const modal = btn.closest('.review-modal-overlay');
        modal.remove();
        
        if (typeof showToast === 'function') {
            showToast('审核通过，已添加"王明认证"标记！');
        }
        
        if (typeof onReviewComplete === 'function') {
            onReviewComplete(targetType, targetId);
        }
    }
};

window.ReviewManager = ReviewManager;

window.addEventListener('DOMContentLoaded', () => {
    ReviewManager.init();
});
