import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Search, Mic, Video, Users, LayoutGrid, MessageSquare, User, Heart, Share2, 
  Settings, Phone, Camera, MicOff, X, MoreHorizontal, Download, Play, Pause, 
  Smile, Sparkles, Zap, Radio, PenTool, History, Globe, Image as ImageIcon, 
  Film, Lock, Clock, ChevronRight, ThumbsUp, Music, Save, FileText, ArrowLeft, 
  Flame, Hash, Calendar, MapPin, Ticket, Gift, ChevronLeft, 
  ChevronRight as ChevronRightIcon, Briefcase, Gamepad2, Building2, Cpu, 
  BarChart3, Layers, MonitorPlay
} from 'lucide-react';

// ==========================================
// 1. 全局样式 & 工具
// ==========================================

const GlobalStyles = () => (
  <style>{`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideInRight { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    .animate-in { animation-fill-mode: both; }
    .fade-in { animation-name: fadeIn; }
    .slide-in-from-right-4 { animation-name: slideInRight; }
    .slide-in-up { animation-name: slideInUp; }
    .zoom-in-95 { animation-name: zoomIn; }
    .duration-200 { animation-duration: 200ms; }
    .duration-300 { animation-duration: 300ms; }
    .duration-700 { animation-duration: 700ms; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `}</style>
);

// ==========================================
// 2. 静态数据 (Mock Data)
// ==========================================

const CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'emotion', label: '情感陪伴' },
  { id: 'healing', label: '心理疗愈' },
  { id: 'assistant', label: '智能助手' },
  { id: 'edu', label: '教育培训' },
  { id: 'story', label: '故事解说' },
  { id: 'travel', label: '旅游向导' },
  { id: 'dubbing', label: '视频配音' },
];

