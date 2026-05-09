// 本地AI智能引擎 - 教案活井
// 提供离线可用的教案生成能力，作为AI API的可选增强层

(function(global) {
    'use strict';

    const LocalAIEngine = {
        templates: {
            basic: {
                name: '基础模板',
                icon: '📝',
                sections: ['教学目标', '教学重难点', '教学过程', '板书设计', '作业布置']
            },
            interactive: {
                name: '互动模板',
                icon: '🔄',
                sections: ['教学目标', '教学重难点', '互动环节', '教学活动', '课堂练习', '总结反馈']
            },
            visual: {
                name: '视觉模板',
                icon: '🎨',
                sections: ['教学目标', '教学重难点', '视觉资料', '思维导图', '多媒体应用', '练习设计']
            },
            quiz: {
                name: '测验模板',
                icon: '📋',
                sections: ['教学目标', '教学重难点', '知识点讲解', '课堂测验', '作业布置', '评价标准']
            },
            flipped: {
                name: '翻转课堂',
                icon: '🔄',
                sections: ['课前任务', '教学目标', '重难点分析', '课堂活动', '知识内化', '总结提升']
            },
            project: {
                name: '项目式学习',
                icon: '🎯',
                sections: ['项目背景', '学习目标', '任务分解', '实施过程', '成果展示', '评价反思']
            },
            situational: {
                name: '情境教学',
                icon: '🎭',
                sections: ['情境创设', '教学目标', '情境分析', '情境体验', '情境迁移', '总结反思']
            },
            differentiated: {
                name: '分层教学',
                icon: '📊',
                sections: ['学情分析', '教学目标', '分层任务', '分层指导', '分层评价', '总结反馈']
            },
            gamification: {
                name: '游戏化教学',
                icon: '🎮',
                sections: ['游戏设计', '教学目标', '规则说明', '游戏过程', '积分系统', '总结评价']
            },
            inquiry: {
                name: '探究式学习',
                icon: '🔍',
                sections: ['问题提出', '猜想假设', '设计方案', '实施探究', '得出结论', '交流反思']
            },
            interdisciplinary: {
                name: '跨学科融合',
                icon: '🌐',
                sections: ['主题确定', '学科融合点', '教学目标', '跨学科活动', '成果展示', '综合评价']
            },
            experimental: {
                name: '实验教学',
                icon: '🔬',
                sections: ['实验目的', '实验原理', '实验器材', '实验步骤', '数据记录', '结论分析']
            }
        },

        subjectProfiles: {
            chinese: {
                name: '语文',
                characteristics: '重视阅读理解、古诗词、作文写作',
                keyMethods: ['朗读法', '品词析句', '阅读理解', '写作指导'],
                activities: ['朗读比赛', '角色扮演', '小组讨论', '写作工作坊']
            },
            math: {
                name: '数学',
                characteristics: '重视逻辑思维、计算能力、问题解决',
                keyMethods: ['启发式教学', '数形结合', '变式训练', '合作探究'],
                activities: ['计算竞赛', '数学游戏', '动手操作', '实际问题解决']
            },
            english: {
                name: '英语',
                characteristics: '重视听说读写、语境理解、交际能力',
                keyMethods: ['情境教学', '任务型教学', '听说领先', '读写跟进'],
                activities: ['对话练习', '角色扮演', '口语展示', '阅读理解']
            },
            science: {
                name: '科学',
                characteristics: '重视观察实验、探究能力、科学素养',
                keyMethods: ['实验探究', '观察记录', '猜想验证', '科学推理'],
                activities: ['科学实验', '观察日记', '小组探究', '科学展示']
            },
            moral: {
                name: '道德与法治',
                characteristics: '重视品德教育、法治意识、情感体验',
                keyMethods: ['情境体验', '案例分析', '讨论辨析', '实践践行'],
                activities: ['道德两难讨论', '案例分析', '角色扮演', '实践活动']
            },
            history: {
                name: '历史',
                characteristics: '重视时空观念、历史解释、家国情怀',
                keyMethods: ['史料研习', '时空定位', '历史比较', '叙事讲述'],
                activities: ['史料分析', '时间轴制作', '角色扮演', '历史辩论']
            },
            geography: {
                name: '地理',
                characteristics: '重视区域认知、综合思维、地理实践',
                keyMethods: ['地图分析', '区域比较', '综合分析', '野外考察'],
                activities: ['地图绘制', '区域调研', '气候分析', '人口统计']
            },
            music: {
                name: '音乐',
                characteristics: '重视审美体验、艺术表现、文化理解',
                keyMethods: ['聆听体验', '演唱演奏', '创编表现', '合作表演'],
                activities: ['合唱练习', '乐器演奏', '音乐欣赏', '创作表演']
            },
            art: {
                name: '美术',
                characteristics: '重视视觉审美、造型表现、创意实践',
                keyMethods: ['观察欣赏', '技法训练', '创意表现', '评价反思'],
                activities: ['写生活动', '手工制作', '作品欣赏', '创意比赛']
            },
            pe: {
                name: '体育与健康',
                characteristics: '重视体能训练、运动技能、健康意识',
                keyMethods: ['示范讲解', '分解练习', '游戏竞赛', '安全教育'],
                activities: ['体能训练', '技能练习', '体育游戏', '健康知识']
            },
            it: {
                name: '信息技术',
                characteristics: '重视信息素养、技术应用、创新思维',
                keyMethods: ['任务驱动', '操作演示', '自主探究', '协作学习'],
                activities: ['作品创作', '编程练习', '网络应用', '作品展示']
            },
            other: {
                name: '其他',
                characteristics: '综合性教学',
                keyMethods: ['讲授法', '讨论法', '演示法', '实践法'],
                activities: ['知识讲解', '课堂讨论', '实践操作', '总结反馈']
            }
        },

        gradeProfiles: {
            1: { name: '一年级', attention: '10-15分钟', interaction: '高', difficulty: '基础' },
            2: { name: '二年级', attention: '15-20分钟', interaction: '高', difficulty: '基础' },
            3: { name: '三年级', attention: '15-20分钟', interaction: '中高', difficulty: '中等' },
            4: { name: '四年级', attention: '20-25分钟', interaction: '中高', difficulty: '中等' },
            5: { name: '五年级', attention: '20-25分钟', interaction: '中等', difficulty: '较难' },
            6: { name: '六年级', attention: '25-30分钟', interaction: '中等', difficulty: '较难' }
        },

        versionProfiles: {
            pep: { name: '人教版', features: '全国通用，体系完整' },
            moe: { name: '部编版', features: '国家统编，注重基础' },
            bsd: { name: '北师大版', features: '理念先进，注重探究' },
            hs: { name: '沪教版', features: '海派风格，灵活开放' },
            universal: { name: '通用版', features: '兼容性强，适应广泛' }
        },

        generateLessonPlan: function(options) {
            const { subject, grade, topic, version = 'universal', content = '', template = 'basic' } = options;
            
            const subjectInfo = this.subjectProfiles[subject] || this.subjectProfiles.other;
            const gradeInfo = this.gradeProfiles[grade] || this.gradeProfiles[1];
            const versionInfo = this.versionProfiles[version] || this.versionProfiles.universal;
            const templateInfo = this.templates[template] || this.templates.basic;

            let planHTML = `
                <div style="font-family: 'Microsoft YaHei', Arial, sans-serif; line-height: 1.8; color: #2d3748;">
                    <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; text-align: center;">
                        <h2 style="margin: 0 0 0.5rem 0; font-size: 1.75rem;">${topic}</h2>
                        <p style="margin: 0; opacity: 0.9; font-size: 0.95rem;">
                            ${subjectInfo.name} · ${gradeInfo.name} · ${versionInfo.name}
                        </p>
                        <div style="margin-top: 1rem;">
                            <span style="background: rgba(255,255,255,0.2); padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.85rem; margin: 0 0.25rem;">
                                ${templateInfo.icon} ${templateInfo.name}
                            </span>
                        </div>
                    </div>
            `;

            if (templateInfo.sections.includes('教学目标')) {
                planHTML += this.generateTeachingObjectives(subjectInfo, topic);
            }
            
            if (templateInfo.sections.includes('教学重难点')) {
                planHTML += this.generateKeyPoints(subjectInfo, topic, gradeInfo);
            }

            if (templateInfo.sections.includes('教学过程')) {
                planHTML += this.generateTeachingProcess(subjectInfo, gradeInfo, topic);
            }

            if (templateInfo.sections.includes('板书设计')) {
                planHTML += this.generateBlackboardDesign(topic, subjectInfo);
            }

            if (templateInfo.sections.includes('作业布置')) {
                planHTML += this.generateHomework(topic, grade);
            }

            if (templateInfo.sections.includes('互动环节')) {
                planHTML += this.generateInteractiveSection(subjectInfo, topic);
            }

            if (templateInfo.sections.includes('情境创设') || templateInfo.sections.includes('问题提出')) {
                planHTML += this.generateSituationalSetup(subjectInfo, topic);
            }

            if (templateInfo.sections.includes('课堂练习') || templateInfo.sections.includes('探究活动')) {
                planHTML += this.generateClassPractice(subjectInfo, topic, grade);
            }

            if (templateInfo.sections.includes('总结反馈')) {
                planHTML += this.generateSummary(topic);
            }

            if (content) {
                planHTML += `
                    <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem;">
                        <h4 style="color: #1e40af; margin: 0 0 0.75rem 0;">📋 教师补充要求</h4>
                        <p style="margin: 0; color: #1e3a8a;">${content}</p>
                    </div>
                `;
            }

            planHTML += `
                    <div style="margin-top: 2rem; padding: 1.5rem; background: #f7fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
                        <h4 style="color: #4a5568; margin: 0 0 1rem 0;">💡 教学建议</h4>
                        <ul style="margin: 0; padding-left: 1.5rem; color: #718096;">
                            <li>注意控制课堂节奏，学生注意力集中时间约 ${gradeInfo.attention}</li>
                            <li>增加师生互动，提高学生参与度</li>
                            <li>结合生活实际，帮助学生理解抽象概念</li>
                            <li>及时反馈，鼓励为主，激发学习兴趣</li>
                        </ul>
                    </div>
                </div>
            `;

            return Promise.resolve({ content: planHTML });
        },

        generateTeachingObjectives: function(subjectInfo, topic) {
            return `
                <div style="background: white; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">🎯</span>
                        教学目标
                    </h3>
                    <div style="display: grid; gap: 1rem;">
                        <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                            <span style="background: #dcfce7; color: #16a34a; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">知</span>
                            <div>
                                <strong style="color: #166534;">知识与技能</strong>
                                <p style="margin: 0.25rem 0 0 0; color: #4a5568;">学生能够掌握${topic}的基本概念，理解其核心要点，并能够正确运用。</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                            <span style="background: #fef3c7; color: #d97706; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">能</span>
                            <div>
                                <strong style="color: #92400e;">过程与方法</strong>
                                <p style="margin: 0.25rem 0 0 0; color: #4a5568;">通过${subjectInfo.characteristics}，培养学生的观察、分析和表达能力。</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                            <span style="background: #e0e7ff; color: #4f46e5; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">情</span>
                            <div>
                                <strong style="color: #3730a3;">情感态度与价值观</strong>
                                <p style="margin: 0.25rem 0 0 0; color: #4a5568;">激发学生对${topic}的学习兴趣，培养良好的学习习惯和探究精神。</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        generateKeyPoints: function(subjectInfo, topic, gradeInfo) {
            return `
                <div style="background: white; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">⚡</span>
                        教学重难点
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1.25rem; border-radius: 8px;">
                            <h4 style="color: #92400e; margin: 0 0 0.5rem 0; font-size: 1rem;">📌 教学重点</h4>
                            <p style="margin: 0; color: #78350f; font-size: 0.95rem;">
                                ${topic}的核心概念及其基本运用
                            </p>
                        </div>
                        <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); padding: 1.25rem; border-radius: 8px;">
                            <h4 style="color: #9d174d; margin: 0 0 0.5rem 0; font-size: 1rem;">🔒 教学难点</h4>
                            <p style="margin: 0; color: #831843; font-size: 0.95rem;">
                                ${topic}在实际问题中的应用与迁移
                            </p>
                        </div>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: #f7fafc; border-radius: 8px;">
                        <h4 style="color: #4a5568; margin: 0 0 0.5rem 0; font-size: 0.95rem;">💡 突破策略</h4>
                        <p style="margin: 0; color: #718096; font-size: 0.9rem;">
                            采用由浅入深、循序渐进的方式，结合${subjectInfo.characteristics}，通过具体实例帮助学生理解抽象概念。
                        </p>
                    </div>
                </div>
            `;
        },

        generateTeachingProcess: function(subjectInfo, gradeInfo, topic) {
            const duration = gradeInfo.attention.replace('-', '~');
            return `
                <div style="background: white; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">📖</span>
                        教学过程
                    </h3>
                    <div style="position: relative; padding-left: 2rem;">
                        <div style="position: absolute; left: 0.6rem; top: 0; bottom: 0; width: 2px; background: #e2e8f0;"></div>
                        
                        <div style="position: relative; margin-bottom: 1.5rem;">
                            <div style="position: absolute; left: -1.4rem; width: 24px; height: 24px; background: #4f46e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; font-weight: bold;">1</div>
                            <div style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); padding: 1rem; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <h4 style="color: #4f46e5; margin: 0; font-size: 1rem;">🏃 导入新课（5分钟）</h4>
                                </div>
                                <p style="margin: 0; color: #4a5568; font-size: 0.9rem;">
                                    通过${subjectInfo.activities[0]}引入课题，激发学生学习兴趣，自然过渡到${topic}的学习。
                                </p>
                            </div>
                        </div>
                        
                        <div style="position: relative; margin-bottom: 1.5rem;">
                            <div style="position: absolute; left: -1.4rem; width: 24px; height: 24px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; font-weight: bold;">2</div>
                            <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 1rem; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <h4 style="color: #7c3aed; margin: 0; font-size: 1rem;">📚 讲授新知（15分钟）</h4>
                                </div>
                                <p style="margin: 0; color: #4a5568; font-size: 0.9rem;">
                                    讲解${topic}的基本概念和核心内容，运用${subjectInfo.keyMethods[0]}，结合教材和生活实例，帮助学生理解。
                                </p>
                                <div style="margin-top: 0.75rem; padding: 0.75rem; background: white; border-radius: 6px;">
                                    <p style="margin: 0; color: #6b7280; font-size: 0.85rem;"><strong>教师活动：</strong>讲解示范 → <strong>学生活动：</strong>认真听讲、积极思考</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style="position: relative; margin-bottom: 1.5rem;">
                            <div style="position: absolute; left: -1.4rem; width: 24px; height: 24px; background: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; font-weight: bold;">3</div>
                            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 1rem; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <h4 style="color: #059669; margin: 0; font-size: 1rem;">🤝 合作探究（10分钟）</h4>
                                </div>
                                <p style="margin: 0; color: #4a5568; font-size: 0.9rem;">
                                    组织学生进行${subjectInfo.activities[2]}，通过小组讨论和合作学习，深化对${topic}的理解。
                                </p>
                                <div style="margin-top: 0.75rem; padding: 0.75rem; background: white; border-radius: 6px;">
                                    <p style="margin: 0; color: #6b7280; font-size: 0.85rem;"><strong>教师活动：</strong>巡视指导 → <strong>学生活动：</strong>小组讨论、代表发言</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style="position: relative; margin-bottom: 1.5rem;">
                            <div style="position: absolute; left: -1.4rem; width: 24px; height: 24px; background: #d97706; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; font-weight: bold;">4</div>
                            <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); padding: 1rem; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <h4 style="color: #d97706; margin: 0; font-size: 1rem;">✏️ 巩固练习（10分钟）</h4>
                                </div>
                                <p style="margin: 0; color: #4a5568; font-size: 0.9rem;">
                                    完成课堂练习，通过${subjectInfo.activities[1]}检验学生对${topic}的掌握情况，及时发现问题并纠正。
                                </p>
                                <div style="margin-top: 0.75rem; padding: 0.75rem; background: white; border-radius: 6px;">
                                    <p style="margin: 0; color: #6b7280; font-size: 0.85rem;"><strong>教师活动：</strong>个别辅导 → <strong>学生活动：</strong>独立完成、互评互助</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style="position: relative;">
                            <div style="position: absolute; left: -1.4rem; width: 24px; height: 24px; background: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; font-weight: bold;">5</div>
                            <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 1rem; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <h4 style="color: #dc2626; margin: 0; font-size: 1rem;">📝 课堂总结（5分钟）</h4>
                                </div>
                                <p style="margin: 0; color: #4a5568; font-size: 0.9rem;">
                                    引导学生回顾本节内容，总结${topic}的要点，布置课后作业，预告下节课内容。
                                </p>
                                <div style="margin-top: 0.75rem; padding: 0.75rem; background: white; border-radius: 6px;">
                                    <p style="margin: 0; color: #6b7280; font-size: 0.85rem;"><strong>教师活动：</strong>梳理总结 → <strong>学生活动：</strong>畅谈收获、提出疑问</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        generateBlackboardDesign: function(topic, subjectInfo) {
            return `
                <div style="background: white; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">📝</span>
                        板书设计
                    </h3>
                    <div style="background: #f7fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; min-height: 200px;">
                        <div style="text-align: center; border-bottom: 2px solid #4f46e5; padding-bottom: 0.75rem; margin-bottom: 1rem;">
                            <strong style="font-size: 1.1rem; color: #2d3748;">《${topic}》</strong>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <h4 style="color: #4f46e5; margin: 0 0 0.5rem 0; font-size: 0.95rem; text-decoration: underline;">📌 重点</h4>
                                <ul style="margin: 0; padding-left: 1.25rem; color: #4a5568; font-size: 0.9rem;">
                                    <li>核心概念</li>
                                    <li>基本原理</li>
                                    <li>关键方法</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="color: #dc2626; margin: 0 0 0.5rem 0; font-size: 0.95rem; text-decoration: underline;">⚠️ 难点</h4>
                                <ul style="margin: 0; padding-left: 1.25rem; color: #4a5568; font-size: 0.9rem;">
                                    <li>应用迁移</li>
                                    <li>综合分析</li>
                                    <li>拓展延伸</li>
                                </ul>
                            </div>
                        </div>
                        <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px dashed #cbd5e0;">
                            <p style="margin: 0; color: #718096; font-size: 0.85rem; text-align: center;">
                                💡 ${subjectInfo.keyMethods[0]} · 注重师生互动 · 当堂消化
                            </p>
                        </div>
                    </div>
                </div>
            `;
        },

        generateHomework: function(topic, grade) {
            return `
                <div style="background: white; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">📚</span>
                        作业布置
                    </h3>
                    <div style="display: grid; gap: 1rem;">
                        <div style="background: #f7fafc; padding: 1rem; border-radius: 8px; border-left: 4px solid #4f46e5;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <span style="background: #4f46e5; color: white; width: 20px; height: 20px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem;">1</span>
                                <strong style="color: #2d3748;">基础巩固</strong>
                            </div>
                            <p style="margin: 0; color: #4a5568; font-size: 0.9rem;">
                                完成教材相关练习题，复习巩固${topic}的基础知识。
                            </p>
                        </div>
                        <div style="background: #f7fafc; padding: 1rem; border-radius: 8px; border-left: 4px solid #7c3aed;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <span style="background: #7c3aed; color: white; width: 20px; height: 20px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem;">2</span>
                                <strong style="color: #2d3748;">能力提升</strong>
                            </div>
                            <p style="margin: 0; color: #4a5568; font-size: 0.9rem;">
                                收集生活中与${topic}相关的实例，尝试进行分析说明。
                            </p>
                        </div>
                        <div style="background: #fffbeb; padding: 1rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <span style="background: #f59e0b; color: white; width: 20px; height: 20px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem;">⭐</span>
                                <strong style="color: #2d3748;">拓展挑战（选做）</strong>
                            </div>
                            <p style="margin: 0; color: #4a5568; font-size: 0.9rem;">
                                思考${topic}与相关知识的联系，绘制知识思维导图。
                            </p>
                        </div>
                    </div>
                </div>
            `;
        },

        generateInteractiveSection: function(subjectInfo, topic) {
            return `
                <div style="background: white; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">🔄</span>
                        互动环节设计
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 1rem; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎮</div>
                            <h4 style="color: #1e40af; margin: 0 0 0.5rem 0; font-size: 0.95rem;">${subjectInfo.activities[1]}</h4>
                            <p style="margin: 0; color: #1e3a8a; font-size: 0.85rem;">通过游戏方式激发兴趣</p>
                        </div>
                        <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 1rem; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">👥</div>
                            <h4 style="color: #166534; margin: 0 0 0.5rem 0; font-size: 0.95rem;">${subjectInfo.activities[2]}</h4>
                            <p style="margin: 0; color: #14532d; font-size: 0.85rem;">小组合作共同探究</p>
                        </div>
                        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1rem; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎭</div>
                            <h4 style="color: #92400e; margin: 0 0 0.5rem 0; font-size: 0.95rem;">角色扮演</h4>
                            <p style="margin: 0; color: #78350f; font-size: 0.85rem;">情境模拟深入体验</p>
                        </div>
                    </div>
                </div>
            `;
        },

        generateSituationalSetup: function(subjectInfo, topic) {
            return `
                <div style="background: white; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">🎭</span>
                        情境创设
                    </h3>
                    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1.25rem; border-radius: 8px; margin-bottom: 1rem;">
                        <p style="margin: 0; color: #78350f; font-size: 0.95rem; line-height: 1.6;">
                            <strong>情境描述：</strong>教师通过多媒体展示或实物演示，创设一个与${topic}相关的真实情境，
                            引导学生观察、思考，激发学习兴趣，为后续教学做好铺垫。
                        </p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
                        <div>
                            <div style="background: #fee2e2; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem; font-size: 1.5rem;">👀</div>
                            <p style="margin: 0; color: #991b1b; font-size: 0.85rem;">观察感知</p>
                        </div>
                        <div>
                            <div style="background: #fef3c7; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem; font-size: 1.5rem;">🤔</div>
                            <p style="margin: 0; color: #92400e; font-size: 0.85rem;">思考疑问</p>
                        </div>
                        <div>
                            <div style="background: #dbeafe; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem; font-size: 1.5rem;">💡</div>
                            <p style="margin: 0; color: #1e40af; font-size: 0.85rem;">提出问题</p>
                        </div>
                    </div>
                </div>
            `;
        },

        generateClassPractice: function(subjectInfo, topic, grade) {
            return `
                <div style="background: white; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">✏️</span>
                        课堂练习
                    </h3>
                    <div style="display: grid; gap: 0.75rem;">
                        <div style="background: #f7fafc; padding: 1rem; border-radius: 8px; display: flex; align-items: center; gap: 1rem;">
                            <span style="background: #4f46e5; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</span>
                            <span style="color: #4a5568; font-size: 0.9rem;">基础练习：完成教材P__第__题</span>
                        </div>
                        <div style="background: #f7fafc; padding: 1rem; border-radius: 8px; display: flex; align-items: center; gap: 1rem;">
                            <span style="background: #7c3aed; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</span>
                            <span style="color: #4a5568; font-size: 0.9rem;">变式练习：尝试解决生活中的${topic}问题</span>
                        </div>
                        <div style="background: #fef3c7; padding: 1rem; border-radius: 8px; display: flex; align-items: center; gap: 1rem;">
                            <span style="background: #f59e0b; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">⭐</span>
                            <span style="color: #92400e; font-size: 0.9rem;">拓展挑战：${grade > 3 ? '综合运用所学知识解决问题' : '用自己喜欢的方式表达对知识的理解'}</span>
                        </div>
                    </div>
                </div>
            `;
        },

        generateSummary: function(topic) {
            return `
                <div style="background: white; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">📌</span>
                        课堂总结
                    </h3>
                    <div style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); padding: 1.25rem; border-radius: 8px;">
                        <h4 style="color: #4f46e5; margin: 0 0 1rem 0; font-size: 1rem;">🎯 本节要点回顾</h4>
                        <ul style="margin: 0; padding-left: 1.5rem; color: #4a5568; line-height: 2;">
                            <li>${topic}的核心概念是什么？</li>
                            <li>学习${topic}的主要方法有哪些？</li>
                            <li>${topic}在实际生活中有哪些应用？</li>
                        </ul>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: #f7fafc; border-radius: 8px;">
                        <h4 style="color: #4a5568; margin: 0 0 0.5rem 0; font-size: 0.95rem;">📊 评价方式</h4>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.85rem;">自评</span>
                            <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.85rem;">互评</span>
                            <span style="background: #fef3c7; color: #92400e; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.85rem;">师评</span>
                        </div>
                    </div>
                </div>
            `;
        },

        generateQuiz: function(options) {
            const { topic, subject, grade, difficulty = 'medium', questionTypes = ['choice', 'fill', 'short'] } = options;
            const subjectInfo = this.subjectProfiles[subject] || this.subjectProfiles.other;
            const gradeInfo = this.gradeProfiles[grade] || this.gradeProfiles['1'];
            
            const difficultyConfig = {
                easy: { label: '基础', color: '#10b981', bg: '#dcfce7' },
                medium: { label: '中等', color: '#f59e0b', bg: '#fef3c7' },
                hard: { label: '拓展', color: '#ef4444', bg: '#fee2e2' }
            };
            
            const difficultyInfo = difficultyConfig[difficulty] || difficultyConfig.medium;
            
            let quizHTML = `
                <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h3 style="color: #4f46e5; margin: 0; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="background: #e0e7ff; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem;">📝</span>
                            配套练习题
                        </h3>
                        <span style="background: ${difficultyInfo.bg}; color: ${difficultyInfo.color}; padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                            ${difficultyInfo.label}难度
                        </span>
                    </div>
            `;
            
            let questionNumber = 1;
            
            if (questionTypes.includes('choice')) {
                quizHTML += this.generateChoiceQuestions(topic, subjectInfo, difficulty, questionNumber);
                questionNumber += 4;
            }
            
            if (questionTypes.includes('fill')) {
                quizHTML += this.generateFillQuestions(topic, subjectInfo, questionNumber);
                questionNumber += 3;
            }
            
            if (questionTypes.includes('short')) {
                quizHTML += this.generateShortAnswerQuestions(topic, subjectInfo, questionNumber);
            }
            
            quizHTML += `
                    <div style="margin-top: 1.5rem; padding: 1rem; background: #f7fafc; border-radius: 8px;">
                        <h4 style="color: #4a5568; margin: 0 0 0.5rem 0; font-size: 0.95rem;">💡 答题提示</h4>
                        <p style="margin: 0; color: #718096; font-size: 0.85rem;">
                            ${gradeInfo.attention}注意力集中时间，建议分批次完成练习。
                        </p>
                    </div>
                </div>
            `;
            
            return quizHTML;
        },

        generateChoiceQuestions: function(topic, subjectInfo, difficulty, startNum) {
            const count = 4;
            let questionsHTML = `
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: #7c3aed; margin: 0 0 1rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #f3e8ff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">☑</span>
                        选择题（共${count}题）
                    </h4>
            `;
            
            for (let i = 0; i < count; i++) {
                const qNum = startNum + i;
                const isCorrect = i === 0;
                const options = [
                    { text: `A. ${topic}的核心概念`, correct: isCorrect },
                    { text: `B. ${topic}的应用原则`, correct: !isCorrect },
                    { text: `C. ${topic}的历史背景`, correct: !isCorrect },
                    { text: `D. ${topic}的发展趋势`, correct: !isCorrect }
                ];
                
                questionsHTML += `
                    <div style="background: #f7fafc; padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem; border-left: 3px solid #7c3aed;">
                        <p style="margin: 0 0 0.75rem 0; color: #2d3748; font-weight: 600;">
                            ${qNum}. 关于${topic}的说法，正确的是：
                        </p>
                        <div style="display: grid; gap: 0.5rem;">
                            ${options.map(opt => `
                                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: white; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                                    <input type="radio" name="q${qNum}" style="accent-color: #7c3aed;">
                                    <span style="color: #4a5568; font-size: 0.9rem;">${opt.text}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            
            questionsHTML += `</div>`;
            return questionsHTML;
        },

        generateFillQuestions: function(topic, subjectInfo, startNum) {
            const count = 3;
            let questionsHTML = `
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: #059669; margin: 0 0 1rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #dcfce7; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">✏</span>
                        填空题（共${count}题）
                    </h4>
            `;
            
            const fillQuestions = [
                `${topic}的三个核心要素是：_____、_____、_____。`,
                `在学习${topic}时，我们应该特别注意_____这个环节。`,
                `${topic}与${subjectInfo.name}学科的结合点在于_____。`
            ];
            
            for (let i = 0; i < count; i++) {
                const qNum = startNum + i;
                questionsHTML += `
                    <div style="background: #f7fafc; padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem; border-left: 3px solid #059669;">
                        <p style="margin: 0; color: #2d3748; font-weight: 600;">
                            ${qNum}. ${fillQuestions[i]}
                        </p>
                        <div style="margin-top: 0.75rem;">
                            <input type="text" placeholder="请在此处作答..." style="width: 100%; padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 6px; font-size: 0.9rem;">
                        </div>
                    </div>
                `;
            }
            
            questionsHTML += `</div>`;
            return questionsHTML;
        },

        generateShortAnswerQuestions: function(topic, subjectInfo, startNum) {
            const count = 2;
            let questionsHTML = `
                <div style="margin-bottom: 1rem;">
                    <h4 style="color: #d97706; margin: 0 0 1rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #fef3c7; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">📄</span>
                        简答题（共${count}题）
                    </h4>
            `;
            
            const shortQuestions = [
                `请结合实际例子，说明${topic}在生活中的应用场景。`,
                `${subjectInfo.name}学科中，${topic}与其他知识点有什么联系？请举例说明。`
            ];
            
            for (let i = 0; i < count; i++) {
                const qNum = startNum + i;
                questionsHTML += `
                    <div style="background: #f7fafc; padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem; border-left: 3px solid #d97706;">
                        <p style="margin: 0 0 0.75rem 0; color: #2d3748; font-weight: 600;">
                            ${qNum}. ${shortQuestions[i]}
                        </p>
                        <div style="margin-top: 0.75rem;">
                            <textarea placeholder="请在此作答..." style="width: 100%; min-height: 80px; padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 6px; font-size: 0.9rem; resize: vertical;"></textarea>
                        </div>
                    </div>
                `;
            }
            
            questionsHTML += `</div>`;
            return questionsHTML;
        },

        generateDifferentiatedTeaching: function(options) {
            const { topic, subject, grade } = options;
            const subjectInfo = this.subjectProfiles[subject] || this.subjectProfiles.other;
            const gradeInfo = this.gradeProfiles[grade] || this.gradeProfiles['1'];
            
            const levels = [
                {
                    name: '基础层',
                    icon: '🌱',
                    color: '#10b981',
                    bg: '#dcfce7',
                    target: '基础薄弱学生',
                    description: '夯实基础，确保掌握核心概念'
                },
                {
                    name: '标准层',
                    icon: '🌿',
                    color: '#3b82f6',
                    bg: '#dbeafe',
                    target: '中等水平学生',
                    description: '巩固提升，能够灵活运用知识'
                },
                {
                    name: '拓展层',
                    icon: '🌳',
                    color: '#8b5cf6',
                    bg: '#ede9fe',
                    target: '学优生',
                    description: '挑战自我，培养创新思维'
                }
            ];
            
            let differentiatedHTML = `
                <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1.5rem 0; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem;">📊</span>
                        分层教学设计
                    </h3>
                    
                    <div style="background: #fef3c7; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b;">
                        <p style="margin: 0; color: #92400e; font-size: 0.9rem;">
                            <strong>💡 设计理念：</strong>根据学生个体差异，提供差异化学习内容，实现"保底不封顶"的教学目标。
                        </p>
                    </div>
                    
                    <div style="display: grid; gap: 1rem;">
            `;
            
            levels.forEach((level, index) => {
                differentiatedHTML += `
                    <div style="background: ${level.bg}; border-radius: 12px; padding: 1.25rem; border-left: 4px solid ${level.color};">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <span style="font-size: 1.75rem;">${level.icon}</span>
                                <div>
                                    <h4 style="margin: 0; color: ${level.color}; font-size: 1.1rem;">${level.name}</h4>
                                    <p style="margin: 0.25rem 0 0 0; color: #718096; font-size: 0.85rem;">${level.target}</p>
                                </div>
                            </div>
                            <span style="background: white; color: ${level.color}; padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                                ${index === 0 ? '10-15分钟' : index === 1 ? '15-20分钟' : '20-25分钟'}
                            </span>
                        </div>
                        
                        <p style="margin: 0 0 1rem 0; color: #4a5568; font-size: 0.9rem;">
                            <strong>目标：</strong>${level.description}
                        </p>
                        
                        <div style="background: white; padding: 1rem; border-radius: 8px;">
                            <h5 style="margin: 0 0 0.75rem 0; color: #2d3748; font-size: 0.95rem;">📋 学习任务</h5>
                            <ul style="margin: 0; padding-left: 1.25rem; color: #4a5568; font-size: 0.85rem; line-height: 1.8;">
                                ${this.getLevelTasks(topic, subjectInfo, index)}
                            </ul>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                            <div style="background: white; padding: 0.75rem; border-radius: 8px;">
                                <h5 style="margin: 0 0 0.5rem 0; color: #059669; font-size: 0.85rem;">✓ 支持策略</h5>
                                <p style="margin: 0; color: #718096; font-size: 0.8rem;">${this.getSupportStrategy(topic, index)}</p>
                            </div>
                            <div style="background: white; padding: 0.75rem; border-radius: 8px;">
                                <h5 style="margin: 0 0 0.5rem 0; color: #dc2626; font-size: 0.85rem;">⚡ 评价标准</h5>
                                <p style="margin: 0; color: #718096; font-size: 0.8rem;">${this.getEvaluationCriteria(index)}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            differentiatedHTML += `
                    </div>
                    
                    <div style="margin-top: 1.5rem; padding: 1rem; background: #f7fafc; border-radius: 8px;">
                        <h4 style="color: #4a5568; margin: 0 0 0.5rem 0; font-size: 0.95rem;">🎯 实施建议</h4>
                        <ul style="margin: 0; padding-left: 1.25rem; color: #718096; font-size: 0.85rem; line-height: 1.8;">
                            <li>课前进行学情诊断，明确学生所在层次</li>
                            <li>分层任务差异化，课堂巡视时重点关注基础层学生</li>
                            <li>鼓励高层级学生担任"小助教"，实现生生互助</li>
                            <li>课后作业分层布置，保护不同层次学生的学习积极性</li>
                        </ul>
                    </div>
                </div>
            `;
            
            return differentiatedHTML;
        },

        getLevelTasks: function(topic, subjectInfo, level) {
            const tasks = [
                [
                    `熟读${topic}相关内容，划出重点词句`,
                    `能用自己的话说出${topic}的基本含义`,
                    `完成教材后的基础练习（1-3题）`,
                    `背诵${topic}的核心定义`
                ],
                [
                    `理解${topic}的内涵，能够举例说明`,
                    `运用${subjectInfo.keyMethods[0]}分析${topic}`,
                    `完成教材后的全部练习`,
                    `尝试解决与${topic}相关的实际问题`
                ],
                [
                    `深入探究${topic}的深层含义`,
                    `分析${topic}与相关知识点的联系`,
                    `完成拓展练习题，挑战高难度问题`,
                    `尝试将${topic}应用到新情境中`
                ]
            ];
            return tasks[level].map(task => `<li style="margin-bottom: 0.35rem;">${task}</li>`).join('');
        },

        getSupportStrategy: function(topic, level) {
            const strategies = [
                '教师重点讲解，同学互助',
                '标准讲解+适当拓展',
                '自主探究+挑战任务'
            ];
            return strategies[level];
        },

        getEvaluationCriteria: function(level) {
            const criteria = [
                '正确率≥60%',
                '正确率≥80%',
                '创新性+正确率'
            ];
            return criteria[level];
        },

        generateLearningAnalysis: function(options) {
            const { topic, subject, grade } = options;
            const subjectInfo = this.subjectProfiles[subject] || this.subjectProfiles.other;
            const gradeInfo = this.gradeProfiles[grade] || this.gradeProfiles['1'];
            
            const commonMisconceptions = [
                `容易混淆${topic}与相似概念的区别`,
                `对${topic}的理解停留在表面`,
                `无法将${topic}与实际应用联系起来`
            ];
            
            const priorKnowledge = [
                `${subjectInfo.name}学科基础知识`,
                `${gradeInfo.name}学生认知发展水平`,
                `日常生活中的相关经验`
            ];
            
            let analysisHTML = `
                <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                    <h3 style="color: #4f46e5; margin: 0 0 1.5rem 0; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: #e0e7ff; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem;">🔍</span>
                        学情分析报告
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div>
                            <h4 style="color: #059669; margin: 0 0 1rem 0; font-size: 1.1rem;">📚 先备知识</h4>
                            <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px;">
                                <ul style="margin: 0; padding-left: 1.25rem; color: #4a5568; font-size: 0.9rem; line-height: 2;">
                                    ${priorKnowledge.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div>
                            <h4 style="color: #dc2626; margin: 0 0 1rem 0; font-size: 1.1rem;">⚠️ 常见误区</h4>
                            <div style="background: #fef2f2; padding: 1rem; border-radius: 8px;">
                                <ul style="margin: 0; padding-left: 1.25rem; color: #4a5568; font-size: 0.9rem; line-height: 2;">
                                    ${commonMisconceptions.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 1.5rem;">
                        <h4 style="color: #7c3aed; margin: 0 0 1rem 0; font-size: 1.1rem;">🎯 学习路径推荐</h4>
                        <div style="background: #faf5ff; padding: 1rem; border-radius: 8px;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                <span style="background: #4f46e5; color: white; padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.85rem;">1. 复习先备知识</span>
                                <span style="color: #a0aec0;">→</span>
                                <span style="background: #7c3aed; color: white; padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.85rem;">2. 情境导入</span>
                                <span style="color: #a0aec0;">→</span>
                                <span style="background: #059669; color: white; padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.85rem;">3. 概念讲解</span>
                                <span style="color: #a0aec0;">→</span>
                                <span style="background: #d97706; color: white; padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.85rem;">4. 练习巩固</span>
                                <span style="color: #a0aec0;">→</span>
                                <span style="background: #dc2626; color: white; padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.85rem;">5. 总结提升</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            return analysisHTML;
        }
    };

    global.LocalAIEngine = LocalAIEngine;

})(window);
