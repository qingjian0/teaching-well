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
                title: '三年级数学 - 分数的初步认识（核心素养导向）',
                author: '张老师',
                school: '青山村小',
                region: '西部山区',
                subject: 'math',
                grade: '3',
                content: `
# 《分数的初步认识》教案 - 核心素养导向

## 核心素养目标
- 数学抽象：理解分数的意义，认识几分之一
- 逻辑推理：通过操作活动，发现分数的本质特征
- 数学建模：用分数描述生活中的数量关系
- 直观想象：借助图形理解分数概念

## 学业表现目标
- 知识层面：能准确表述分数的定义，说出几分之一的含义
- 能力层面：能正确读写分数，能用分数表示简单数量
- 应用层面：能将分数与生活实际联系，解释现象

## 德育目标
结合分食物的情境，培养学生公平意识和分享精神

## 教学重难点
- 重点：理解分数的含义，认识几分之一
- 难点：几分之一的概念建构

## 学科实践活动设计
### 环节一：情境导入（5分钟）
**实践活动**：用月饼、苹果等实物进行平均分
**素养培养**：数学抽象

### 环节二：操作探究（15分钟）
**学科实践**：
1. 用纸片折出二分之一
2. 折出三分之一、四分之一
3. 比较大小

**素养培养**：直观想象、逻辑推理

### 环节三：精讲点拨（10分钟）
教师精讲分数各部分名称，构建知识体系

### 环节四：实践应用（10分钟）
分层练习：
- 🌱基础层：完成分数读写练习
- 🌿标准层：比较分数大小
- 🌳拓展层：解决生活中的分数问题

### 环节五：反思总结（5分钟）
学生自评：本节课的收获和困惑

## 学业质量评价标准
- 优秀：能准确读写分数，灵活运用解决复杂问题
- 良好：能正确理解分数概念，熟练完成基本练习
- 中等：在指导下能完成简单应用
- 待提高：初步了解分数表象，需帮助完成基础任务

## 板书设计
《分数的初步认识》

📌重点：
- 分数的意义
- 各部分名称

⚠️难点：
- 几分之一的理解
                `.trim(),
                tags: ['分数', '数学', '动手操作', '核心素养', '新课标'],
                downloadCount: 156,
                viewCount: 456,
                rating: 4.9,
                createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
                synced: true
            },
            {
                id: 'shared_2',
                title: '二年级语文 - 识字教学：田家四季歌（核心素养导向）',
                author: '李老师',
                school: '河畔小学',
                region: '中部地区',
                subject: 'chinese',
                grade: '2',
                content: `
# 《田家四季歌》识字教学教案 - 核心素养导向

## 核心素养目标
- 语言运用：识读12个生字，正确书写8个生字
- 思维能力：运用字理识字、联想记忆等方法
- 审美能力：感受田园诗歌的韵律美
- 文化自信：了解田家文化，传承中华农耕文明

## 学业表现目标
- 知识层面：掌握课文生字的音、形、义
- 能力层面：能用多种方法识记生字
- 应用层面：能在语境中正确运用生字

## 德育目标
培养学生热爱劳动、珍惜粮食的品质

## 教学重难点
- 重点：12个生字的认读与书写
- 难点：理解四季农活，体会田家生活

## 学科实践活动设计
### 环节一：情境导入（5分钟）
**实践活动**：播放农村四季变化的视频/图片
**素养培养**：文化自信

### 环节二：识字探究（15分钟）
**学科实践**：
1. 带拼音认读生字
2. 归类识字（草字头、雨字头）
3. 游戏巩固（找朋友、开火车）

**素养培养**：语言运用、思维能力

### 环节三：朗读感悟（10分钟）
有感情朗读课文，感受诗歌韵律

### 环节四：拓展实践（10分钟）
分层任务：
- 🌱基础层：正确朗读课文
- 🌿标准层：背诵课文
- 🌳拓展层：画一画你喜欢的季节

## 学业质量评价标准
- 优秀：生字掌握准确，能创造性地表达
- 良好：生字掌握牢固，能有感情朗读
- 中等：在指导下完成识字任务
- 待提高：能认读部分生字

## 板书设计
《田家四季歌》

📌重点：
- 生字识记
- 朗读感悟

⚠️难点：
- 四季农活理解
                `.trim(),
                tags: ['识字', '语文', '乡村生活', '核心素养', '新课标'],
                downloadCount: 128,
                viewCount: 389,
                rating: 4.8,
                createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
                synced: true
            },
            {
                id: 'shared_3',
                title: '四年级科学 - 植物的生长（核心素养导向）',
                author: '王老师',
                school: '阳光完小',
                region: '南方山区',
                subject: 'science',
                grade: '4',
                content: `
# 《植物的生长》教案 - 核心素养导向

## 核心素养目标
- 科学观念：理解植物生长的条件和规律
- 科学思维：基于观察数据进行推理
- 探究实践：经历完整的科学探究过程
- 态度责任：培养爱护植物、保护环境的意识

## 学业表现目标
- 知识层面：说出植物生长的基本条件
- 能力层面：能设计简单的观察实验
- 应用层面：能用科学方法解释生活现象

## 德育目标
培养学生的生态文明观念和可持续发展意识

## 教学重难点
- 重点：植物生长的条件（阳光、水分、空气）
- 难点：设计观察记录方案

## 学科实践活动设计
### 环节一：情境导入（5分钟）
**实践活动**：展示不同生长状态的植物图片
**素养培养**：科学观念

### 环节二：猜想假设（5分钟）
学生猜想：植物生长需要什么条件？

### 环节三：探究实践（20分钟）
**学科实践**：
1. 设计对比实验
2. 动手种植黄豆
3. 小组观察记录
4. 收集整理数据

**素养培养**：探究实践、科学思维

### 环节四：交流展示（10分钟）
各小组汇报观察结果

### 环节五：反思拓展（5分钟）
设计长期观察方案

## 学业质量评价标准
- 优秀：能独立设计实验，准确记录和分析数据
- 良好：能按要求完成探究，得出正确结论
- 中等：在指导下完成探究过程
- 待提高：初步了解观察方法

## 板书设计
《植物的生长》

📌重点：
- 生长条件
- 观察方法

⚠️难点：
- 实验设计
                `.trim(),
                tags: ['科学', '植物', '实践活动', '核心素养', '新课标'],
                downloadCount: 98,
                viewCount: 267,
                rating: 4.9,
                createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
                synced: true
            },
            {
                id: 'shared_4',
                title: '五年级英语 - Unit 1 My Day（核心素养导向）',
                author: '陈老师',
                school: '城郊小学',
                region: '东部沿海',
                subject: 'english',
                grade: '5',
                content: `
# Unit 1 My Day 英语教案 - 核心素养导向

## 核心素养目标
- 语言能力：能运用所学句型描述日常活动
- 文化意识：了解中西方作息差异
- 思维品质：运用时间线组织信息
- 学习能力：掌握自主学习词汇的方法

## 学业表现目标
- 知识层面：掌握时间表达和日常活动词汇
- 能力层面：能用英语描述自己的一天
- 应用层面：能在真实情境中进行交流

## 德育目标
培养学生合理安排时间的习惯

## 教学重难点
- 重点：掌握What time do you...?及其回答
- 难点：在实际情境中运用时间表达

## 学科实践活动设计
### 环节一：情境导入（5分钟）
**实践活动**：播放外国学生一天的vlog
**素养培养**：文化意识

### 环节二：语言实践（15分钟）
**学科实践**：
1. 学习时间表达
2. 句型操练
3. 小组对话练习

**素养培养**：语言能力

### 环节三：任务驱动（15分钟）
制作自己的Daily Schedule并展示

### 环节四：情感提升（5分钟）
讨论：如何合理安排时间？

## 学业质量评价标准
- 优秀：表达流畅准确，能进行创造性对话
- 良好：能正确运用目标句型
- 中等：在帮助下能完成基本对话
- 待提高：能认读部分词汇

## 板书设计
Unit 1 My Day

📌重点：What time...? / I usually...
⚠️难点：时间表达的实际运用
                `.trim(),
                tags: ['英语', '日常活动', '核心素养', '新课标'],
                downloadCount: 76,
                viewCount: 198,
                rating: 4.7,
                createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
                synced: true
            },
            {
                id: 'shared_5',
                title: '三年级道德与法治 - 我爱我们班（核心素养导向）',
                author: '刘老师',
                school: '希望小学',
                region: '东北地区',
                subject: 'moral',
                grade: '3',
                content: `
# 《我爱我们班》教案 - 核心素养导向

## 核心素养目标
- 政治认同：热爱集体，增强归属感
- 道德修养：学会与人相处，培养集体荣誉感
- 法治观念：了解班级规则的意义
- 健全人格：培养责任意识

## 学业表现目标
- 知识层面：知道班级是自己成长的重要集体
- 能力层面：能说出为班级做贡献的方法
- 情感层面：体验集体生活的温暖

## 德育目标（核心）
培养学生热爱集体、团结互助的品质

## 教学重难点
- 重点：感受班级的温暖，愿意为班级出力
- 难点：理解个人与集体的关系

## 学科实践活动设计
### 环节一：情境体验（10分钟）
**实践活动**：播放班级活动照片/视频
**素养培养**：健全人格

### 环节二：案例分析（10分钟）
讨论：为什么班级很重要？

### 环节三：角色扮演（15分钟）
**学科实践**：
1. 表演：我为班级做了什么
2. 讨论：还能为班级做什么

**素养培养**：道德修养

### 环节四：制定班级公约（10分钟）
共同制定班级规则

### 环节五：情感升华（5分钟）
全班合唱班级之歌

## 学业质量评价标准
- 优秀：深刻理解班级意义，主动为班级服务
- 良好：能列举为班级做事的方法
- 中等：知道班级是自己的集体
- 待提高：初步感受班级温暖

## 板书设计
《我爱我们班》

📌重点：
- 班级归属感
- 集体荣誉感

⚠️难点：
- 个人与集体的关系
                `.trim(),
                tags: ['道德与法治', '集体教育', '核心素养', '新课标'],
                downloadCount: 89,
                viewCount: 234,
                rating: 4.8,
                createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
                synced: true
            },
            {
                id: 'shared_6',
                title: '四年级历史 - 认识一些古时候的人（核心素养导向）',
                author: '赵老师',
                school: '古塔小学',
                region: '西北地区',
                subject: 'history',
                grade: '4',
                content: `
# 《认识一些古时候的人》教案 - 核心素养导向

## 核心素养目标
- 唯物史观：初步了解历史是真实存在的
- 时空观念：建立古今时间联系
- 史料实证：通过文物认识历史
- 历史解释：初步学会讲述历史故事
- 家国情怀：增强民族自豪感

## 学业表现目标
- 知识层面：知道几位古代名人的故事
- 能力层面：能简单讲述历史故事
- 情感层面：感受古代人物的优秀品质

## 德育目标
培养学生的民族自豪感和文化自信

## 教学重难点
- 重点：了解古代名人的主要事迹
- 难点：建立时空观念，理解历史与现实的联系

## 学科实践活动设计
### 环节一：时空定位（5分钟）
**实践活动**：在时间轴上标记古代人物的年代
**素养培养**：时空观念

### 环节二：史料研习（15分钟）
**学科实践**：
1. 观察古代文物图片
2. 阅读历史小故事
3. 分析人物品质

**素养培养**：史料实证、历史解释

### 环节三：故事讲述（10分钟）
学生讲述古代名人故事

### 环节四：对比思考（10分钟）
古人与今人有什么相同和不同？

### 环节五：情感升华（5分钟）
讨论：从古人身上学到什么？

## 学业质量评价标准
- 优秀：能生动讲述历史故事，有独到见解
- 良好：能准确讲述主要事迹
- 中等：在指导下能完成故事讲述
- 待提高：知道部分历史人物

## 板书设计
《认识古时候的人》

📌重点：
- 人物事迹
- 历史故事

⚠️难点：
- 时空观念建立
                `.trim(),
                tags: ['历史', '古代人物', '核心素养', '新课标'],
                downloadCount: 67,
                viewCount: 178,
                rating: 4.6,
                createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                synced: true
            },
            {
                id: 'shared_7',
                title: '五年级地理 - 我们的近邻（核心素养导向）',
                author: '周老师',
                school: '平原小学',
                region: '华北地区',
                subject: 'geography',
                grade: '5',
                content: `
# 《我们的近邻》教案 - 核心素养导向

## 核心素养目标
- 区域认知：了解周边地区的地理特征
- 综合思维：用地理要素综合分析问题
- 地理实践：学会收集地理信息
- 人地协调：理解人与环境的关系

## 学业表现目标
- 知识层面：说出周边地区的基本情况
- 能力层面：能用地图查找地理信息
- 情感层面：关心家乡发展

## 德育目标
培养学生的家乡情怀和环保意识

## 教学重难点
- 重点：了解周边地区的地理环境
- 难点：分析人与环境的关系

## 学科实践活动设计
### 环节一：地图探究（10分钟）
**实践活动**：在地图上找到周边地区
**素养培养**：区域认知

### 环节二：资料收集（10分钟）
**学科实践**：
1. 收集周边地区的资料
2. 整理信息
3. 小组讨论

**素养培养**：地理实践、综合思维

### 环节三：成果展示（15分钟）
各小组汇报研究成果

### 环节四：人地思考（10分钟）
讨论：我们的家乡有什么环境问题？

### 环节五：行动倡议（5分钟）
我们能为家乡做什么？

## 学业质量评价标准
- 优秀：能综合分析地理要素，提出建议
- 良好：能准确描述地理特征
- 中等：在指导下完成探究
- 待提高：知道家乡的基本情况

## 板书设计
《我们的近邻》

📌重点：
- 区域特征
- 地图运用

⚠️难点：
- 人地关系分析
                `.trim(),
                tags: ['地理', '家乡', '核心素养', '新课标'],
                downloadCount: 54,
                viewCount: 145,
                rating: 4.5,
                createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
                synced: true
            },
            {
                id: 'shared_8',
                title: '三年级音乐 - 咏鹅（核心素养导向）',
                author: '马老师',
                school: '湖畔小学',
                region: '江南水乡',
                subject: 'music',
                grade: '3',
                content: `
# 《咏鹅》音乐教案 - 核心素养导向

## 核心素养目标
- 审美感知：感受古诗词歌曲的韵律美
- 艺术表现：用歌声表现古诗词的意境
- 文化理解：了解中华诗词文化

## 学业表现目标
- 知识层面：学会演唱歌曲，了解诗词背景
- 能力层面：能用歌声表现诗歌意境
- 情感层面：体验诗词与音乐的融合美

## 德育目标
培养学生对中华优秀传统文化的热爱

## 教学重难点
- 重点：学会演唱歌曲，感受诗词韵律
- 难点：用歌声表现白鹅的形态

## 学科实践活动设计
### 环节一：诗词导入（5分钟）
**实践活动**：朗诵《咏鹅》，感受诗词韵律
**素养培养**：文化理解

### 环节二：聆听感受（5分钟）
欣赏歌曲范唱

### 环节三：学唱歌曲（15分钟）
**学科实践**：
1. 跟琴学唱
2. 处理歌曲情感
3. 表现白鹅形象

**素养培养**：艺术表现

### 环节四：创意表演（10分钟）
分组表演：加入动作表现诗词意境

### 环节五：拓展延伸（5分钟）
吟诵其他古诗词歌曲

## 学业质量评价标准
- 优秀：演唱生动，能创造性地表现意境
- 良好：演唱准确，情感处理得当
- 中等：能完整演唱歌曲
- 待提高：在帮助下能演唱

## 板书设计
《咏鹅》

📌重点：
- 歌曲演唱
- 诗词韵律

⚠️难点：
- 意境表现
                `.trim(),
                tags: ['音乐', '古诗词', '核心素养', '新课标'],
                downloadCount: 73,
                viewCount: 189,
                rating: 4.7,
                createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
                synced: true
            },
            {
                id: 'shared_9',
                title: '四年级美术 - 剪纸艺术（核心素养导向）',
                author: '吴老师',
                school: '文化小学',
                region: '中部地区',
                subject: 'art',
                grade: '4',
                content: `
# 《剪纸艺术》美术教案 - 核心素养导向

## 核心素养目标
- 图像识读：欣赏传统剪纸作品
- 审美判断：感受剪纸的形式美
- 创意实践：设计并制作剪纸作品
- 文化理解：了解剪纸的传统文化内涵

## 学业表现目标
- 知识层面：知道剪纸的基本技法
- 能力层面：能独立完成简单剪纸作品
- 情感层面：体验传统艺术的魅力

## 德育目标
培养学生对中华优秀传统文化的热爱

## 教学重难点
- 重点：掌握剪纸的基本技法
- 难点：设计有创意的剪纸图案

## 学科实践活动设计
### 环节一：作品欣赏（10分钟）
**实践活动**：欣赏各种剪纸作品
**素养培养**：图像识读、审美判断

### 环节二：技法学习（10分钟）
**学科实践**：
1. 学习剪纸基本技法
2. 观看示范
3. 尝试剪简单图案

**素养培养**：创意实践

### 环节三：创作实践（15分钟）
设计并制作剪纸作品

### 环节四：展示评价（10分钟）
作品展示与互评

### 环节五：文化拓展（5分钟）
了解剪纸的文化寓意

## 学业质量评价标准
- 优秀：作品精美，有创意，文化内涵丰富
- 良好：技法掌握熟练，作品完整
- 中等：能完成基本剪纸
- 待提高：在指导下完成简单剪纸

## 板书设计
《剪纸艺术》

📌重点：
- 基本技法
- 图案设计

⚠️难点：
- 创意表达
                `.trim(),
                tags: ['美术', '传统文化', '核心素养', '新课标'],
                downloadCount: 61,
                viewCount: 156,
                rating: 4.6,
                createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
                synced: true
            },
            {
                id: 'shared_10',
                title: '五年级体育 - 接力跑（核心素养导向）',
                author: '孙老师',
                school: '阳光小学',
                region: '东部地区',
                subject: 'pe',
                grade: '5',
                content: `
# 《接力跑》体育教案 - 核心素养导向

## 核心素养目标
- 运动能力：掌握接力跑的基本技术
- 健康行为：形成良好的运动习惯
- 体育品德：培养团队协作精神和规则意识

## 学业表现目标
- 知识层面：知道接力跑的传接棒方法
- 能力层面：能完成基本的传接棒动作
- 情感层面：体验团队合作的乐趣

## 德育目标
培养学生的团队精神和拼搏意识

## 教学重难点
- 重点：传接棒技术的掌握
- 难点：团队配合的默契

## 学科实践活动设计
### 环节一：热身活动（5分钟）
慢跑热身+关节活动

### 环节二：技能学习（15分钟）
**学科实践**：
1. 学习传接棒方法（上挑式、下压式）
2. 分组练习
3. 纠正错误动作

**素养培养**：运动能力

### 环节三：接力比赛（15分钟）
小组接力比赛，培养团队精神

### 环节四：体能练习（10分钟）
发展学生速度素质

### 环节五：放松总结（5分钟）
放松活动+课堂小结

## 学业质量评价标准
- 优秀：技术动作规范，传接棒稳定，团队配合好
- 良好：掌握基本技术，能完成比赛
- 中等：在指导下能完成传接棒
- 待提高：初步了解传接棒方法

## 板书设计
《接力跑》

📌重点：
- 传接棒技术
- 团队配合

⚠️难点：
- 配合默契
                `.trim(),
                tags: ['体育', '田径', '核心素养', '新课标'],
                downloadCount: 58,
                viewCount: 134,
                rating: 4.5,
                createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
                synced: true
            },
            {
                id: 'shared_11',
                title: '六年级信息技术 - 编程入门：Scratch（核心素养导向）',
                author: '郑老师',
                school: '科技小学',
                region: '南方地区',
                subject: 'it',
                grade: '6',
                content: `
# 《Scratch编程入门》信息技术教案 - 核心素养导向

## 核心素养目标
- 信息意识：理解程序解决问题的思维方式
- 计算思维：学会分解问题、设计步骤
- 数字化学习：掌握数字化学习工具
- 信息社会责任：了解信息安全与伦理

## 学业表现目标
- 知识层面：了解编程的基本概念
- 能力层面：能编写简单程序
- 情感层面：体验编程的乐趣

## 德育目标
培养学生的逻辑思维和创新精神

## 教学重难点
- 重点：掌握Scratch基本操作
- 难点：用程序解决问题的思路

## 学科实践活动设计
### 环节一：情境导入（5分钟）
**实践活动**：展示有趣的Scratch作品
**素养培养**：信息意识

### 环节二：探究学习（15分钟）
**学科实践**：
1. 认识Scratch界面
2. 学习基本模块
3. 尝试编写简单程序

**素养培养**：计算思维

### 环节三：创作实践（15分钟）
设计并实现一个小游戏

### 环节四：展示交流（10分钟）
作品展示与评价

### 环节五：拓展思考（5分钟）
讨论：编程还能解决什么问题？

## 学业质量评价标准
- 优秀：程序设计合理，有创意
- 良好：能独立完成基本程序
- 中等：在指导下能完成程序
- 待提高：初步了解编程概念

## 板书设计
《Scratch编程入门》

📌重点：
- 基本操作
- 程序设计思路

⚠️难点：
- 问题分解
                `.trim(),
                tags: ['信息技术', '编程', '核心素养', '新课标'],
                downloadCount: 82,
                viewCount: 213,
                rating: 4.8,
                createdAt: new Date(Date.now() - 86400000 * 11).toISOString(),
                synced: true
            },
            {
                id: 'shared_12',
                title: '一年级数学 - 认识图形（核心素养导向）',
                author: '黄老师',
                school: '育苗幼儿园',
                region: '城乡结合部',
                subject: 'math',
                grade: '1',
                content: `
# 《认识图形》数学教案 - 核心素养导向

## 核心素养目标
- 数学抽象：认识正方体、长方体、圆柱、球
- 直观想象：通过观察感知图形特征
- 逻辑推理：比较发现图形异同
- 数学建模：用图形描述物体

## 学业表现目标
- 知识层面：能辨认和区分四种立体图形
- 能力层面：能在生活中找到这些图形
- 情感层面：体验数学学习的乐趣

## 德育目标
培养学生观察生活的习惯

## 教学重难点
- 重点：认识四种立体图形
- 难点：区分正方体和长方体

## 学科实践活动设计
### 环节一：游戏导入（5分钟）
**实践活动**：摸盲袋游戏，引出课题
**素养培养**：数学抽象

### 环节二：观察探究（15分钟）
**学科实践**：
1. 观察立体图形
2. 摸一摸、滚一滚
3. 交流发现

**素养培养**：直观想象、逻辑推理

### 环节三：分类活动（10分钟）
将图形分类，说出理由

### 环节四：生活应用（10分钟）
找一找：教室里有哪些立体图形？

### 环节五：总结拓展（5分钟）
用立体图形搭积木

## 学业质量评价标准
- 优秀：能准确辨认所有图形，能举出生活实例
- 良好：能辨认基本图形
- 中等：在指导下能区分图形
- 待提高：初步认识图形名称

## 板书设计
《认识图形》

📌重点：
- 图形辨认
- 特征比较

⚠️难点：
- 正方体与长方体的区分
                `.trim(),
                tags: ['数学', '图形', '核心素养', '新课标', '一年级'],
                downloadCount: 112,
                viewCount: 345,
                rating: 4.9,
                createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
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
