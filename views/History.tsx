import React, { useState, useMemo } from 'react';
import { History, Phone, Radio, Globe, Clock, FileText, ChevronRight } from 'lucide-react';
import { MOCK_AGENTS, LIVE_FEED, COMMUNITY_FEED } from '../constants';

const HistoryInterface = () => {
  const [activeSection, setActiveSection] = useState<'calls' | 'live' | 'community'>('calls');
  const SECTIONS = useMemo(() => [
    { id: 'calls' as const, label: '语音通话', icon: Phone },
    { id: 'live' as const, label: '直播间', icon: Radio },
    { id: 'community' as const, label: '社区浏览', icon: Globe },
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

export default HistoryInterface;