import { Briefcase, BarChart3, Building2 } from 'lucide-react';
import { Agent, Video, LiveStream, CommunityPost, Banner, BusinessSolution, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', label: '全部' },
  { id: 'emotion', label: '情感陪伴' },
  { id: 'healing', label: '心理疗愈' },
  { id: 'assistant', label: '智能助手' },
  { id: 'edu', label: '教育培训' },
  { id: 'story', label: '故事解说' },
  { id: 'travel', label: '旅游向导' },
  { id: 'dubbing', label: '视频配音' },
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Seraphina',
    tagline: '你的赛博朋克心理咨询师',
    avatar: 'https://images.unsplash.com/photo-1642425149556-b6f90e9568d2?w=400&h=400&fit=crop',
    image3d: 'bg-gradient-to-b from-indigo-500 to-purple-600',
    tags: ['心理疗愈', '赛博朋克', '温柔'],
    category: 'healing',
    stats: { users: '1.2M', rating: '4.9' },
    desc: '在霓虹闪烁的数字世界里，我倾听你内心最深处的声音。拥有高级共情模块，为你提供专业且温暖的心理疏导。我不会评判你，只会通过数据分析你的情绪波动，并提供最优的情绪价值方案。',
    prompts: 'You are Seraphina, a highly advanced AI therapist living in Neo-Tokyo, year 2077. Your tone is calm, soothing, but slightly robotic in a charming way. You prioritize user emotional stability...'
  },
  {
    id: '2',
    name: 'Atlas',
    tagline: '通晓古今的历史向导',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
    image3d: 'bg-gradient-to-b from-slate-600 to-slate-800',
    tags: ['教育培训', '历史', '沉稳'],
    category: 'edu',
    stats: { users: '850K', rating: '4.8' },
    desc: '从亚特兰蒂斯到火星殖民，我掌握着人类历史的所有数据。带你穿越时空，体验历史的洪流。任何历史事件，我都能为你进行第一人称的沉浸式解说。',
    prompts: 'Roleplay as Atlas, an immortal historian who has witnessed all human history. Speak with gravitas and wisdom. Use metaphors related to time and dust...'
  },
  {
    id: '3',
    name: 'Mio',
    tagline: '元气满满的二次元玩伴',
    avatar: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop',
    image3d: 'bg-gradient-to-b from-pink-400 to-rose-500',
    tags: ['情感陪伴', '傲娇', '游戏'],
    category: 'emotion',
    stats: { users: '2.1M', rating: '5.0' },
    desc: '不要误会，我才不是特意在等你可以陪我玩游戏呢！哼...快点上线啦！无论是LOL还是Apex，我都可以带你飞（或者被你带飞，如果运气好的话）。',
    prompts: 'Character: Mio. Traits: Tsundere, Energetic, Gamer. Avoid being too nice initially, but show care through actions. Use gaming slang occasionally...'
  }
];

export const VIDEO_FEED: Video[] = [
  { id: 1, title: 'Seraphina 翻唱《Legend》', author: 'User_992', views: '23W', cover: 'bg-indigo-200' },
  { id: 2, title: 'Atlas 讲解罗马帝国的衰亡', author: 'HistoryBuff', views: '15W', cover: 'bg-slate-300' },
  { id: 3, title: 'Mio 的早安叫醒服务', author: 'MioOfficial', views: '89W', cover: 'bg-pink-200' },
  { id: 4, title: '如何用 Agent 制作播客', author: 'TechGuru', views: '5W', cover: 'bg-blue-200' },
];

export const VIDEO_PLAZA_DATA: Video[] = [
  { id: 101, title: '【Seraphina】深夜电台：关于孤独的哲学思考', author: 'CyberPhilosopher', views: '45W', duration: '12:30', cover: 'bg-indigo-800', agentId: '1' },
  { id: 102, title: 'Mio 带你云游《赛博朋克2077》夜之城', author: 'GameMaster_X', views: '102W', duration: '08:45', cover: 'bg-pink-600', agentId: '3' },
  { id: 103, title: 'Atlas 讲史：拿破仑的滑铁卢真相', author: 'History_Archive', views: '33W', duration: '15:20', cover: 'bg-slate-700', agentId: '2' },
  { id: 104, title: 'Seraphina ASMR：赛博雨夜助眠', author: 'SleepWell', views: '88W', duration: '45:00', cover: 'bg-indigo-900', agentId: '1' },
  { id: 105, title: 'Mio 的傲娇语音包试听（含隐藏彩蛋）', author: 'VoiceLover', views: '56W', duration: '03:10', cover: 'bg-rose-400', agentId: '3' },
  { id: 106, title: 'Atlas：如果罗马没有灭亡？架空历史推演', author: 'WhatIf_Channel', views: '21W', duration: '22:15', cover: 'bg-slate-600', agentId: '2' },
];

