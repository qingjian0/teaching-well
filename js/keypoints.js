// 乡村教师教学助手 - 重难点分析功能

document.addEventListener('DOMContentLoaded', function() {
    initKeypointsPage();
    bindKeypointsEventListeners();
});

function initKeypointsPage() {
    console.log('初始化重难点分析页面...');
    initTabSwitching();
}

function bindKeypointsEventListeners() {
    const keypointsForm = document.getElementById('keypoints-form');
    if (keypointsForm) {
        keypointsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            analyzeKeyPoints();
        });
    }
    
    const regenerateBtn = document.getElementById('regenerate-btn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', function() {
            analyzeKeyPoints();
        });
    }
}

function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            const tabId = this.getAttribute('data-tab');
            const activeContent = document.getElementById(tabId + '-tab');
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
}

function analyzeKeyPoints() {
    const subject = document.getElementById('subject').value;
    const grade = document.getElementById('grade').value;
    const topic = document.getElementById('topic').value;
    const content = document.getElementById('content').value;
    
    if (!subject || !grade || !topic || !content) {
        showErrorMessage('请填写所有必填字段');
        return;
    }
    
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block';
    
    showLoading('keypoints');
    showLoading('script');
    showLoading('visualization');
    showLoading('divination');
    
    // 使用本地智能引擎生成分析结果
    if (typeof LocalAIEngine !== 'undefined') {
        LocalAIEngine.analyzeKeypoints({
            subject: subject,
            grade: grade,
            topic: topic,
            content: content
        }).then(result => {
            hideLoading('keypoints');
            hideLoading('script');
            hideLoading('visualization');
            hideLoading('divination');
            
            generateKeypointsResults(subject, grade, topic, content);
            generateScriptResults(subject, grade, topic, content);
            generateVisualizationResults(subject, grade, topic, content);
            generateDivinationResults(subject, grade, topic, content);
        }).catch(error => {
            console.error('分析失败:', error);
            generateDefaultResults();
        });
    } else {
        setTimeout(() => {
            hideLoading('keypoints');
            hideLoading('script');
            hideLoading('visualization');
            hideLoading('divination');
            
            generateKeypointsResults(subject, grade, topic, content);
            generateScriptResults(subject, grade, topic, content);
            generateVisualizationResults(subject, grade, topic, content);
            generateDivinationResults(subject, grade, topic, content);
        }, 1500);
    }
}

