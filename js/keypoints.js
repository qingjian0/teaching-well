// 乡村教师教学助手 - 重难点分析功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    initKeypointsPage();
    
    // 绑定事件处理
    bindKeypointsEventListeners();
});

// 初始化重难点分析页面功能
function initKeypointsPage() {
    console.log('初始化重难点分析页面...');
    
    // 初始化标签切换功能
    initTabSwitching();
}

// 绑定重难点分析页面事件监听器
function bindKeypointsEventListeners() {
    // 表单提交事件
    const keypointsForm = document.getElementById('keypoints-form');
    if (keypointsForm) {
        keypointsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            analyzeKeyPoints();
        });
    }
    
    // 重新生成按钮点击事件
    const regenerateBtn = document.getElementById('regenerate-btn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', function() {
            analyzeKeyPoints();
        });
    }
}

// 初始化标签切换功能
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有标签按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');
            
            // 隐藏所有标签内容
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 显示当前标签对应的内容
            const tabId = this.getAttribute('data-tab');
            const activeContent = document.getElementById(tabId + '-tab');
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
}

// 分析重难点
function analyzeKeyPoints() {
    // 获取表单数据
    const subject = document.getElementById('subject').value;
    const grade = document.getElementById('grade').value;
    const topic = document.getElementById('topic').value;
    const content = document.getElementById('content').value;
    
    // 验证表单数据
    if (!subject || !grade || !topic || !content) {
        showErrorMessage('请填写所有必填字段');
        return;
    }
    
    // 显示结果区域
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block';
    
    // 显示加载状态
    showLoading('keypoints');
    showLoading('script');
    showLoading('visualization');
    showLoading('divination');
    
    // 模拟API调用，实际项目中应集成TRAE SOLO SDK
    setTimeout(() => {
        // 隐藏加载状态
        hideLoading('keypoints');
        hideLoading('script');
        hideLoading('visualization');
        hideLoading('divination');
        
        // 生成并显示分析结果
        generateKeypointsResults(subject, grade, topic, content);
        generateScriptResults(subject, grade, topic, content);
        generateVisualizationResults(subject, grade, topic, content);
        generateDivinationResults(subject, grade, topic, content);
    }, 1500);
}