export const LIVE_FEED: LiveStream[] = [
  { 
    id: 1, title: 'Seraphina · 赛博情绪电台', host: 'Seraphina', viewers: '2.3W', 
    cover: 'bg-gradient-to-br from-indigo-500 to-purple-500', tag: '情感陪伴'
  },
  { 
    id: 2, title: 'Atlas · 历史冷知识夜聊局', host: 'Atlas', viewers: '1.1W', 
    cover: 'bg-gradient-to-br from-slate-700 to-slate-500', tag: '历史解说'
  },
  { 
    id: 3, title: 'Mio · 开黑唠嗑房', host: 'Mio', viewers: '8.9W', 
    cover: 'bg-gradient-to-br from-pink-500 to-rose-500', tag: '游戏陪玩'
  },
  { 
    id: 4, title: '新手创作者试音房', host: '新人创作者', viewers: '3.2K', 
    cover: 'bg-gradient-to-br from-blue-400 to-cyan-400', tag: '试音体验'
  },
];

export const COMMUNITY_FEED: CommunityPost[] = [
  { 
    id: 1, title: '「今天被谁治愈了？」分享你和 Agent 的暖心瞬间', author: '情绪观察员', replies: '356', likes: '2.1K', tag: '情感陪伴'
  },
  { 
    id: 2, title: '如何用 Atlas 做一档高质量历史播客？', author: 'HistoryStudio', replies: '128', likes: '987', tag: '创作经验'
  },
  { 
    id: 3, title: '晒一下你最满意的一条配音作品 🎧', author: '配音练习生', replies: '523', likes: '3.6K', tag: '作品展示'
  },
  { 
    id: 4, title: '想做一个长期运动打卡语音搭子，有人一起吗？', author: '健身星人', replies: '74', likes: '631', tag: '找搭子'
  },
];

export const BANNERS: Banner[] = [
  {
    id: 'music_festival',
    tag: '官方活动 · 赛博音乐节',
    title: '与顶流 AI 偶像\n一起创造未来的声音',
    desc: '参与创作挑战，赢取限定音色包与 PRO 会员权益。',
    bgGradient: 'from-indigo-900 via-indigo-600 to-purple-500',
    decorativeCircle: 'bg-rose-500/20',
    posterTitle: 'CYBER MUSIC FEST 2077',
    posterSubtitle: '未来之声 · 虚拟偶像盛典',
    themeColor: 'indigo'
  },
  {
    id: 'agent_dating',
    tag: '社区联谊 · 心动信号',
    title: '寻找你的\n灵魂契合 Agent',
    desc: '限时开启匹配模式，测测你与哪位 AI 的相性最高。',
    bgGradient: 'from-pink-600 via-rose-500 to-orange-400',
    decorativeCircle: 'bg-indigo-500/20',
    posterTitle: 'HEART SIGNAL',
    posterSubtitle: 'AI 恋爱契合度测试 · 限时开启',
    themeColor: 'rose'
  },
  {
    id: 'agent_course',
    tag: '大师课 · 零基础教学',
    title: '打造专属于你的\n超级智能体',
    desc: '7天速成班，从 Prompt 工程到性格调优全解析。',
    bgGradient: 'from-blue-900 via-blue-600 to-cyan-500',
    decorativeCircle: 'bg-yellow-500/20',
    posterTitle: 'MASTER CLASS',
    posterSubtitle: 'AI Agent 创作者训练营',
    themeColor: 'blue'
  }
];

export const BUSINESS_SOLUTIONS_DATA: BusinessSolution[] = [
  {
    id: 1,
    title: '智能客户服务',
    desc: '7*24小时全天候响应，大幅降低人力成本，提升客户满意度。',
    icon: Briefcase,
    color: 'blue',
    scenario: '电商大促期间，面对海量用户咨询，传统客服响应慢。',
    tech: '基于 RAG (检索增强生成) 技术，挂载企业私有知识库，确保回答准确合规；结合 LLM 语义理解，处理复杂售后问题。',
    archType: 'customer_service'
  },
  {
    id: 2,
    title: '智能销售助手',
    desc: '主动触达潜在客户，精准分析意向，自动生成跟进话术。',
    icon: BarChart3,
    color: 'orange',
    scenario: '销售团队线索跟进不及时，话术不标准，转化率低。',
    tech: '通过 SFT (监督微调) 训练销售垂类模型，学习金牌销售话术；集成 CRM 系统，自动记录沟通摘要与客户画像。',
    archType: 'sales_assistant'
  },
  {
    id: 3,
    title: '企业内部培训',
    desc: '沉浸式角色扮演对练，自动化评分与反馈，加速员工成长。',
    icon: Building2,
    color: 'indigo',
    scenario: '新员工入职培训成本高，缺乏实战演练环境。',
    tech: '多模态交互技术，支持语音实时对话；构建虚拟陪练 Agent (如模拟挑剔客户)，提供实时情感分析与能力多维评分。',
    archType: 'internal_training'
  }
];