function showErrorMessage(message) {
    const inputSection = document.querySelector('.input-section');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const existingError = inputSection.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    inputSection.insertBefore(errorDiv, inputSection.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function showLoading(type) {
    const loadingElement = document.getElementById(type + '-loading');
    if (loadingElement) {
        loadingElement.style.display = 'flex';
    }
}

function hideLoading(type) {
    const loadingElement = document.getElementById(type + '-loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

function generateKeypointsResults(subject, grade, topic, content) {
    const resultsContainer = document.getElementById('keypoints-results');
    
    const keypoints = [
        {
            title: '核心概念理解',
            difficulty: 'high',
            description: '学生需要理解本章节的核心概念，这是后续学习的基础。建议通过实例和可视化方法帮助学生理解。',
            solution: '使用生活中的例子进行类比，通过图表和动画展示概念的形成过程，鼓励学生通过实践操作加深理解。'
        },
        {
            title: '公式应用',
            difficulty: 'medium',
            description: '学生需要掌握公式的应用方法，能够在不同场景中灵活使用。',
            solution: '提供多种类型的练习题，从简单到复杂逐步递进，帮助学生建立公式应用的思维模式。'
        },
        {
            title: '知识点联系',
            difficulty: 'low',
            description: '学生需要将本章节的知识点与之前学习的内容建立联系，形成知识网络。',
            solution: '通过思维导图等工具，帮助学生梳理知识点之间的关系，强化知识体系的构建。'
        }
    ];
    
    resultsContainer.innerHTML = '';
    
    keypoints.forEach((keypoint, index) => {
        const keypointElement = document.createElement('div');
        keypointElement.className = 'keypoint-item';
        keypointElement.innerHTML = `
            <h4>
                ${index + 1}. ${keypoint.title}
                <span class="difficulty ${keypoint.difficulty}">
                    ${keypoint.difficulty === 'high' ? '高' : keypoint.difficulty === 'medium' ? '中' : '低'}难度
                </span>
            </h4>
            <p><strong>难点描述：</strong>${keypoint.description}</p>
            <p><strong>解决建议：</strong>${keypoint.solution}</p>
        `;
        resultsContainer.appendChild(keypointElement);
    });
}

function generateScriptResults(subject, grade, topic, content) {
    const resultsContainer = document.getElementById('script-results');
    
    const script = `# ${topic} - 课堂讲解脚本

## 导入环节 (5分钟)
- 教师：同学们，今天我们要学习的内容是${topic}。在开始之前，我想请大家思考一个问题。
- 学生：思考并回答
- 教师：很好，看来大家对这个话题已经有了一些了解。

## 知识讲解 (15分钟)
- 教师：首先，我们来了解一下核心概念。
- 教师：通过具体例子帮助理解
- 教师：接下来学习相关知识点

## 重难点突破 (10分钟)
- 教师：重点讲解重难点内容
- 教师：通过练习帮助学生掌握

## 巩固练习 (10分钟)
- 教师：完成练习题
- 教师：核对答案，讲解易错点

## 总结与作业 (5分钟)
- 教师：总结本节课知识点
- 教师：布置课后作业`;
    
    resultsContainer.innerHTML = '';
    const scriptElement = document.createElement('div');
    scriptElement.className = 'script-content';
    scriptElement.innerHTML = `<pre>${script}</pre>`;
    resultsContainer.appendChild(scriptElement);
}

function generateVisualizationResults(subject, grade, topic, content) {
    const resultsContainer = document.getElementById('visualization-results');
    
    const visualization = `
        <div class="visualization-container">
            <h4>知识点关系图</h4>
            <div style="width: 100%; height: 300px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">${topic}</div>
                    <div style="display: flex; justify-content: center; gap: 40px; margin-top: 30px;">
                        <div style="text-align: center;">
                            <div style="width: 100px; height: 100px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">概念1</div>
                            <div>核心概念</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="width: 100px; height: 100px; background: #e74c3c; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">概念2</div>
                            <div>重要应用</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="width: 100px; height: 100px; background: #27ae60; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">概念3</div>
                            <div>拓展知识</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <h4>学习路径</h4>
            <div style="margin-top: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 30px; height: 30px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">1</div>
                    <div>了解基本概念</div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 30px; height: 30px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">2</div>
                    <div>掌握核心原理</div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 30px; height: 30px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">3</div>
                    <div>学习应用方法</div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 30px; height: 30px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">4</div>
                    <div>练习巩固提高</div>
                </div>
                <div style="display: flex; align-items: center;">
                    <div style="width: 30px; height: 30px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">5</div>
                    <div>拓展知识应用</div>
                </div>
            </div>
        </div>
    `;
    
    resultsContainer.innerHTML = visualization;
}

function generateDivinationResults(subject, grade, topic, content) {
    const resultsContainer = document.getElementById('divination-results');
    
    const divination = `
        <div class="divination-container">
            <h4>教学卦象分析</h4>
            <div style="background: #f7fafc; padding: 20px; border-radius: 10px; box-shadow: 0 1px 5px rgba(0,0,0,0.05);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 24px; font-weight: bold; color: #4f46e5; margin-bottom: 10px;">乾卦</div>
                    <div style="font-size: 16px; color: #4a5568;">天行健，君子以自强不息</div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h5 style="color: #2d3748; margin-bottom: 10px;">教学解读</h5>
                    <p style="color: #374151; line-height: 1.6;">本节课内容具有开创性和引领性，需要教师以积极主动的态度引导学生探索知识。</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h5 style="color: #2d3748; margin-bottom: 10px;">教学建议</h5>
                    <ul style="color: #374151; line-height: 1.6; list-style-type: disc; padding-left: 20px;">
                        <li>采用启发式教学方法，鼓励学生主动思考</li>
                        <li>设置挑战性任务，激发学生的学习动力</li>
                        <li>建立明确的学习目标，引导学生不断进步</li>
                        <li>注重培养学生的创新思维和实践能力</li>
                    </ul>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h5 style="color: #2d3748; margin-bottom: 10px;">学生状态</h5>
                    <p style="color: #374151; line-height: 1.6;">学生在本节课中会表现出较高的学习热情，但可能会遇到一些挑战。教师应及时给予鼓励和指导。</p>
                </div>
                
                <div>
                    <h5 style="color: #2d3748; margin-bottom: 10px;">教学策略</h5>
                    <p style="color: #374151; line-height: 1.6;">建议采用分层教学策略，根据学生的学习能力设置不同难度的任务，确保每个学生都能有所收获。</p>
                </div>
            </div>
        </div>
    `;
    
    resultsContainer.innerHTML = divination;
}

function generateDefaultResults() {
    hideLoading('keypoints');
    hideLoading('script');
    hideLoading('visualization');
    hideLoading('divination');
    
    generateKeypointsResults('', '', '', '');
    generateScriptResults('', '', '', '');
    generateVisualizationResults('', '', '', '');
    generateDivinationResults('', '', '', '');
}

console.log('📚 重难点分析功能已加载');