// 显示错误消息
function showErrorMessage(message) {
    const inputSection = document.querySelector('.input-section');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // 移除已有的错误消息
    const existingError = inputSection.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // 添加新的错误消息
    inputSection.insertBefore(errorDiv, inputSection.firstChild);
    
    // 3秒后自动移除错误消息
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// 显示加载状态
function showLoading(type) {
    const loadingElement = document.getElementById(type + '-loading');
    if (loadingElement) {
        loadingElement.style.display = 'flex';
    }
}

// 隐藏加载状态
function hideLoading(type) {
    const loadingElement = document.getElementById(type + '-loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// 生成重难点分析结果
function generateKeypointsResults(subject, grade, topic, content) {
    const resultsContainer = document.getElementById('keypoints-results');
    
    // 模拟生成的重难点数据
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
    
    // 清空容器
    resultsContainer.innerHTML = '';
    
    // 生成重难点项目
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

// 生成讲解脚本结果
function generateScriptResults(subject, grade, topic, content) {
    const resultsContainer = document.getElementById('script-results');
    
    // 模拟生成的讲解脚本
    const script = `# ${topic} - 课堂讲解脚本

## 导入环节 (5分钟)
- 教师：同学们，今天我们要学习的内容是${topic}。在开始之前，我想请大家思考一个问题：[相关问题]。
- 学生：[预期回答]
- 教师：很好，看来大家对这个话题已经有了一些了解。今天我们将深入学习这个内容，掌握其中的重难点。

## 知识讲解 (15分钟)
- 教师：首先，我们来了解一下[核心概念]。[详细讲解核心概念]
- 教师：现在，我们来看一个例子：[具体例子]。通过这个例子，我们可以看到[概念应用]。
- 教师：接下来，我们学习[第二个知识点]。[详细讲解]

## 重难点突破 (10分钟)
- 教师：在学习过程中，我们需要特别注意以下几个重难点：
1. [重难点1]：[详细讲解和解决方法]
2. [重难点2]：[详细讲解和解决方法]
- 教师：为了帮助大家更好地理解，我们来做一个小练习：[练习题]

## 巩固练习 (10分钟)
- 教师：现在，让我们通过一些练习题来巩固今天所学的知识。
- 学生：[完成练习]
- 教师：大家做得很好！我们来核对一下答案：[讲解答案]

## 总结与作业 (5分钟)
- 教师：今天我们学习了[总结知识点]。重点掌握了[重点内容]，理解了[难点内容]。
- 教师：课后作业：[布置作业]
- 教师：同学们，今天的课就到这里，有问题的同学可以随时来问我。`;
    
    // 清空容器
    resultsContainer.innerHTML = '';
    
    // 生成讲解脚本内容
    const scriptElement = document.createElement('div');
    scriptElement.className = 'script-content';
    scriptElement.innerHTML = `<pre>${script}</pre>`;
    resultsContainer.appendChild(scriptElement);
}

// 生成知识点可视化结果
function generateVisualizationResults(subject, grade, topic, content) {
    const resultsContainer = document.getElementById('visualization-results');
    
    // 模拟生成的可视化内容
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
    
    // 清空容器
    resultsContainer.innerHTML = '';
    
    // 生成可视化内容
    resultsContainer.innerHTML = visualization;
}

// 生成卦象分析结果
function generateDivinationResults(subject, grade, topic, content) {
    const resultsContainer = document.getElementById('divination-results');
    
    // 模拟生成的卦象分析数据
    const divination = `
        <div class="divination-container">
            <h4>卦象分析</h4>
            <div style="background: #f7fafc; padding: 20px; border-radius: 10px; box-shadow: 0 1px 5px rgba(0,0,0,0.05);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 24px; font-weight: bold; color: #4f46e5; margin-bottom: 10px;">乾卦</div>
                    <div style="font-size: 16px; color: #4a5568;">天行健，君子以自强不息</div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h5 style="color: #2d3748; margin-bottom: 10px;">卦象解读</h5>
                    <p style="color: #374151; line-height: 1.6;">乾卦象征天，代表刚健、进取、向上。在教学中，这意味着本节课内容具有开创性和引领性，需要教师以积极主动的态度引导学生探索知识，培养学生的进取心和自主学习能力。</p>
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
                    <p style="color: #374151; line-height: 1.6;">根据卦象分析，学生在本节课中会表现出较高的学习热情和参与度，但可能会遇到一些挑战。教师应及时给予鼓励和指导，帮助学生克服困难，保持学习动力。</p>
                </div>
                
                <div>
                    <h5 style="color: #2d3748; margin-bottom: 10px;">教学策略</h5>
                    <p style="color: #374151; line-height: 1.6;">建议教师采用分层教学策略，根据学生的学习能力和水平，设置不同难度的任务，确保每个学生都能在自己的水平上有所收获。同时，注重培养学生的合作学习能力，通过小组讨论和合作完成任务，增强学生的团队意识和协作能力。</p>
                </div>
            </div>
        </div>
    `;
    
    // 清空容器
    resultsContainer.innerHTML = '';
    
    // 生成卦象分析内容
    resultsContainer.innerHTML = divination;
}

// 集成TRAE SOLO SDK进行内容分析
function analyzeWithTraeSolo(content, subject, grade) {
    console.log('使用TRAE SOLO分析内容...');
    
    // 集成TRAE SOLO SDK的实际调用代码
    if (typeof TRAE !== 'undefined') {
        return TRAE.generate({
            prompt: `分析以下教学内容的重难点，生成详细的解析、课堂讲解脚本、知识点可视化建议和卦象分析：\n\n学科：${subject}\n年级：${grade}\n内容：${content}\n\n请返回以下格式的JSON数据：\n{\n  "keypoints": [\n    {\n      "title": "重难点标题",\n      "difficulty": "high|medium|low",\n      "description": "难点描述",\n      "solution": "解决建议"\n    }\n  ],\n  "script": "课堂讲解脚本内容",\n  "visualization": "知识点可视化建议",\n  "divination": "卦象分析内容"
}`,

            model: 'trae-solo',
            max_tokens: 3000,
            temperature: 0.7
        })
        .then(response => {
            console.log('TRAE SOLO分析结果：', response);
            try {
                return JSON.parse(response.content);
            } catch (e) {
                console.error('解析TRAE SOLO返回结果失败：', e);
                return generateDefaultAnalysis(content, subject, grade);
            }
        })
        .catch(error => {
            console.error('TRAE SOLO分析失败：', error);
            return generateDefaultAnalysis(content, subject, grade);
        });
    } else {
        console.error('TRAE SOLO SDK未加载');
        return Promise.resolve(generateDefaultAnalysis(content, subject, grade));
    }
}

// 生成默认分析结果
function generateDefaultAnalysis(content, subject, grade) {
    return {
        keypoints: [
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
        ],
        script: `# ${content.substring(0, 50)}... - 课堂讲解脚本\n\n## 导入环节 (5分钟)\n- 教师：同学们，今天我们要学习的内容是${content.substring(0, 50)}...。在开始之前，我想请大家思考一个问题：[相关问题]。\n- 学生：[预期回答]\n- 教师：很好，看来大家对这个话题已经有了一些了解。今天我们将深入学习这个内容，掌握其中的重难点。\n\n## 知识讲解 (15分钟)\n- 教师：首先，我们来了解一下[核心概念]。[详细讲解核心概念]\n- 教师：现在，我们来看一个例子：[具体例子]。通过这个例子，我们可以看到[概念应用]。\n- 教师：接下来，我们学习[第二个知识点]。[详细讲解]\n\n## 重难点突破 (10分钟)\n- 教师：在学习过程中，我们需要特别注意以下几个重难点：\n1. [重难点1]：[详细讲解和解决方法]\n2. [重难点2]：[详细讲解和解决方法]\n- 教师：为了帮助大家更好地理解，我们来做一个小练习：[练习题]\n\n## 巩固练习 (10分钟)\n- 教师：现在，让我们通过一些练习题来巩固今天所学的知识。\n- 学生：[完成练习]\n- 教师：大家做得很好！我们来核对一下答案：[讲解答案]\n\n## 总结与作业 (5分钟)\n- 教师：今天我们学习了[总结知识点]。重点掌握了[重点内容]，理解了[难点内容]。\n- 教师：课后作业：[布置作业]\n- 教师：同学们，今天的课就到这里，有问题的同学可以随时来问我。`,
        visualization: `\n        <div class="visualization-container">\n            <h4>知识点关系图</h4>\n            <div style="width: 100%; height: 300px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">\n                <div style="text-align: center;">\n                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">${content.substring(0, 50)}...</div>\n                    <div style="display: flex; justify-content: center; gap: 40px; margin-top: 30px;">\n                        <div style="text-align: center;">\n                            <div style="width: 100px; height: 100px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">概念1</div>\n                            <div>核心概念</div>\n                        </div>\n                        <div style="text-align: center;">\n                            <div style="width: 100px; height: 100px; background: #e74c3c; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">概念2</div>\n                            <div>重要应用</div>\n                        </div>\n                        <div style="text-align: center;">\n                            <div style="width: 100px; height: 100px; background: #27ae60; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">概念3</div>\n                            <div>拓展知识</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            \n            <h4>学习路径</h4>\n            <div style="margin-top: 20px;">\n                <div style="display: flex; align-items: center; margin-bottom: 15px;">\n                    <div style="width: 30px; height: 30px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">1</div>\n                    <div>了解基本概念</div>\n                </div>\n                <div style="display: flex; align-items: center; margin-bottom: 15px;">\n                    <div style="width: 30px; height: 30px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">2</div>\n                    <div>掌握核心原理</div>\n                </div>\n                <div style="display: flex; align-items: center; margin-bottom: 15px;">\n                    <div style="width: 30px; height: 30px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">3</div>\n                    <div>学习应用方法</div>\n                </div>\n                <div style="display: flex; align-items: center; margin-bottom: 15px;">\n                    <div style="width: 30px; height: 30px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">4</div>\n                    <div>练习巩固提高</div>\n                </div>\n                <div style="display: flex; align-items: center;">\n                    <div style="width: 30px; height: 30px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">5</div>\n                    <div>拓展知识应用</div>\n                </div>\n            </div>\n        </div>\n    `,
        divination: `\n        <div class="divination-container">\n            <h4>卦象分析</h4>\n            <div style="background: #f7fafc; padding: 20px; border-radius: 10px; box-shadow: 0 1px 5px rgba(0,0,0,0.05);">\n                <div style="text-align: center; margin-bottom: 30px;">\n                    <div style="font-size: 24px; font-weight: bold; color: #4f46e5; margin-bottom: 10px;">乾卦</div>\n                    <div style="font-size: 16px; color: #4a5568;">天行健，君子以自强不息</div>\n                </div>\n                \n                <div style="margin-bottom: 20px;">\n                    <h5 style="color: #2d3748; margin-bottom: 10px;">卦象解读</h5>\n                    <p style="color: #374151; line-height: 1.6;">乾卦象征天，代表刚健、进取、向上。在教学中，这意味着本节课内容具有开创性和引领性，需要教师以积极主动的态度引导学生探索知识，培养学生的进取心和自主学习能力。</p>\n                </div>\n                \n                <div style="margin-bottom: 20px;">\n                    <h5 style="color: #2d3748; margin-bottom: 10px;">教学建议</h5>\n                    <ul style="color: #374151; line-height: 1.6; list-style-type: disc; padding-left: 20px;">\n                        <li>采用启发式教学方法，鼓励学生主动思考</li>\n                        <li>设置挑战性任务，激发学生的学习动力</li>\n                        <li>建立明确的学习目标，引导学生不断进步</li>\n                        <li>注重培养学生的创新思维和实践能力</li>\n                    </ul>\n                </div>\n                \n                <div style="margin-bottom: 20px;">\n                    <h5 style="color: #2d3748; margin-bottom: 10px;">学生状态</h5>\n                    <p style="color: #374151; line-height: 1.6;">根据卦象分析，学生在本节课中会表现出较高的学习热情和参与度，但可能会遇到一些挑战。教师应及时给予鼓励和指导，帮助学生克服困难，保持学习动力。</p>\n                </div>\n                \n                <div>\n                    <h5 style="color: #2d3748; margin-bottom: 10px;">教学策略</h5>\n                    <p style="color: #374151; line-height: 1.6;">建议教师采用分层教学策略，根据学生的学习能力和水平，设置不同难度的任务，确保每个学生都能在自己的水平上有所收获。同时，注重培养学生的合作学习能力，通过小组讨论和合作完成任务，增强学生的团队意识和协作能力。</p>\n                </div>\n            </div>\n        </div>\n    `
    };
}