const MOCK_AGENTS = [
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

const VIDEO_FEED = [
  { id: 1, title: 'Seraphina 翻唱《Legend》', author: 'User_992', views: '23W', cover: 'bg-indigo-200' },
  { id: 2, title: 'Atlas 讲解罗马帝国的衰亡', author: 'HistoryBuff', views: '15W', cover: 'bg-slate-300' },
  { id: 3, title: 'Mio 的早安叫醒服务', author: 'MioOfficial', views: '89W', cover: 'bg-pink-200' },
  { id: 4, title: '如何用 Agent 制作播客', author: 'TechGuru', views: '5W', cover: 'bg-blue-200' },
];

// 新增：视频广场 Mock 数据
const VIDEO_PLAZA_DATA = [
  { id: 101, title: '【Seraphina】深夜电台：关于孤独的哲学思考', author: 'CyberPhilosopher', views: '45W', duration: '12:30', cover: 'bg-indigo-800', agentId: '1' },
  { id: 102, title: 'Mio 带你云游《赛博朋克2077》夜之城', author: 'GameMaster_X', views: '102W', duration: '08:45', cover: 'bg-pink-600', agentId: '3' },
  { id: 103, title: 'Atlas 讲史：拿破仑的滑铁卢真相', author: 'History_Archive', views: '33W', duration: '15:20', cover: 'bg-slate-700', agentId: '2' },
  { id: 104, title: 'Seraphina ASMR：赛博雨夜助眠', author: 'SleepWell', views: '88W', duration: '45:00', cover: 'bg-indigo-900', agentId: '1' },
  { id: 105, title: 'Mio 的傲娇语音包试听（含隐藏彩蛋）', author: 'VoiceLover', views: '56W', duration: '03:10', cover: 'bg-rose-400', agentId: '3' },
  { id: 106, title: 'Atlas：如果罗马没有灭亡？架空历史推演', author: 'WhatIf_Channel', views: '21W', duration: '22:15', cover: 'bg-slate-600', agentId: '2' },
];

const LIVE_FEED = [
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

const COMMUNITY_FEED = [
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

const BANNERS = [
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

// B-End 解决方案数据
const BUSINESS_SOLUTIONS_DATA = [
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

// ==========================================
// 3. 基础 UI 组件 (UI Components)
// ==========================================

const SectionHeader = React.memo(({ title, action = "查看全部", isActive = false, onActionClick }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${isActive ? 'text-indigo-700' : 'text-slate-800'}`}>
      <span className={`w-1.5 h-6 rounded-full inline-block ${isActive ? 'bg-indigo-500 shadow-[0_0_0_4px_rgba(129,140,248,0.25)]' : 'bg-indigo-600'}`}></span>
      {title}
    </h2>
    <button 
      onClick={onActionClick}
      className="text-sm font-medium text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 group"
    >
      {action} <span className="group-hover:translate-x-1 transition-transform">→</span>
    </button>
  </div>
));

const AgentCard = React.memo(({ agent, onClick }) => (
  <div 
    onClick={onClick}
    className="min-w-[280px] h-[360px] bg-white rounded-2xl p-4 flex flex-col relative group cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 border border-slate-100"
  >
    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-100">
      <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
        ⭐ {agent.stats.rating}
      </div>
    </div>
    
    <div className="flex-1">
      <h3 className="text-lg font-bold text-slate-800 mb-1">{agent.name}</h3>
      <p className="text-xs text-indigo-600 font-medium mb-2">{agent.tagline}</p>
      <div className="flex flex-wrap gap-1 mb-4">
        {agent.tags.slice(0, 2).map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] rounded-md border border-slate-200">
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
      <div className="flex items-center text-slate-400 text-xs gap-1">
        <Users size={14} />
        {agent.stats.users}
      </div>
      <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
        <Heart size={16} />
      </button>
    </div>
  </div>
));

const SolutionArch = ({ type }) => {
  if (type === 'customer_service') {
    return (
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 border border-dashed border-slate-300 p-4 rounded-lg bg-slate-50">
         <div className="flex flex-col items-center"><Users size={20} className="mb-1 text-slate-400"/>用户</div>
         <ArrowLeft size={12} className="rotate-180 text-slate-300"/>
         <div className="px-3 py-1 bg-white border border-slate-200 rounded shadow-sm">网关</div>
         <ArrowLeft size={12} className="rotate-180 text-slate-300"/>
         <div className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-600 rounded shadow-sm font-bold flex items-center gap-1"><Cpu size={12}/> Agent</div>
         <div className="h-px w-4 bg-slate-300"></div>
         <div className="px-3 py-1 bg-slate-100 border border-slate-200 rounded text-slate-500 flex items-center gap-1"><Layers size={12}/> 知识库</div>
      </div>
    );
  }
  if (type === 'sales_assistant') {
    return (
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 border border-dashed border-slate-300 p-4 rounded-lg bg-slate-50">
         <div className="px-3 py-1 bg-white border border-slate-200 rounded shadow-sm">CRM 数据</div>
         <ArrowLeft size={12} className="rotate-180 text-slate-300"/>
         <div className="px-3 py-1 bg-orange-50 border border-orange-200 text-orange-600 rounded shadow-sm font-bold flex items-center gap-1"><Cpu size={12}/> 销售模型</div>
         <ArrowLeft size={12} className="rotate-180 text-slate-300"/>
         <div className="flex flex-col items-center"><Briefcase size={20} className="mb-1 text-slate-400"/>销售人员</div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 border border-dashed border-slate-300 p-4 rounded-lg bg-slate-50">
       <div className="px-3 py-1 bg-white border border-slate-200 rounded shadow-sm">员工 App</div>
       <ArrowLeft size={12} className="rotate-180 text-slate-300"/>
       <div className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded shadow-sm font-bold flex items-center gap-1"><Cpu size={12}/> 陪练 Agent</div>
       <div className="h-px w-4 bg-slate-300"></div>
       <div className="px-3 py-1 bg-slate-100 border border-slate-200 rounded text-slate-500">评分系统</div>
    </div>
  );
};

// ==========================================
// 4. 功能组件 (Feature Components)
// ==========================================

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-18 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 flex items-center justify-between px-6 transition-all duration-300">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
          <Zap size={20} fill="currentColor" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800">Aether<span className="text-indigo-600">Voice</span></span>
      </div>

      <div className="flex-1 max-w-2xl mx-8 relative group hidden md:block" ref={searchContainerRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="搜索 Agent、创作者或话题标签..." 
            onFocus={() => setIsSearchFocused(true)}
            className="w-full bg-slate-100 text-slate-700 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all text-sm font-medium"
          />
        </div>

        {isSearchFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4">
              <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1">
                <Flame size={14} className="text-rose-500" /> 人气 Agent 推荐
              </h3>
              <div className="grid grid-cols-1 gap-2 mb-4">
                {MOCK_AGENTS.slice(0, 2).map(agent => (
                  <div key={agent.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                    <img src={agent.avatar} alt={agent.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800">{agent.name}</div>
                      <div className="text-xs text-slate-500 truncate">{agent.tagline}</div>
                    </div>
                    <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">HOT</div>
                  </div>
                ))}
              </div>
              <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1">
                <Hash size={14} className="text-indigo-500" /> 社区高热度话题
              </h3>
              <div className="space-y-2">
                {['如何训练出高情商 Agent', '晒出你的赛博音色', 'AI 心理咨询体验分享', '我的 Agent 是个话痨'].map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm text-slate-700">
                    <span className="flex items-center gap-2">
                      <span className={`w-4 h-4 flex items-center justify-center rounded text-[10px] font-bold ${idx < 3 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>{idx + 1}</span>
                      {topic}
                    </span>
                    <span className="text-xs text-slate-400">{(10 - idx) * 342} 热度</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {[
          { icon: PenTool, label: '创作', id: 'editor' },
          { icon: Radio, label: '直播', id: 'live' },
          { icon: Globe, label: '社区', id: 'community' },
          { icon: History, label: '历史', id: 'history' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-14 h-14 md:w-16 rounded-xl transition-all group ${activeTab === item.id ? 'bg-slate-100 text-indigo-600 shadow-sm' : 'hover:bg-slate-50 text-slate-500 hover:text-indigo-600'}`}
          >
            <item.icon size={20} className={`mb-1 transition-transform ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span className="text-[10px] font-medium opacity-70 hidden md:block">{item.label}</span>
          </button>
        ))}
        <div className="ml-2 md:ml-4 pl-2 md:pl-4 border-l border-gray-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] cursor-pointer hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow">
             <div className="w-full h-full rounded-full bg-white overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// 交互四：Agent 榜单详情页
const LeaderboardInterface = ({ onBack }) => {
  const [activeSegment, setActiveSegment] = useState('consumer');

  return (
    <div className="min-h-screen bg-[#F7F9FC] pt-24 px-6 md:px-10 pb-20 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">Agent 榜单中心</h1>
        </div>

        <div className="flex justify-center mb-10">
           <div className="bg-white p-1 rounded-full border border-slate-200 shadow-sm flex items-center">
              <button 
                onClick={() => setActiveSegment('consumer')}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeSegment === 'consumer' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
              >
                 <Gamepad2 size={16}/> 个人娱乐 (C-End)
              </button>
              <button 
                onClick={() => setActiveSegment('business')}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeSegment === 'business' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
              >
                 <Briefcase size={16}/> 企业服务 (B-End)
              </button>
           </div>
        </div>

        <div className="animate-in slide-in-up duration-300">
           {activeSegment === 'consumer' && (
              <div>
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                       <Sparkles className="text-yellow-500" /> 本周热门娱乐 Agent
                    </h2>
                    <span className="text-xs text-slate-400">数据更新于 10分钟前</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...MOCK_AGENTS, ...MOCK_AGENTS].map((agent, i) => (
                       <AgentCard key={`${agent.id}-${i}`} agent={agent} onClick={() => {}} />
                    ))}
                 </div>
                 <div className="mt-12 p-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">找不到喜欢的？</h3>
                    <p className="opacity-90 mb-6">快来创作属于你自己的独一无二的 Agent 吧！</p>
                    <button className="px-6 py-2 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-colors">
                       去创作中心
                    </button>
                 </div>
              </div>
           )}

           {activeSegment === 'business' && (
              <div className="space-y-8">
                 <div className="bg-slate-900 text-white p-8 rounded-3xl mb-8 relative overflow-hidden">
                    <div className="relative z-10">
                       <h2 className="text-2xl md:text-3xl font-bold mb-3">企业级 Agent 解决方案</h2>
                       <p className="text-slate-400 max-w-2xl mb-6">为您的企业量身定制 AI 劳动力。从智能客服到自动化办公，我们提供安全、可控、高效的行业解决方案。</p>
                       <div className="flex gap-3">
                          <button className="px-5 py-2 bg-indigo-600 rounded-lg font-bold hover:bg-indigo-500 transition-colors">联系商务顾问</button>
                          <button className="px-5 py-2 bg-white/10 border border-white/20 rounded-lg font-bold hover:bg-white/20 transition-colors">查看客户案例</button>
                       </div>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-600/50 to-transparent"></div>
                    <Building2 className="absolute -right-6 -bottom-6 w-48 h-48 text-white/5" />
                 </div>

                 <div className="grid grid-cols-1 gap-6">
                    {BUSINESS_SOLUTIONS_DATA.map(sol => (
                       <div key={sol.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
                          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                             <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                   <div className={`w-12 h-12 rounded-xl bg-${sol.color}-50 flex items-center justify-center text-${sol.color}-600`}>
                                      <sol.icon size={24} />
                                   </div>
                                   <div>
                                      <h3 className="text-lg font-bold text-slate-800">{sol.title}</h3>
                                      <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">企业版 PRO</span>
                                   </div>
                                </div>
                                <p className="text-slate-600 mb-6">{sol.desc}</p>
                                <div className="space-y-4">
                                   <div className="bg-slate-50 p-4 rounded-xl">
                                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> 业务场景</h4>
                                      <p className="text-sm text-slate-700">{sol.scenario}</p>
                                   </div>
                                   <div>
                                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><Cpu size={12}/> 技术解决方案</h4>
                                      <p className="text-sm text-slate-600 leading-relaxed">{sol.tech}</p>
                                   </div>
                                </div>
                             </div>
                             <div className="w-full md:w-1/3 bg-slate-50 rounded-xl p-6 flex flex-col justify-center">
                                <h4 className="text-xs font-bold text-slate-400 text-center mb-4">架构示意图</h4>
                                <SolutionArch type={sol.archType} />
                                <div className="mt-6 text-center">
                                   <button className="text-xs font-bold text-indigo-600 hover:underline">查看详细技术文档 →</button>
                                </div>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

// 交互五（新增）：衍生视频广场详情页
const VideoPlazaInterface = ({ onBack, onAgentClick }) => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] pt-24 px-6 md:px-10 pb-20 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">衍生视频广场</h1>
        </div>

        {/* Hero Section */}
        <div className="relative w-full h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl group cursor-pointer">
           <div className="absolute inset-0 bg-slate-900">
              {/* Mock Video Placeholder */}
              <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
           </div>
           <div className="absolute bottom-0 left-0 p-10 max-w-2xl text-white z-10">
              <span className="inline-block px-3 py-1 bg-rose-500 rounded-full text-xs font-bold mb-4">今日推荐</span>
              <h2 className="text-4xl font-bold mb-4 leading-tight">Seraphina 的赛博梦境：<br/>迷失在霓虹雨夜</h2>
              <div className="flex items-center gap-4 text-sm text-slate-300 mb-6">
                 <span className="flex items-center gap-1"><Play size={16} fill="currentColor"/> 128W 播放</span>
                 <span>•</span>
                 <span>15:30</span>
              </div>
              <button className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
                 <Play size={18} fill="currentColor"/> 立即播放
              </button>
           </div>
        </div>

        {/* Video Grid */}
        <div>
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                 <MonitorPlay className="text-indigo-500"/> 热门二创
              </h2>
              <div className="flex gap-2">
                 {['全部', '剧情', '音乐', '搞笑', '游戏'].map(tag => (
                    <button key={tag} className="px-4 py-1.5 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                       {tag}
                    </button>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEO_PLAZA_DATA.map((video) => {
                 const relatedAgent = MOCK_AGENTS.find(a => a.id === video.agentId);
                 
                 return (
                    <div key={video.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all group flex flex-col">
                       {/* Video Thumbnail */}
                       <div className={`h-48 w-full ${video.cover} relative flex items-center justify-center cursor-pointer`}>
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                             <Play size={20} fill="currentColor" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-mono">
                             {video.duration}
                          </div>
                       </div>

                       {/* Content */}
                       <div className="p-4 flex-1 flex flex-col">
                          <h3 className="font-bold text-slate-800 text-base mb-2 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                             {video.title}
                          </h3>
                          
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                             <span>UP主: {video.author}</span>
                             <span>{video.views} 播放</span>
                          </div>

                          {/* Agent Link (Interaction 2) */}
                          {relatedAgent && (
                             <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                   <div className="text-[10px] font-bold text-slate-400">关联角色</div>
                                   <div 
                                      className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-50 hover:bg-indigo-50 cursor-pointer transition-colors border border-slate-100 hover:border-indigo-100"
                                      onClick={(e) => {
                                         e.stopPropagation(); // Prevent video click
                                         onAgentClick(relatedAgent);
                                      }}
                                   >
                                      <img src={relatedAgent.avatar} className="w-6 h-6 rounded-full object-cover" alt={relatedAgent.name} />
                                      <span className="text-xs font-bold text-slate-700">{relatedAgent.name}</span>
                                      <ChevronRight size={12} className="text-slate-400"/>
                                   </div>
                                </div>
                             </div>
                          )}
                       </div>
                    </div>
                 );
              })}
           </div>
        </div>
      </div>
    </div>
  );
};

const HeroBanner = ({ onBannerClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  }, []);

  return (
    <div className="w-full h-80 rounded-3xl overflow-hidden relative mb-10 group shadow-xl shadow-indigo-100/50 select-none">
      <div className="absolute inset-0 transition-all duration-700 ease-in-out">
        {BANNERS.map((banner, index) => (
           <div 
             key={banner.id}
             className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
           >
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient}`}></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className={`absolute bottom-0 left-20 w-64 h-64 ${banner.decorativeCircle} rounded-full blur-3xl`}></div>

              <div className="absolute inset-0 flex items-center px-6 md:px-12">
                <div className="max-w-xl text-white z-20 animate-in slide-in-from-right-4 duration-700" key={currentIndex}>
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-4 border border-white/30">{banner.tag}</span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight whitespace-pre-line">{banner.title}</h1>
                  <p className="text-white/80 mb-6 text-sm md:text-lg">{banner.desc}</p>
                  <button onClick={() => onBannerClick(banner)} className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold hover:bg-opacity-90 transition-colors shadow-lg hover:shadow-white/20">立即查看</button>
                </div>
                <div className="absolute right-0 bottom-0 h-full w-full md:w-1/2 flex items-end justify-center pointer-events-none z-10">
                   <div className={`w-full h-4/5 bg-gradient-to-t ${banner.bgGradient.split(' ')[0]}/50 to-transparent absolute bottom-0 z-0`}></div>
                   <div className="h-full w-full flex items-end justify-center relative z-10 opacity-90">
                       <img src="https://img.freepik.com/free-photo/view-3d-happy-robot-with-head-phones_23-2150853110.jpg?w=740&t=st=1709664000~exp=1709664600~hmac=d1234" alt="3D Character" className="h-[90%] object-contain mix-blend-screen mask-image-gradient" style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }} />
                   </div>
                </div>
              </div>
           </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-white' : 'bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
      
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft size={24} /></button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRightIcon size={24} /></button>
    </div>
  );
};

const ActivityDetailInterface = ({ activity, onBack }) => {
  if (!activity) return null;

  return (
    <div className="min-h-screen bg-[#F7F9FC] pt-20 animate-in fade-in duration-300">
      <div className="w-full relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        <div className={`absolute inset-0 bg-gradient-to-br ${activity.bgGradient} animate-pulse`}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white/20 rounded-full blur-sm animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-20 text-center text-white px-6">
           <div className="inline-block px-4 py-1.5 border border-white/40 rounded-full text-sm tracking-widest uppercase mb-6 backdrop-blur-md animate-in slide-in-up duration-700">{activity.tag}</div>
           <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-none drop-shadow-2xl animate-in zoom-in duration-700 delay-100">{activity.posterTitle}</h1>
           <p className="text-xl md:text-3xl font-light tracking-wide text-white/90 mb-10 animate-in slide-in-up duration-700 delay-200">{activity.posterSubtitle}</p>
           <div className="flex flex-wrap justify-center gap-6 animate-in slide-in-up duration-700 delay-300">
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                 <Calendar className="text-white" />
                 <div className="text-left"><div className="text-[10px] uppercase opacity-70">Date</div><div className="text-sm font-bold">2077.12.24</div></div>
              </div>
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                 <MapPin className="text-white" />
                 <div className="text-left"><div className="text-[10px] uppercase opacity-70">Location</div><div className="text-sm font-bold">Neo-Tokyo / Online</div></div>
              </div>
           </div>
        </div>
        <button onClick={onBack} className="absolute top-6 left-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl border border-white/20 transition-all group">
           <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform"/>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 -mt-20 relative z-30">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                 <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Sparkles className={`text-${activity.themeColor}-500`} /> 活动介绍</h2>
                    <p className="text-slate-600 leading-relaxed text-lg">欢迎来到 {activity.posterTitle}！这不仅仅是一场活动，这是一次穿越数字与现实边界的探索之旅。在这里，你将见证最前沿的 AI 技术与艺术的完美融合。</p>
                 </section>
                 <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Gift className={`text-${activity.themeColor}-500`} /> 独家权益</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {['限定 SSR 音色包', 'Pro 会员 30天体验卡', '专属 3D 虚拟形象配饰', '创作者社区 VIP 徽章'].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                             <div className={`w-8 h-8 rounded-full bg-${activity.themeColor}-100 flex items-center justify-center text-${activity.themeColor}-600 font-bold`}>{i + 1}</div>
                             <span className="font-bold text-slate-700">{item}</span>
                          </div>
                       ))}
                    </div>
                 </section>
              </div>
              <div className="space-y-8">
                 <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                    <div className="text-sm text-slate-500 mb-2">距离报名截止还有</div>
                    <div className="text-3xl font-black text-slate-800 font-mono mb-6">03 : 12 : 45</div>
                    <button className={`w-full py-4 rounded-xl bg-gradient-to-r ${activity.bgGradient} text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2`}><Ticket /> 立即报名</button>
                    <p className="text-xs text-slate-400 mt-4">已有 12,450 人报名参加</p>
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900 mb-4">特邀嘉宾</h3>
                    <div className="space-y-3">
                       {MOCK_AGENTS.slice(0,3).map(agent => (
                          <div key={agent.id} className="flex items-center gap-3">
                             <img src={agent.avatar} className="w-10 h-10 rounded-full object-cover" alt="guest"/>
                             <div><div className="text-sm font-bold text-slate-800">{agent.name}</div><div className="text-xs text-slate-500">{agent.tagline}</div></div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const CreateAgentInterface = ({ onExit }) => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] pt-24 px-6 md:px-10 pb-20 animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onExit} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"><ArrowLeft size={24} /></button>
            <h1 className="text-2xl font-bold text-slate-800">创作新的 Agent</h1>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={onExit} className="px-5 py-2.5 rounded-full font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 transition-all text-sm flex items-center gap-2"><FileText size={16} /> 保存草稿</button>
             <button onClick={onExit} className="px-5 py-2.5 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all text-sm flex items-center gap-2"><Save size={16} /> 保存发布</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center">
               <div className="w-40 h-40 bg-slate-100 rounded-full mb-4 flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400 cursor-pointer hover:border-indigo-500 hover:text-indigo-500 transition-colors group"><Camera size={32} className="group-hover:scale-110 transition-transform"/></div>
               <p className="text-xs text-slate-400 mb-4">点击上传头像或生成 3D 形象</p>
               <input type="text" placeholder="给 TA 起个名字" className="w-full text-center text-lg font-bold border-b border-slate-200 focus:border-indigo-500 outline-none py-2 bg-transparent transition-colors" />
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Settings size={18}/> 基础设定</h3>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">一句话介绍 (Tagline)</label><input type="text" className="w-full bg-slate-50 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all" placeholder="例如：赛博朋克心理咨询师" /></div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1.5">分类</label>
                   <div className="flex flex-wrap gap-2">{['情感', '助手', '游戏', '历史', '语言'].map(tag => (<span key={tag} className="px-3 py-1 rounded-lg bg-slate-50 text-slate-500 text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer border border-slate-100 transition-colors">{tag}</span>))}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Sparkles size={18} className="text-indigo-500"/> 人设与 Prompt</h3>
               <div className="space-y-4">
                  <div><label className="block text-xs font-bold text-slate-500 mb-1.5">详细设定 (System Prompt)</label><textarea className="w-full h-40 bg-slate-50 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none font-mono" placeholder="在这里输入 Agent 的核心人设、说话风格、背景故事..."></textarea></div>
                  <div><label className="block text-xs font-bold text-slate-500 mb-1.5">开场白</label><input type="text" className="w-full bg-slate-50 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all" placeholder="初次见面时 TA 会说什么？" /></div>
               </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Music size={18} className="text-rose-500"/> 声音配置</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50 cursor-pointer relative"><div className="absolute top-2 right-2 text-indigo-600"><div className="w-3 h-3 bg-indigo-600 rounded-full"></div></div><div className="font-bold text-indigo-900 mb-1">御姐音 - V3</div><div className="text-xs text-indigo-600">当前选择</div></div>
                  <div className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 cursor-pointer bg-white transition-all"><div className="font-bold text-slate-700 mb-1">元气少女 - V2</div><div className="text-xs text-slate-400">点击试听</div></div>
                  <div className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 cursor-pointer bg-white transition-all"><div className="font-bold text-slate-700 mb-1">磁性大叔 - V1</div><div className="text-xs text-slate-400">点击试听</div></div>
                  <div className="flex items-center justify-center p-4 rounded-xl border border-dashed border-slate-300 text-slate-400 hover:text-indigo-500 hover:border-indigo-500 cursor-pointer transition-all"><span className="text-sm font-bold flex items-center gap-1"><Mic size={16}/> 录制声音克隆</span></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HistoryInterface = () => {
  const [activeSection, setActiveSection] = useState('calls');
  const SECTIONS = useMemo(() => [
    { id: 'calls', label: '语音通话', icon: Phone },
    { id: 'live', label: '直播间', icon: Radio },
    { id: 'community', label: '社区浏览', icon: Globe },
  ], []);

  return (
    <div className="min-h-screen bg-[#F7F9FC] pt-24 px-6 md:px-10 pb-20 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3"><History size={32} className="text-indigo-600"/> 历史足迹</h1>
        <p className="text-slate-500 mb-8">查看你与 Agent 们的过往互动记录。</p>

        <div className="flex gap-4 mb-8 border-b border-slate-200 pb-1">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`pb-3 px-2 flex items-center gap-2 font-bold text-sm transition-all relative ${activeSection === section.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <section.icon size={18} />
              {section.label}
              {activeSection === section.id && (<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"></div>)}
            </button>
          ))}
        </div>

        <div className="animate-in slide-in-up duration-300">
          {activeSection === 'calls' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_AGENTS.map((agent, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="relative"><img src={agent.avatar} alt={agent.name} className="w-16 h-16 rounded-full object-cover group-hover:scale-105 transition-transform" /><div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white w-4 h-4 rounded-full"></div></div>
                  <div className="flex-1"><h3 className="font-bold text-slate-800">{agent.name}</h3><div className="flex items-center gap-2 text-xs text-slate-500 mt-1"><Clock size={12} /> 昨天 22:30<span className="w-1 h-1 bg-slate-300 rounded-full"></span>通话 15分钟</div></div>
                  <button className="p-3 bg-slate-50 rounded-full text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Phone size={18} /></button>
                </div>
              ))}
            </div>
          )}
          {activeSection === 'live' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {LIVE_FEED.map(live => (
                 <div key={live.id} className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all opacity-75 hover:opacity-100 grayscale hover:grayscale-0 cursor-pointer">
                    <div className={`h-32 ${live.cover} relative flex items-center justify-center`}><div className="bg-black/40 px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm">已结束</div></div>
                    <div className="p-4"><h4 className="font-bold text-slate-800 text-sm mb-1">{live.title}</h4><div className="text-xs text-slate-400">主播: {live.host}</div><div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-100">观看时长: 45分钟</div></div>
                 </div>
               ))}
            </div>
          )}
          {activeSection === 'community' && (
            <div className="space-y-4">
               {COMMUNITY_FEED.map(post => (
                 <div key={post.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-start gap-4 hover:border-indigo-200 transition-colors cursor-pointer">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0"><FileText size={20} /></div>
                    <div className="flex-1"><div className="text-xs text-slate-400 mb-1">浏览于 2小时前</div><h4 className="font-bold text-slate-800 mb-2">{post.title}</h4><div className="flex gap-2"><span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded">{post.tag}</span></div></div>
                    <button className="text-slate-400 hover:text-indigo-600"><ChevronRight size={18} /></button>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CallInterface = ({ agent, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [emotion, setEmotion] = useState('Happy');
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState('00:00');
  
  // Fake visualizer bars
  const visualizerBars = useMemo(() => Array.from({ length: 24 }).map((_, i) => i), []);

  useEffect(() => {
    const timer = setInterval(() => {
        setCallDuration(prev => {
           const [mins, secs] = prev.split(':').map(Number);
           let newSecs = secs + 1;
           let newMins = mins;
           if (newSecs === 60) { newSecs = 0; newMins += 1; }
           return `${newMins < 10 ? '0' + newMins : newMins}:${newSecs < 10 ? '0' + newSecs : newSecs}`;
        });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleExtractAudio = () => { /* Mock download */ };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 text-white flex flex-col overflow-hidden animate-in fade-in duration-300">
      <div className={`absolute inset-0 opacity-40 ${agent.image3d} blur-[100px]`}></div>
      <div className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
           <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all"><X size={20} /></button>
           <div><h3 className="font-bold text-lg leading-none">{agent.name}</h3><span className="text-indigo-300 text-xs flex items-center gap-1 mt-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>通话中 {callDuration}</span></div>
        </div>
        <div className="px-4 py-1.5 bg-black/30 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-2"><Smile size={16} className="text-yellow-400" /><span className="text-xs font-medium">当前情绪: {emotion}</span></div>
      </div>
      <div className="flex-1 relative flex flex-col items-center justify-center z-10">
        <div className="w-48 h-48 md:w-80 md:h-80 rounded-full bg-gradient-to-t from-slate-800 to-slate-600 shadow-2xl flex items-center justify-center relative mb-8 ring-1 ring-white/10">
           <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-[ping_3s_ease-in-out_infinite] opacity-20"></div>
           <div className="absolute -inset-4 rounded-full border border-indigo-400/10 animate-[pulse_4s_ease-in-out_infinite]"></div>
           <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover rounded-full opacity-80 mix-blend-overlay" />
           <div className="absolute inset-0 flex items-center justify-center"><span className="text-6xl animate-pulse drop-shadow-lg filter backdrop-blur-[1px]">🎙️</span></div>
        </div>
        <div className="w-full max-w-2xl px-6 text-center mb-12 min-h-[80px]"><p className="text-xl md:text-2xl font-light leading-relaxed text-indigo-50 drop-shadow-md transition-all">"我在听，你可以随时告诉我你的想法..."</p></div>
        <div className="flex items-end justify-center gap-1 h-16 w-full max-w-md mb-8">{visualizerBars.map((i) => (<div key={i} className="w-2 bg-indigo-400 rounded-full animate-[bounce_1s_infinite]" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.05}s`, opacity: 0.6 + Math.random() * 0.4 }}></div>))}</div>
      </div>
      <div className="relative z-10 p-8 pb-12 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 to-transparent">
         <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setEmotion(emotion === 'Happy' ? 'Serious' : 'Happy')} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-md text-xs font-medium flex items-center gap-2 transition-all"><Sparkles size={14} className="text-purple-400"/> 切换情绪</button>
            <button onClick={handleExtractAudio} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-md text-xs font-medium flex items-center gap-2 transition-all"><Download size={14} className="text-blue-400"/> 提取当前音频</button>
         </div>
         <div className="flex items-center gap-6">
            <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-full transition-all ${isMuted ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}>{isMuted ? <MicOff size={24}/> : <Mic size={24}/>}</button>
            <button onClick={() => setIsVideoOn(!isVideoOn)} className={`p-4 rounded-full transition-all ${isVideoOn ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}><Video size={24}/></button>
            <button onClick={onClose} className="p-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/40 transform hover:scale-105 transition-all"><Phone size={32} className="rotate-[135deg]" /></button>
            <button onClick={() => setIsRecording(!isRecording)} className={`p-4 rounded-full transition-all ${isRecording ? 'bg-red-500/20 text-red-500 ring-2 ring-red-500 animate-pulse' : 'bg-white/10 text-white hover:bg-white/20'}`}><div className={`w-6 h-6 rounded-full border-2 border-current flex items-center justify-center`}><div className={`w-4 h-4 rounded-full bg-current ${isRecording ? 'scale-75' : 'scale-100'} transition-transform`}></div></div></button>
            <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"><MoreHorizontal size={24}/></button>
         </div>
      </div>
    </div>
  );
};

const AgentDetailModal = ({ agent, onClose, onStartCall }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const TABS = useMemo(() => [
    { id: 'overview', label: '概览' },
    { id: 'gallery', label: '画廊' },
    { id: 'history', label: '通话记录' },
    { id: 'comments', label: '评价' },
  ], []);

  const historyData = [
    { id: 1, date: '10 分钟前', duration: '12:04', type: 'free' },
    { id: 2, date: '昨天', duration: '45:00', type: 'paid' },
    { id: 3, date: '3天前', duration: '08:30', type: 'expired' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="w-full max-w-5xl h-[90vh] md:h-[85vh] bg-white rounded-3xl shadow-2xl z-10 flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-200 relative">
        <div className="w-full md:w-[400px] h-64 md:h-auto bg-slate-100 relative group flex-shrink-0">
           <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10"></div>
           <div className="absolute top-4 left-4 z-20">
              <button onClick={onClose} className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors border border-white/10"><X size={20} /></button>
           </div>
           <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors border border-white/10" title="查看3D立绘"><User size={18} /></button>
              <button className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors border border-white/10" title="查看视频"><Film size={18} /></button>
           </div>
           <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{agent.name}</h2>
              <p className="text-indigo-200 font-medium text-base md:text-lg mb-4">{agent.tagline}</p>
              <div className="flex items-center gap-4 mb-6 text-sm opacity-90">
                 <div className="flex items-center gap-1"><Users size={16} /> {agent.stats.users} 关注</div>
                 <div className="flex items-center gap-1"><Heart size={16} /> 4.2w 收藏</div>
              </div>
              <button onClick={onStartCall} className="w-full py-3 md:py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 group/btn"><Phone size={20} className="group-hover/btn:animate-bounce" /> 立即通话</button>
           </div>
        </div>
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
           <div className="px-6 md:px-8 pt-6 pb-0 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex gap-2">{agent.tags.map(tag => (<span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">#{tag}</span>))}</div>
                 <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"><MessageSquare size={20} /></button>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"><Share2 size={20} /></button>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"><Settings size={20} /></button>
                 </div>
              </div>
              <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide">
                 {TABS.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`pb-4 text-sm font-bold relative transition-colors whitespace-nowrap ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                       {tab.label}
                       {activeTab === tab.id && (<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"></div>)}
                    </button>
                 ))}
              </div>
           </div>
           <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              {activeTab === 'overview' && (
                 <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    <section><h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Sparkles size={16} className="text-indigo-500"/> Agent 简介</h3><p className="text-slate-600 leading-relaxed text-sm">{agent.desc}</p></section>
                    <section className="bg-slate-50 rounded-xl p-4 border border-slate-100"><h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Zap size={16} className="text-amber-500"/> Prompt 设定 (部分预览)</h3><div className="relative"><p className="font-mono text-xs text-slate-500 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">{agent.prompts}<br/><br/>[系统指令隐藏中...]</p><div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-2"><span className="text-xs text-indigo-600 font-bold cursor-pointer hover:underline">解锁查看完整设定</span></div></div></section>
                    <section>
                       <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Music size={16} className="text-rose-500"/> 声音特征</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm"><div className="text-xs text-slate-400 mb-2">音色</div><div className="flex items-center justify-between text-sm font-bold text-slate-700">温柔御姐音 <Play size={14} className="text-indigo-500"/></div></div>
                          <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm"><div className="text-xs text-slate-400 mb-2">语速</div><div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden"><div className="bg-green-400 h-full w-[60%]"></div></div></div>
                       </div>
                    </section>
                 </div>
              )}
              {activeTab === 'gallery' && (
                 <div className="animate-in slide-in-from-right-4 duration-300">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">照片墙 & 视频</h3>
                    <div className="grid grid-cols-3 gap-3">
                       {[1,2,3,4,5,6].map((item) => (<div key={item} className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative group cursor-pointer"><img src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80`} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="gallery" />{item % 2 === 0 && (<div className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm"><Film size={12} /></div>)}</div>))}
                    </div>
                 </div>
              )}
              {activeTab === 'history' && (
                 <div className="animate-in slide-in-from-right-4 duration-300 space-y-4">
                    <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-xl border border-indigo-100"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"><Clock size={20} /></div><div><div className="text-sm font-bold text-indigo-900">历史回顾功能</div><div className="text-xs text-indigo-600">免费支持查看最近7天记录</div></div></div><button className="px-3 py-1.5 bg-white text-indigo-600 text-xs font-bold rounded-lg border border-indigo-200 shadow-sm">升级会员</button></div>
                    <div className="space-y-2">
                       {historyData.map((record) => (
                          <div key={record.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                             <div className="flex items-center gap-4"><div className={`w-2 h-2 rounded-full ${record.type === 'expired' ? 'bg-slate-300' : 'bg-green-500'}`}></div><div><div className="text-sm font-bold text-slate-700">{record.date}</div><div className="text-xs text-slate-400">通话时长: {record.duration}</div></div></div>
                             {record.type === 'expired' ? (<button className="text-slate-300 cursor-not-allowed"><Lock size={18}/></button>) : (<button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Play size={16} fill="currentColor"/></button>)}
                          </div>
                       ))}
                    </div>
                 </div>
              )}
              {activeTab === 'comments' && (
                 <div className="animate-in slide-in-from-right-4 duration-300"><h3 className="text-sm font-bold text-slate-900 mb-4">用户评价 (1.2w)</h3><div className="space-y-6">{[1,2,3].map(i => (<div key={i} className="flex gap-3"><div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 5}`} alt="avatar" /></div><div><div className="flex items-center gap-2 mb-1"><span className="text-xs font-bold text-slate-700">CyberUser_{i}99</span><span className="text-[10px] text-slate-400">2小时前</span></div><p className="text-sm text-slate-600 mb-2">真的非常治愈！Seraphina的声音听起来完全不像AI，昨晚聊了很久，感觉心情好多了。推荐大家试试！</p><div className="flex items-center gap-4"><button className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1"><ThumbsUp size={12} /> 124</button><button className="text-xs text-slate-400 hover:text-indigo-500">回复</button></div></div></div>))}</div></div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. 主应用 (Main App)
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null); 
  const [isCalling, setIsCalling] = useState(false);

  // Refs for scroll and anchor navigation
  const scrollContainerRef = useRef(null);
  const liveSectionRef = useRef(null);
  const communitySectionRef = useRef(null);

  // Handlers
  const handleAgentClick = useCallback((agent) => {
    setSelectedAgent(agent);
  }, []);

  const handleBannerClick = useCallback((activity) => {
    setSelectedActivity(activity);
    setActiveTab('activity_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStartCall = useCallback(() => {
    setIsCalling(true);
  }, []);

  const handleEndCall = useCallback(() => {
    setIsCalling(false);
  }, []);

  const handleCloseAgentDetail = useCallback(() => {
    setSelectedAgent(null);
  }, []);

  const scrollToSection = useCallback((ref) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offset = 90; // Top Navbar offset
    const top = window.scrollY + rect.top - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  // Effect for anchor navigation
  useEffect(() => {
    if (activeTab === 'live') scrollToSection(liveSectionRef);
    else if (activeTab === 'community') scrollToSection(communitySectionRef);
    else if (activeTab === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, scrollToSection]);

  // View Routing
  const renderMainContent = () => {
    switch (activeTab) {
      case 'editor':
        return <CreateAgentInterface onExit={() => setActiveTab('home')} />;
      case 'history':
        return <HistoryInterface />;
      case 'activity_detail':
        return <ActivityDetailInterface activity={selectedActivity} onBack={() => setActiveTab('home')} />;
      case 'leaderboard':
        return <LeaderboardInterface onBack={() => setActiveTab('home')} />;
      case 'video_plaza':
        return <VideoPlazaInterface onBack={() => setActiveTab('home')} onAgentClick={handleAgentClick} />;
      default:
        // Default Home View
        return (
          <main className="max-w-[1440px] mx-auto pt-24 px-6 md:px-10">
            <HeroBanner onBannerClick={handleBannerClick} />

            {/* Categories */}
            <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-hide mb-8">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
                >
                  {cat.label}
                </button>
              ))}
              <button className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 hover:bg-slate-300"><MoreHorizontal size={16} /></button>
            </div>

            {/* Popular Agents */}
            <SectionHeader 
              title="人气推荐" 
              action="查看榜单" 
              onActionClick={() => { setActiveTab('leaderboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
            <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-10 -mx-6 px-6 scrollbar-hide snap-x">
              {[...MOCK_AGENTS, ...MOCK_AGENTS].map((agent, index) => (
                <div key={`${agent.id}-${index}`} className="snap-center">
                   <AgentCard agent={agent} onClick={() => handleAgentClick(agent)} />
                </div>
              ))}
            </div>

            {/* Video Feed */}
            <SectionHeader 
              title="衍生视频广场" 
              action="进入广场" 
              onActionClick={() => { setActiveTab('video_plaza'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
               {VIDEO_FEED.map(video => (
                 <div key={video.id} className="bg-white rounded-xl overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow border border-slate-100">
                    <div className={`h-40 w-full ${video.cover} relative flex items-center justify-center`}><div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all"><Play size={16} fill="currentColor" /></div><div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">03:24</div></div>
                    <div className="p-3"><h4 className="font-bold text-slate-800 text-sm mb-1 truncate">{video.title}</h4><div className="flex items-center justify-between text-xs text-slate-400"><div className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-slate-200"></div>{video.author}</div><span>{video.views} 播放</span></div></div>
                 </div>
               ))}
            </div>

            {/* Live Feed */}
            <div ref={liveSectionRef}>
              <SectionHeader title="直播广场" action="进入直播" isActive={activeTab === 'live'} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {LIVE_FEED.map(live => (
                  <div key={live.id} className="bg-white rounded-xl overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow border border-slate-100 relative">
                    <div className={`h-40 w-full ${live.cover} relative flex items-center justify-between px-4 py-3`}>
                      <div className="flex flex-col justify-between h-full py-1">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div><span className="text-[11px] font-bold text-white/90 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur">直播中</span></div>
                        <div className="space-y-1"><div className="text-xs text-white/80 flex items-center gap-1"><Radio size={14} className="opacity-90" /><span>{live.tag}</span></div><div className="flex items-center gap-2 text-[11px] text-white/80"><div className="w-5 h-5 rounded-full bg-white/20 border border-white/40"></div><span>{live.host}</span></div></div>
                      </div>
                      <div className="flex flex-col items-end justify-between h-full py-1"><div className="text-[10px] text-white/80 bg-black/30 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1"><Users size={12} /><span>{live.viewers} 人</span></div><div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur flex items-center justify-center group-hover:scale-105 transition-transform"><Play size={18} fill="currentColor" className="text-white" /></div></div>
                    </div>
                    <div className="p-3"><h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-2">{live.title}</h4><div className="flex items-center justify-between text-[11px] text-slate-400"><span className="flex items-center gap-1"><Clock size={12} /><span>正在进行</span></span><span className="flex items-center gap-1"><MessageSquare size={12} /><span>互动热烈</span></span></div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Feed */}
            <div ref={communitySectionRef}>
              <SectionHeader title="社区广场" action="进入社区" isActive={activeTab === 'community'} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                {COMMUNITY_FEED.map(post => (
                  <div key={post.id} className="bg-white rounded-xl p-4 border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all cursor-pointer flex flex-col gap-3">
                    <div className="flex items-center justify-between"><span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center gap-1"><Globe size={12} />{post.tag}</span><span className="text-[11px] text-slate-400 flex items-center gap-1"><User size={12} />{post.author}</span></div>
                    <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2">{post.title}</h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1"><div className="flex items-center gap-3"><span className="flex items-center gap-1 hover:text-indigo-500 transition-colors"><MessageSquare size={12} /><span>{post.replies} 条回复</span></span><span className="flex items-center gap-1 hover:text-rose-500 transition-colors"><Heart size={12} /><span>{post.likes}</span></span></div><button className="px-2 py-1 rounded-full bg-slate-50 text-[11px] text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-1 transition-colors"><ChevronRight size={12} /><span>查看详情</span></button></div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans selection:bg-indigo-100 selection:text-indigo-700 pb-20">
      <GlobalStyles />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderMainContent()}

      {/* Global Overlays */}
      {selectedAgent && !isCalling && (
        <AgentDetailModal 
          agent={selectedAgent} 
          onClose={handleCloseAgentDetail} 
          onStartCall={handleStartCall}
        />
      )}

      {isCalling && selectedAgent && (
        <CallInterface 
          agent={selectedAgent} 
          onClose={handleEndCall} 
        />
      )}
    </div>
  );
}