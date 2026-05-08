/**
 * 本地智能引擎 - 提供离线可用的AI教案生成能力
 * Level 0: 静态模板
 * Level 1: 本地智能分析
 * Level 2: 可选API集成
 */

const LocalAIEngine = {
    // 配置
    config: {
        useAPI: false,
        apiEndpoint: '',
        apiKey: '',
        cacheEnabled: true,
        cacheExpiry: 3600000 // 1小时
    },
    
    // 缓存
    cache: new Map(),
    
    // 初始化
    init(config = {}) {
        Object.assign(this.config, config);
        this.loadCache();
        console.log('✅ 本地智能引擎初始化完成');
        return this;
    },
    
    // 加载缓存
    loadCache() {
        try {
            const stored = localStorage.getItem('localAI_cache');
            if (stored) {
                const data = JSON.parse(stored);
                this.cache = new Map(data);
                this.cleanExpiredCache();
            }
        } catch (e) {
            this.cache = new Map();
        }
    },
    
    // 保存缓存
    saveCache() {
        try {
            const data = Array.from(this.cache.entries());
            localStorage.setItem('localAI_cache', JSON.stringify(data));
        } catch (e) {
            console.warn('缓存保存失败:', e);
        }
    },
    
    // 清理过期缓存
    cleanExpiredCache() {
        const now = Date.now();
        for (const [key, value] of this.cache) {
            if (now - value.timestamp > this.config.cacheExpiry) {
                this.cache.delete(key);
            }
        }
    },
    
    // 生成缓存键
    getCacheKey(type, params) {
        return `${type}_${JSON.stringify(params)}`;
    },
    
    // 生成教案
    async generateLessonPlan(params) {
        const { subject, grade, topic, version, content, template } = params;
        const cacheKey = this.getCacheKey('lessonPlan', params);
        
        // 检查缓存
        if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.config.cacheExpiry) {
                console.log('📦 从缓存返回教案');
                return cached.data;
            }
        }
        
        // 生成教案
        const plan = this.generateLessonPlanContent(params);
        
        // 存入缓存
        if (this.config.cacheEnabled) {
            this.cache.set(cacheKey, {
                data: plan,
                timestamp: Date.now()
            });
            this.saveCache();
        }
        
        return plan;
    },
    
    // 生成教案内容
    generateLessonPlanContent(params) {
        const { subject, grade, topic, version, content, template } = params;
        
        const subjectNames = {
            chinese: '语文',
            math: '数学',
            english: '英语',
            science: '科学',
            other: '其他'
        };
        
        const gradeNames = {
            '1': '一年级', '2': '二年级', '3': '三年级',
            '4': '四年级', '5': '五年级', '6': '六年级'
        };
        
        const versionNames = {
            pep: '人教版',
            moe: '部编版',
            bsd: '北师大版',
            hs: '沪教版',
            universal: '通用版'
        };
        
        const subjectName = subjectNames[subject] || '其他';
        const gradeName = gradeNames[grade] || `${grade}年级`;
        const versionName = versionNames[version] || '通用版';
        
        // 学科特定内容
        const subjectContent = this.getSubjectSpecificContent(subject, topic, grade);
        
        return {
            title: topic,
            subject: subjectName,
            grade: gradeName,
            version: versionName,
            template: template || 'basic',
            content: `
## 📚 ${topic}

**学科：** ${subjectName}　|　**年级：** ${gradeName}　|　**教材：** ${versionName}

---

### 🎯 一、教学目标

${subjectContent.objectives}

---

### ⭐ 二、教学重难点

${subjectContent.keypoints}

---

### 📖 三、教学过程

${subjectContent.teachingProcess}

---

### 📝 四、板书设计

${subjectContent.blackboard}

---

### 📚 五、作业布置

${subjectContent.homework}

---

### 🎬 六、教学资源推荐

${subjectContent.resources}

---

### 📊 七、课堂评价

${subjectContent.evaluation}

${content ? `---\n\n### 📋 八、教师补充要求\n\n${content}` : ''}

---

**📅 课时安排：** 1课时（40分钟）

**🎨 教学准备：** 
- ✅ 多媒体课件（PPT）
- ✅ 教学图片/视频素材
- ✅ 教具/实验器材（如适用）
- ✅ 练习题打印稿

**💡 教学提示：** 根据学生实际情况灵活调整教学节奏，注重引导学生主动思考和参与。

---

*📝 教案由智能教学助手生成 · 可根据实际情况调整*
            `.trim()
        };
    },
    
    // 获取学科特定内容
    getSubjectSpecificContent(subject, topic, grade) {
        const templates = {
            chinese: {
                objectives: `
- **知识与技能**：正确读写本课生字词，理解文章主要内容
- **过程与方法**：通过朗读、默读等方式体会文章情感
- **情感态度**：感受中华文化的魅力，培养语文素养
                `,
                keypoints: `
- **教学重点**：掌握本课重点字词的读音、字形和含义
- **教学难点**：理解文章深层含义，体会作者情感
- **易错点**：多音字的读音、近义词的辨析
                `,
                teachingProcess: `
#### 1. 导入新课（5分钟）
教师通过图片、音乐或故事导入新课，激发学生学习兴趣。

#### 2. 初读课文（10分钟）
- 学生自由朗读课文，标记不认识的字词
- 教师范读，学生跟读，纠正读音
- 疏通文意，整体感知

#### 3. 精读分析（20分钟）
- 逐段分析课文内容
- 抓住重点句子和段落进行品读
- 体会文章的表达方式和修辞手法

#### 4. 拓展延伸（8分钟）
- 联系生活实际，加深理解
- 进行读写结合训练

#### 5. 课堂小结（2分钟）
梳理本课知识点，总结学习收获
                `,
                blackboard: `
```
┌─────────────────────────────────────┐
│           ${topic}                  │
├─────────────────────────────────────┤
│  一、生字词：                       │
│     【重点字】                       │
│                                     │
│  二、文章结构：                      │
│     1. ...                          │
│     2. ...                          │
│                                     │
│  三、中心思想：                      │
│     ...                             │
└─────────────────────────────────────┘
```
                `,
                homework: `
1. **基础作业**：
   - 抄写本课生字词（每个3遍）
   - 有感情地朗读课文

2. **提高作业**：
   - 完成课后练习题
   - 写一篇读后感（300字以上）

3. **拓展作业**（选做）：
   - 收集相关资料，进行拓展阅读
                `,
                resources: `
📚 **文本资源：**
- 课文原文及朗读音频
- 作者生平介绍
- 相关文学作品推荐

🎬 **多媒体资源：**
- 🖼️ 课文插图或相关图片
- 🎵 配乐朗读音频
- 📺 相关影视片段

📝 **教学工具：**
- 生字卡片
- 词语卡片
- 思维导图模板
                `,
                evaluation: `
📊 **课堂提问评价：**
| 评价项目 | 优秀 | 良好 | 及格 |
|---------|------|------|------|
| 朗读能力 | 声音洪亮、感情充沛 | 声音清晰、较有感情 | 能读通顺 |
| 理解能力 | 能准确回答问题 | 基本能回答 | 需提示回答 |
| 表达能力 | 表达清晰、有条理 | 表达较清晰 | 表达基本完整 |

✅ **课后作业评价：**
- 作业完成质量
- 书写工整程度
- 正确率统计

💬 **课堂表现评价：**
- 参与课堂讨论的积极性
- 小组合作表现
- 学习态度
                `
            },
            math: {
                objectives: `
- **知识与技能**：理解并掌握本课所学的数学概念和计算方法
- **过程与方法**：通过观察、操作、探究等活动培养数学思维能力
- **情感态度**：体验数学与生活的联系，培养学习数学的兴趣
                `,
                keypoints: `
- **教学重点**：掌握本课的数学公式、定理或计算方法
- **教学难点**：理解数学概念的本质，能够灵活运用
- **易错点**：计算中的粗心错误、公式混淆
                `,
                teachingProcess: `
#### 1. 复习导入（5分钟）
回顾旧知，为新课学习做铺垫。

#### 2. 探究新知（20分钟）
- 创设情境，提出问题
- 引导学生观察、猜想、验证
- 归纳总结数学规律

#### 3. 巩固练习（12分钟）
- 完成教材练习题
- 进行变式训练
- 拓展提高

#### 4. 课堂小结（3分钟）
梳理本课知识点，构建知识体系
                `,
                blackboard: `
```
┌─────────────────────────────────────┐
│           ${topic}                  │
├─────────────────────────────────────┤
│  【公式/定理】                       │
│                                     │
│  例题：                              │
│  解：                                │
│                                     │
│  【易错点】                          │
└─────────────────────────────────────┘
```
                `,
                homework: `
1. **基础作业**：
   - 完成教材配套练习
   - 订正课堂错题

2. **提高作业**：
   - 完成拓展练习题
   - 出一道相关题目并解答

3. **实践作业**（选做）：
   - 在生活中找一找数学知识的应用
                `,
                resources: `
📚 **文本资源：**
- 教材例题详解
- 数学公式手册
- 趣味数学故事

🎬 **多媒体资源：**
- 📊 数学概念动画演示
- 📈 数据可视化图表
- 🎮 数学游戏互动

📐 **教学工具：**
- 三角板、直尺、圆规
- 计数器或算盘
- 数学教具模型
                `,
                evaluation: `
📊 **课堂练习评价：**
| 评价项目 | 优秀 | 良好 | 及格 |
|---------|------|------|------|
| 计算准确性 | 全部正确 | 少量错误 | 较多错误 |
| 解题思路 | 清晰简洁 | 基本清晰 | 思路混乱 |
| 书写规范 | 整洁规范 | 较整洁 | 不规范 |

✅ **课后作业评价：**
- 作业完成质量
- 解题方法多样性
- 正确率统计

🧠 **思维能力评价：**
- 举一反三能力
- 逻辑推理能力
- 创新思维
                `
            },
            english: {
                objectives: `
- **知识与技能**：掌握本课的核心词汇、短语和句型
- **过程与方法**：通过听说读写训练提高语言运用能力
- **情感态度**：激发英语学习兴趣，培养跨文化意识
                `,
                keypoints: `
- **教学重点**：四会单词的记忆、核心句型的掌握
- **教学难点**：在真实情境中运用所学语言
- **易错点**：时态变化、单词拼写
                `,
                teachingProcess: `
#### 1. Warm-up（热身，5分钟）
- 唱英语歌曲
- 进行日常对话

#### 2. Presentation（新课呈现，15分钟）
- 呈现新词汇和句型
- 通过图片、动作等辅助理解
- 范读、跟读、模仿

#### 3. Practice（练习，15分钟）
- 机械性练习（跟读、替换）
- 意义性练习（对话、表演）
- 综合运用

#### 4. Production（拓展，8分钟）
- 任务型活动
- 创造性输出

#### 5. Summary & Homework（小结，2分钟）
总结本课内容，布置作业
                `,
                blackboard: `
```
┌─────────────────────────────────────┐
│          ${topic}                   │
├─────────────────────────────────────┤
│  Words:                             │
│                                     │
│  Phrases:                            │
│                                     │
│  Sentences:                          │
│                                     │
│  Grammar:                            │
└─────────────────────────────────────┘
```
                `,
                homework: `
1. **基础作业**：
   - 抄写并背诵本课单词
   - 朗读课文录音

2. **提高作业**：
   - 用本课句型造句
   - 完成练习册相关题目

3. **拓展作业**（选做）：
   - 用英语介绍相关内容
   - 观看相关英文视频
                `,
                resources: `
📚 **文本资源：**
- 课文原文及翻译
- 单词卡片
- 英语学习绘本

🎬 **多媒体资源：**
- 🎵 英语歌曲音频
- 📺 英文动画片
- 🔊 纯正发音示范

💬 **教学工具：**
- 单词卡片
- 图片卡片
- 情景对话图片
                `,
                evaluation: `
📊 **课堂表现评价：**
| 评价项目 | 优秀 | 良好 | 及格 |
|---------|------|------|------|
| 发音准确性 | 发音标准 | 基本准确 | 有较多错误 |
| 口语表达 | 流利自然 | 较流利 | 不流利 |
| 参与度 | 积极主动 | 较积极 | 被动参与 |

✅ **课后作业评价：**
- 单词听写正确率
- 作业完成质量
- 口语练习完成情况

🌍 **综合能力评价：**
- 听力理解能力
- 口语表达能力
- 跨文化意识
                `
            },
            science: {
                objectives: `
- **知识与技能**：了解科学现象，掌握科学概念
- **过程与方法**：通过观察、实验等方法培养科学探究能力
- **情感态度**：激发探索自然的兴趣，树立科学观念
                `,
                keypoints: `
- **教学重点**：理解科学概念和原理
- **教学难点**：将科学知识应用于实际问题
- **易错点**：概念的混淆、实验操作的规范性
                `,
                teachingProcess: `
#### 1. 情境导入（5分钟）
通过视频、实验或生活实例引入课题。

#### 2. 探究新知（20分钟）
- 提出问题，做出假设
- 设计实验，进行探究
- 收集数据，分析归纳

#### 3. 交流讨论（10分钟）
- 小组汇报探究结果
- 全班交流讨论
- 得出结论

#### 4. 应用拓展（8分钟）
- 联系生活实际
- 进行知识迁移

#### 5. 小结评价（2分钟）
梳理知识点，进行学习评价
                `,
                blackboard: `
```
┌─────────────────────────────────────┐
│          ${topic}                   │
├─────────────────────────────────────┤
│  【实验名称】                        │
│                                     │
│  【原理】                            │
│                                     │
│  【结论】                            │
└─────────────────────────────────────┘
```
                `,
                homework: `
1. **基础作业**：
   - 完成科学实验报告
   - 复习本课知识点

2. **提高作业**：
   - 完成探究活动记录
   - 查阅相关资料

3. **实践作业**（选做）：
   - 进行简单科学实验
   - 观察自然现象并记录
                `,
                resources: `
📚 **文本资源：**
- 科学实验手册
- 科普读物推荐
- 科学史资料

🎬 **多媒体资源：**
- 🔬 实验视频演示
- 📺 科学纪录片
- 📊 数据可视化图表

🔧 **实验器材：**
- 显微镜
- 烧杯、试管
- 温度计、天平
                `,
                evaluation: `
📊 **实验操作评价：**
| 评价项目 | 优秀 | 良好 | 及格 |
|---------|------|------|------|
| 操作规范性 | 规范熟练 | 基本规范 | 需指导 |
| 观察能力 | 细致准确 | 较细致 | 不细致 |
| 记录完整性 | 完整详细 | 基本完整 | 不完整 |

✅ **作业评价：**
- 实验报告质量
- 数据记录准确性
- 分析结论合理性

🔬 **探究能力评价：**
- 问题提出能力
- 实验设计能力
- 科学思维能力
                `
            }
        };
        
        return templates[subject] || templates.chinese;
    },
    
    // 分析重难点
    async analyzeKeypoints(params) {
        const { subject, grade, topic, content } = params;
        
        return {
            keypoints: [
                {
                    title: '核心概念理解',
                    difficulty: 'high',
                    description: `学生需要理解${topic}的核心概念，这是学习${topic}的基础。`,
                    solution: '使用生活中的例子进行类比，通过图表和动画展示概念的形成过程，鼓励学生通过实践操作加深理解。'
                },
                {
                    title: '知识应用',
                    difficulty: 'medium',
                    description: `学生需要掌握${topic}的应用方法，能够在不同场景中灵活运用。`,
                    solution: '提供多种类型的练习题，从简单到复杂逐步递进，帮助学生建立知识应用的思维模式。'
                },
                {
                    title: '知识联系',
                    difficulty: 'low',
                    description: `学生需要将${topic}与已学知识建立联系，形成完整的知识体系。`,
                    solution: '通过思维导图等工具，帮助学生梳理知识点之间的关系，强化知识体系的构建。'
                }
            ],
            teachingScript: this.generateTeachingScript(subject, grade, topic),
            learningPath: this.generateLearningPath(topic)
        };
    },
    
    // 生成讲解脚本
    generateTeachingScript(subject, grade, topic) {
        return `# ${topic} - 课堂讲解脚本

## 导入环节（5分钟）
- 教师：同学们好！今天我们要学习的内容是${topic}。在开始之前，请大家思考一下...
- 学生活动：思考、回答
- 教师评价引导

## 新课讲解（20分钟）

### 环节一：概念引入
- 教师讲解核心概念
- 学生认真听讲，记录重点

### 环节二：实例分析
- 教师呈现具体实例
- 学生观察、思考
- 师生互动讨论

### 环节三：规律总结
- 引导学生归纳总结
- 形成知识框架

## 巩固练习（12分钟）
- 完成基础练习题
- 进行变式训练
- 个别辅导

## 课堂小结（3分钟）
- 学生总结本课收获
- 教师补充强调重点

## 布置作业（5分钟）
- 说明作业要求
- 强调注意事项`;
    },
    
    // 生成学习路径
    generateLearningPath(topic) {
        return [
            { step: 1, title: '预习准备', description: '课前预习相关资料，形成初步印象' },
            { step: 2, title: '认真听课', description: '跟随老师节奏，理解核心概念' },
            { step: 3, title: '及时练习', description: '完成课堂练习，巩固所学知识' },
            { step: 4, title: '总结归纳', description: '梳理知识点，构建知识体系' },
            { step: 5, title: '拓展应用', description: '将知识应用于实际问题' }
        ];
    },
    
    // 生成作业批改反馈
    generateGradingFeedback(params) {
        const { subject, topic, score, strengths, improvements } = params;
        
        const feedbackTemplates = {
            chinese: {
                strengths: ['文章结构清晰', '语言表达流畅', '内容具体充实', '情感真挚自然'],
                improvements: ['注意段落过渡', '增加细节描写', '丰富修辞手法', '提高书写规范']
            },
            math: {
                strengths: ['解题思路正确', '计算过程准确', '书写规范清晰', '方法运用得当'],
                improvements: ['注意计算细心', '完善解题步骤', '加强概念理解', '提高解题速度']
            },
            english: {
                strengths: ['词汇运用恰当', '句型结构正确', '表达基本流畅', '书写比较规范'],
                improvements: ['注意语法时态', '丰富句式表达', '提高拼写准确', '增强语感培养']
            }
        };
        
        const template = feedbackTemplates[subject] || feedbackTemplates.chinese;
        
        return {
            score: score || 80,
            strengths: strengths || template.strengths.slice(0, 2),
            improvements: improvements || template.improvements.slice(0, 2),
            suggestions: `1. 继续保持良好的学习习惯\n2. 针对薄弱环节加强练习\n3. 遇到问题及时请教老师\n4. 定期复习巩固所学知识`
        };
    },
    
    // 清空缓存
    clearCache() {
        this.cache.clear();
        localStorage.removeItem('localAI_cache');
        console.log('🗑️ 缓存已清空');
    }
};

// 初始化本地AI引擎
window.addEventListener('DOMContentLoaded', () => {
    LocalAIEngine.init();
    window.LocalAIEngine = LocalAIEngine;
});

console.log('📚 本地智能引擎已加载 - 离线可用');
