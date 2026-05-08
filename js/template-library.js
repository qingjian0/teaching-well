/**
 * 教案模板库 - 提供丰富的教案模板资源
 */

const LessonPlanTemplates = {
    // 模板数据
    templates: {
        basic: {
            name: '基础模板',
            icon: '📝',
            description: '适合常规教学的基础教案结构',
            sections: ['教学目标', '教学重难点', '教学过程', '板书设计', '作业布置']
        },
        interactive: {
            name: '互动模板',
            icon: '🔄',
            description: '强调师生互动的教案设计',
            sections: ['教学目标', '互动设计', '学生活动', '教师活动', '效果评估']
        },
        visual: {
            name: '视觉模板',
            icon: '🎨',
            description: '适合多媒体教学的教案结构',
            sections: ['教学目标', '素材准备', '视觉呈现', '学生观察', '总结反馈']
        },
        quiz: {
            name: '测验模板',
            icon: '📋',
            description: '以测验为主的教案设计',
            sections: ['教学目标', '知识梳理', '测验设计', '错题分析', '巩固练习']
        }
    },

    // 学科模板
    subjectTemplates: {
        chinese: {
            name: '语文',
            grades: {
                '1': { title: '一年级语文上册', topics: ['拼音学习', '识字写字', '口语交际'] },
                '2': { title: '二年级语文上册', topics: ['课文朗读', '生字学习', '看图说话'] },
                '3': { title: '三年级语文上册', topics: ['阅读理解', '写作起步', '古诗背诵'] },
                '4': { title: '四年级语文上册', topics: ['段落分析', '写作技巧', '阅读训练'] },
                '5': { title: '五年级语文上册', topics: ['文章结构', '修辞手法', '作文训练'] },
                '6': { title: '六年级语文上册', topics: ['阅读鉴赏', '写作提升', '文学常识'] }
            },
            teachingMethods: ['朗读法', '讲授法', '讨论法', '演示法', '情景法'],
            keypointTypes: ['字词教学', '句段教学', '篇章教学', '习作教学']
        },
        math: {
            name: '数学',
            grades: {
                '1': { title: '一年级数学上册', topics: ['认识数字', '加减法', '图形认识'] },
                '2': { title: '二年级数学上册', topics: ['乘法入门', '测量', '分类整理'] },
                '3': { title: '三年级数学上册', topics: ['分数初步', '面积计算', '时间单位'] },
                '4': { title: '四年级数学上册', topics: ['大数认识', '运算定律', '平行垂直'] },
                '5': { title: '五年级数学上册', topics: ['小数运算', '因数倍数', '方程入门'] },
                '6': { title: '六年级数学上册', topics: ['分数乘除', '比和比例', '圆的认识'] }
            },
            teachingMethods: ['讲授法', '演示法', '练习法', '探究法', '游戏法'],
            keypointTypes: ['概念教学', '计算教学', '应用题教学', '图形教学']
        },
        english: {
            name: '英语',
            grades: {
                '3': { title: '三年级英语上册', topics: ['字母学习', '日常用语', '简单词汇'] },
                '4': { title: '四年级英语上册', topics: ['问候介绍', '数字颜色', '家庭成员'] },
                '5': { title: '五年级英语上册', topics: ['时间表达', '兴趣爱好', '学校生活'] },
                '6': { title: '六年级英语上册', topics: ['过去式', '现在进行时', '阅读理解'] }
            },
            teachingMethods: ['全身反应法', '情景法', '交际法', '游戏法', '任务型教学'],
            keypointTypes: ['语音教学', '词汇教学', '句型教学', '语篇教学']
        },
        science: {
            name: '科学',
            grades: {
                '3': { title: '三年级科学上册', topics: ['植物生长', '动物世界', '天气变化'] },
                '4': { title: '四年级科学上册', topics: ['溶解实验', '声音传播', '电的秘密'] },
                '5': { title: '五年级科学上册', topics: ['生物多样性', '地球运动', '力的作用'] },
                '6': { title: '六年级科学上册', topics: ['微生物', '能量转化', '地球结构'] }
            },
            teachingMethods: ['观察法', '实验法', '探究法', '讨论法', '多媒体法'],
            keypointTypes: ['观察实验', '概念理解', '数据记录', '结论总结']
        }
    },

    // 教案模板生成
    generateTemplate(params) {
        const { subject, grade, topic, templateType = 'basic' } = params;
        const template = this.templates[templateType] || this.templates.basic;
        const subjectData = this.subjectTemplates[subject];
        
        return {
            type: templateType,
            template: template,
            subject: subjectData,
            createdAt: new Date().toISOString(),
            sections: this.generateSections(template.sections, params)
        };
    },

    // 生成各部分内容
    generateSections(sections, params) {
        const { subject, grade, topic } = params;
        
        return sections.map(section => {
            return {
                title: section,
                content: this.generateSectionContent(section, params)
            };
        });
    },

    // 生成具体内容
    generateSectionContent(sectionName, params) {
        const { subject, grade, topic } = params;
        
        const generators = {
            '教学目标': () => `
- **知识目标**：掌握${topic}的基本概念和相关知识
- **能力目标**：培养学生的理解、分析和应用能力
- **情感目标**：激发学生对${topic}的学习兴趣
            `,
            '教学重难点': () => `
- **教学重点**：${topic}的核心概念和基本原理
- **教学难点**：${topic}的实际应用和综合理解
- **解决办法**：通过实例分析、层层递进的方式突破难点
            `,
            '教学过程': () => `
**1. 导入环节（5分钟）**
通过问题导入、情境创设等方式引入${topic}

**2. 新课讲授（20分钟）**
- 讲解${topic}的基本概念
- 分析典型例题
- 师生互动讨论

**3. 巩固练习（12分钟）**
- 完成课堂练习
- 进行变式训练
- 个别指导

**4. 课堂小结（3分钟）**
梳理本节课知识点，构建知识框架
            `,
            '板书设计': () => `
```
┌──────────────────────────────┐
│          ${topic}              │
├──────────────────────────────┤
│                              │
│  一、概念：                   │
│                              │
│  二、重点：                   │
│                              │
│  三、例题：                   │
│                              │
└──────────────────────────────┘
```
            `,
            '作业布置': () => `
**基础作业：**
- 完成教材配套练习题

**提高作业：**
- 完成拓展练习题

**选做作业：**
- 收集相关资料进行拓展学习
            `
        };
        
        return generators[sectionName] ? generators[sectionName]() : '';
    },

    // 获取模板列表
    getTemplates() {
        return Object.entries(this.templates).map(([key, value]) => ({
            key,
            ...value
        }));
    },

    // 获取学科列表
    getSubjects() {
        return Object.entries(this.subjectTemplates).map(([key, value]) => ({
            key,
            name: value.name,
            grades: Object.entries(value.grades).map(([gKey, gValue]) => ({
                key: gKey,
                ...gValue
            }))
        }));
    },

    // 获取年级列表
    getGrades(subject) {
        if (!subject || !this.subjectTemplates[subject]) {
            return [];
        }
        return Object.entries(this.subjectTemplates[subject].grades).map(([key, value]) => ({
            key,
            ...value
        }));
    },

    // 获取主题列表
    getTopics(subject, grade) {
        if (!subject || !grade || !this.subjectTemplates[subject]?.grades[grade]) {
            return [];
        }
        return this.subjectTemplates[subject].grades[grade].topics || [];
    }
};

// 导出到全局
window.LessonPlanTemplates = LessonPlanTemplates;

console.log('📚 教案模板库已加载');
