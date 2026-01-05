import React, { useState } from 'react';
import { ArrowLeft, Gamepad2, Briefcase, Sparkles, Building2, MapPin, Cpu } from 'lucide-react';
import { MOCK_AGENTS, BUSINESS_SOLUTIONS_DATA } from '../constants';
import { AgentCard, SolutionArch } from '../components/Shared';

const LeaderboardInterface = ({ onBack }: { onBack: () => void }) => {
  const [activeSegment, setActiveSegment] = useState<'consumer' | 'business'>('consumer');

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 md:px-10 pb-20 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-slate-100">Agent 榜单中心</h1>
        </div>

        <div className="flex justify-center mb-10">
           <div className="bg-slate-900 p-1 rounded-full border border-slate-800 shadow-sm flex items-center">
              <button 
                onClick={() => setActiveSegment('consumer')}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeSegment === 'consumer' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-200'}`}
              >
                 <Gamepad2 size={16}/> 个人娱乐 (C-End)
              </button>
              <button 
                onClick={() => setActiveSegment('business')}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeSegment === 'business' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-200'}`}
              >
                 <Briefcase size={16}/> 企业服务 (B-End)
              </button>
           </div>
        </div>

        <div className="animate-in slide-in-up duration-300">
           {activeSegment === 'consumer' && (
              <div>
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                       <Sparkles className="text-yellow-500" /> 本周热门娱乐 Agent
                    </h2>
                    <span className="text-xs text-slate-500">数据更新于 10分钟前</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...MOCK_AGENTS, ...MOCK_AGENTS].map((agent, i) => (
                       <AgentCard key={`${agent.id}-${i}`} agent={agent} onClick={() => {}} />
                    ))}
                 </div>
                 <div className="mt-12 p-8 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl text-white text-center border border-indigo-800">
                    <h3 className="text-2xl font-bold mb-2">找不到喜欢的？</h3>
                    <p className="opacity-70 mb-6">快来创作属于你自己的独一无二的 Agent 吧！</p>
                    <button className="px-6 py-2 bg-white text-indigo-900 rounded-full font-bold hover:bg-slate-200 transition-colors">
                       去创作中心
                    </button>
                 </div>
              </div>
           )}

           {activeSegment === 'business' && (
              <div className="space-y-8">
                 <div className="bg-slate-900 text-white p-8 rounded-3xl mb-8 relative overflow-hidden border border-slate-800">
                    <div className="relative z-10">
                       <h2 className="text-2xl md:text-3xl font-bold mb-3">企业级 Agent 解决方案</h2>
                       <p className="text-slate-400 max-w-2xl mb-6">为您的企业量身定制 AI 劳动力。从智能客服到自动化办公，我们提供安全、可控、高效的行业解决方案。</p>
                       <div className="flex gap-3">
                          <button className="px-5 py-2 bg-indigo-600 rounded-lg font-bold hover:bg-indigo-500 transition-colors">联系商务顾问</button>
                          <button className="px-5 py-2 bg-white/10 border border-white/20 rounded-lg font-bold hover:bg-white/20 transition-colors">查看客户案例</button>
                       </div>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-900/50 to-transparent"></div>
                    <Building2 className="absolute -right-6 -bottom-6 w-48 h-48 text-white/5" />
                 </div>

                 <div className="grid grid-cols-1 gap-6">
                    {BUSINESS_SOLUTIONS_DATA.map(sol => (
                       <div key={sol.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:shadow-lg transition-all hover:border-indigo-900/50">
                          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                             <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                   <div className={`w-12 h-12 rounded-xl bg-${sol.color}-900/30 flex items-center justify-center text-${sol.color}-400`}>
                                      <sol.icon size={24} />
                                   </div>
                                   <div>
                                      <h3 className="text-lg font-bold text-slate-200">{sol.title}</h3>
                                      <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">企业版 PRO</span>
                                   </div>
                                </div>
                                <p className="text-slate-400 mb-6">{sol.desc}</p>
                                <div className="space-y-4">
                                   <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> 业务场景</h4>
                                      <p className="text-sm text-slate-300">{sol.scenario}</p>
                                   </div>
                                   <div>
                                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><Cpu size={12}/> 技术解决方案</h4>
                                      <p className="text-sm text-slate-400 leading-relaxed">{sol.tech}</p>
                                   </div>
                                </div>
                             </div>
                             <div className="w-full md:w-1/3 bg-slate-800/50 rounded-xl p-6 flex flex-col justify-center border border-slate-800">
                                <h4 className="text-xs font-bold text-slate-500 text-center mb-4">架构示意图</h4>
                                <SolutionArch type={sol.archType} />
                                <div className="mt-6 text-center">
                                   <button className="text-xs font-bold text-indigo-400 hover:underline">查看详细技术文档 →</button>
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

export default LeaderboardInterface;