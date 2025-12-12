import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Users, Heart, ArrowLeft, Cpu, Layers, Briefcase, Zap, Search, Flame, Hash, 
  PenTool, Radio, Globe, History, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Agent, Banner } from '../types';
import { MOCK_AGENTS, BANNERS } from '../constants';

export const SectionHeader = React.memo(({ title, action = "查看全部", isActive = false, onActionClick }: { title: string, action?: string, isActive?: boolean, onActionClick?: () => void }) => (
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

export const AgentCard = React.memo(({ agent, onClick }: { agent: Agent, onClick: () => void }) => (
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

export const SolutionArch = ({ type }: { type: 'customer_service' | 'sales_assistant' | 'internal_training' }) => {
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

export const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
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

export const HeroBanner = ({ onBannerClick }: { onBannerClick: (banner: Banner) => void }) => {
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
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={24} /></button>
    </div>
  );
};