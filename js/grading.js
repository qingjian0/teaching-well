document.addEventListener('DOMContentLoaded', function() {
    // 生成批改标准
    document.getElementById('generate-standard').addEventListener('click', function() {
        const subject = document.getElementById('subject').value;
        const grade = document.getElementById('grade').value;
        const topic = document.getElementById('topic').value;
        const assignmentContent = document.getElementById('assignment-content').value;
        
        if (!subject || !grade || !topic || !assignmentContent) {
            alert('请填写完整的作业信息');
            return;
        }
        
        const standardResult = document.querySelector('#standard-result .result-content');
        standardResult.innerHTML = '<div class="loading">生成中...</div>';
        
        // 模拟生成批改标准
        setTimeout(function() {
            let standard = '';
            
            if (subject === 'chinese') {
                standard = `
                    <h5>批改参考标准</h5>
                    <p><strong>主题：</strong>${topic}</p>
                    <p><strong>年级：</strong>${grade}年级</p>
                    <h6>评分标准：</h6>
                    <ul>
                        <li>内容完整性：30分</li>
                        <li>语言表达：25分</li>
                        <li>思想深度：20分</li>
                        <li>书写规范：15分</li>
                        <li>创意性：10分</li>
                    </ul>
                    <h6>参考答案要点：</h6>
                    <ul>
                        <li>1. 主题明确，中心突出</li>
                        <li>2. 结构清晰，层次分明</li>
                        <li>3. 语言流畅，用词准确</li>
                        <li>4. 内容具体，有实例支撑</li>
                        <li>5. 情感真挚，有感染力</li>
                    </ul>
                `;
            } else if (subject === 'math') {
                standard = `
                    <h5>批改参考标准</h5>
                    <p><strong>主题：</strong>${topic}</p>
                    <p><strong>年级：</strong>${grade}年级</p>
                    <h6>评分标准：</h6>
                    <ul>
                        <li>答案正确性：40分</li>
                        <li>解题过程：30分</li>
                        <li>思路清晰：20分</li>
                        <li>书写规范：10分</li>
                    </ul>
                    <h6>参考答案要点：</h6>
                    <ul>
                        <li>1. 正确运用相关公式</li>
                        <li>2. 计算过程准确无误</li>
                        <li>3. 单位使用正确</li>
                        <li>4. 结果简洁明了</li>
                        <li>5. 解题思路清晰可辨</li>
                    </ul>
                `;
            } else if (subject === 'english') {
                standard = `
                    <h5>批改参考标准</h5>
                    <p><strong>主题：</strong>${topic}</p>
                    <p><strong>年级：</strong>${grade}年级</p>
                    <h6>评分标准：</h6>
                    <ul>
                        <li>语法正确性：30分</li>
                        <li>词汇运用：25分</li>
                        <li>句子结构：20分</li>
                        <li>拼写规范：15分</li>
                        <li>表达流畅：10分</li>
                    </ul>
                    <h6>参考答案要点：</h6>
                    <ul>
                        <li>1. 语法结构正确</li>
                        <li>2. 词汇使用恰当</li>
                        <li>3. 句子通顺流畅</li>
                        <li>4. 拼写无误</li>
                        <li>5. 符合语境要求</li>
                    </ul>
                `;
            } else {
                standard = `
                    <h5>批改参考标准</h5>
                    <p><strong>主题：</strong>${topic}</p>
                    <p><strong>年级：</strong>${grade}年级</p>
                    <h6>评分标准：</h6>
                    <ul>
                        <li>内容完整性：30分</li>
                        <li>知识掌握：30分</li>
                        <li>表达清晰：20分</li>
                        <li>创意性：10分</li>
                        <li>书写规范：10分</li>
                    </ul>
                    <h6>参考答案要点：</h6>
                    <ul>
                        <li>1. 内容全面，覆盖知识点</li>
                        <li>2. 理解正确，概念清晰</li>
                        <li>3. 表达简洁明了</li>
                        <li>4. 有自己的思考</li>
                        <li>5. 格式规范，书写工整</li>
                    </ul>
                `;
            }
            
            standardResult.innerHTML = standard;
        }, 1000);
    });
    
    // 生成学生反馈建议
    document.getElementById('generate-feedback').addEventListener('click', function() {
        const subject = document.getElementById('subject').value;
        const grade = document.getElementById('grade').value;
        const topic = document.getElementById('topic').value;
        const studentAnswer = document.getElementById('student-answer').value;
        
        if (!subject || !grade || !topic || !studentAnswer) {
            alert('请填写完整的作业信息和学生答案');
            return;
        }
        
        const feedbackResult = document.querySelector('#feedback-result .result-content');
        feedbackResult.innerHTML = '<div class="loading">生成中...</div>';
        
        // 模拟生成反馈建议
        setTimeout(function() {
            let feedback = '';
            
            if (subject === 'chinese') {
                feedback = `
                    <h5>学生反馈建议</h5>
                    <p><strong>优点：</strong></p>
                    <ul>
                        <li>作文结构清晰，层次分明</li>
                        <li>语言表达流畅，用词恰当</li>
                        <li>能够围绕主题展开论述</li>
                    </ul>
                    <p><strong>改进建议：</strong></p>
                    <ul>
                        <li>可以增加更多具体的事例来支撑观点</li>
                        <li>注意段落之间的过渡衔接</li>
                        <li>尝试使用更多修辞手法，增强文章感染力</li>
                        <li>书写可以更加规范整洁</li>
                    </ul>
                    <p><strong>学习建议：</strong></p>
                    <ul>
                        <li>多阅读优秀范文，学习其写作技巧</li>
                        <li>平时多积累好词好句，丰富词汇量</li>
                        <li>养成修改作文的习惯，不断提高写作水平</li>
                    </ul>
                `;
            } else if (subject === 'math') {
                feedback = `
                    <h5>学生反馈建议</h5>
                    <p><strong>优点：</strong></p>
                    <ul>
                        <li>解题思路基本正确</li>
                        <li>能够运用所学知识解决问题</li>
                        <li>书写比较规范</li>
                    </ul>
                    <p><strong>改进建议：</strong></p>
                    <ul>
                        <li>注意计算过程的准确性，避免粗心错误</li>
                        <li>解题步骤可以更加详细，便于检查</li>
                        <li>对于复杂问题，建议先理清楚思路再动手解答</li>
                    </ul>
                    <p><strong>学习建议：</strong></p>
                    <ul>
                        <li>加强基础概念的理解和掌握</li>
                        <li>多做练习题，提高解题速度和准确性</li>
                        <li>建立错题本，定期复习巩固</li>
                    </ul>
                `;
            } else if (subject === 'english') {
                feedback = `
                    <h5>学生反馈建议</h5>
                    <p><strong>优点：</strong></p>
                    <ul>
                        <li>能够用英语表达基本意思</li>
                        <li>词汇量基本满足表达需要</li>
                        <li>书写比较规范</li>
                    </ul>
                    <p><strong>改进建议：</strong></p>
                    <ul>
                        <li>注意语法结构的正确性，尤其是时态和语态</li>
                        <li>增加句子的多样性，避免重复使用相同的句型</li>
                        <li>注意单词拼写，避免常见错误</li>
                        <li>提高表达的流畅性和连贯性</li>
                    </ul>
                    <p><strong>学习建议：</strong></p>
                    <ul>
                        <li>多听多读，培养英语语感</li>
                        <li>积累常用短语和句型</li>
                        <li>定期练习写作，注重语法和拼写</li>
                    </ul>
                `;
            } else {
                feedback = `
                    <h5>学生反馈建议</h5>
                    <p><strong>优点：</strong></p>
                    <ul>
                        <li>能够理解基本概念</li>
                        <li>作业完成态度认真</li>
                        <li>书写比较规范</li>
                    </ul>
                    <p><strong>改进建议：</strong></p>
                    <ul>
                        <li>加强对知识点的理解和掌握</li>
                        <li>注意细节，避免粗心错误</li>
                        <li>多思考，培养解决问题的能力</li>
                    </ul>
                    <p><strong>学习建议：</strong></p>
                    <ul>
                        <li>认真听讲，做好课堂笔记</li>
                        <li>及时复习，巩固所学知识</li>
                        <li>多做练习，提高应用能力</li>
                    </ul>
                `;
            }
            
            feedbackResult.innerHTML = feedback;
        }, 1000);
    });
    
    // 分析学习情况
    document.getElementById('analyze-learning').addEventListener('click', function() {
        const subject = document.getElementById('subject').value;
        const grade = document.getElementById('grade').value;
        
        if (!subject || !grade) {
            alert('请选择学科和年级');
            return;
        }
        
        const analysisResult = document.querySelector('#analysis-result .result-content');
        analysisResult.innerHTML = '<div class="loading">分析中...</div>';
        
        // 模拟生成学习情况分析
        setTimeout(function() {
            let analysis = '';
            
            analysis = `
                <h5>学习情况分析</h5>
                <p><strong>学科：</strong>${getSubjectName(subject)}</p>
                <p><strong>年级：</strong>${grade}年级</p>
                <h6>知识掌握情况：</h6>
                <ul>
                    <li>基础知识：85%</li>
                    <li>重点难点：70%</li>
                    <li>综合应用：65%</li>
                </ul>
                <h6>学习能力评估：</h6>
                <ul>
                    <li>记忆能力：良好</li>
                    <li>理解能力：中等</li>
                    <li>应用能力：待提高</li>
                    <li>创新能力：一般</li>
                </ul>
                <h6>学习建议：</h6>
                <ul>
                    <li>加强重点难点知识的学习和巩固</li>
                    <li>提高知识的综合应用能力</li>
                    <li>培养独立思考和解决问题的能力</li>
                    <li>建立良好的学习习惯，定期复习</li>
                </ul>
            `;
            
            analysisResult.innerHTML = analysis;
            
            // 生成学习情况图表
            generateLearningChart();
        }, 1000);
    });
    
    // 获取学科名称
    function getSubjectName(subject) {
        const subjectMap = {
            'chinese': '语文',
            'math': '数学',
            'english': '英语',
            'science': '科学',
            'other': '其他'
        };
        return subjectMap[subject] || '其他';
    }
    
    // 生成学习情况图表
    function generateLearningChart() {
        const ctx = document.getElementById('learning-chart').getContext('2d');
        
        // 销毁旧图表
        if (window.learningChart) {
            window.learningChart.destroy();
        }
        
        // 创建新图表
        window.learningChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['基础知识', '重点难点', '综合应用', '记忆能力', '理解能力', '应用能力'],
                datasets: [{
                    label: '当前水平',
                    data: [85, 70, 65, 80, 75, 60],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
                }, {
                    label: '班级平均',
                    data: [75, 65, 60, 70, 65, 55],
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(153, 102, 255, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    
    // 移动端菜单切换
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
});