import React from 'react';
import { ArrowLeft, MessageSquare, Heart, Share2, Search, Edit3, Star, User, Image as ImageIcon } from 'lucide-react';
import { MOCK_AGENTS } from '../constants';

const CommunityForumInterface = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-950 pt-20 animate-in fade-in duration-300">
      {/* Tieba Header / Bar Info */}
      <div className="h-48 relative w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1920&auto=format&fit=crop" alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-16 z-10 pb-12">
        {/* Bar Identity */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6 mb-8">
            <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-2xl flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=300&auto=format&fit=crop" alt="Icon" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className="flex-1 mb-2">
                <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-bold text-white">AetherVoice 吧</h1>
                    <button className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-full flex items-center gap-1 transition-colors shadow-lg">
                        <Heart size={14} fill="currentColor" /> + 关注
                    </button>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-bold rounded border border-yellow-500/30">LV.12 赛博居民</span>
                </div>
                <div className="text-slate-300 text-sm flex items-center gap-6">
                    <span>关注: <span className="text-white font-bold">128.5W</span></span>
                    <span>帖子: <span className="text-white font-bold">3,492W</span></span>
                    <span className="text-slate-400">未来的声音，由你创造。AetherVoice 官方社区。</span>
                </div>
            </div>
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all">
                    <Edit3 size={16} /> 发帖
                </button>
                <button className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors">
                    <Search size={20} />
                </button>
            </div>
        </div>

        {/* Main Layout: Left Content + Right Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: Thread List */}
            <div className="flex-1">
                {/* Filters */}
                <div className="bg-slate-900 rounded-t-xl border-b border-slate-800 p-4 flex items-center gap-6 text-sm font-bold">
                    <button className="text-indigo-400 border-b-2 border-indigo-500 pb-4 -mb-4">全部</button>
                    <button className="text-slate-400 hover:text-slate-200 transition-colors">精品</button>
                    <button className="text-slate-400 hover:text-slate-200 transition-colors">官方公告</button>
                    <button className="text-slate-400 hover:text-slate-200 transition-colors">二创作品</button>
                </div>

                {/* List */}
                <div className="bg-slate-900 rounded-b-xl border border-slate-800 min-h-[500px]">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="p-5 border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-200 mb-2 group-hover:text-indigo-400 transition-colors line-clamp-1">
                                        {item === 1 ? '【置顶】关于 AetherVoice 创作者激励计划的最新说明 (V2.0)' : 
                                         item === 2 ? 'Seraphina 的新模型太强了吧？昨晚聊了一整夜被治愈哭了...' :
                                         '萌新求助：如何调整 Prompt 让 Agent 说话更像傲娇大小姐？'}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                                        {item === 1 ? '各位创作者好，为了鼓励更多优质内容的产出，我们对激励计划进行了全面升级。新增了“新人扶持赛道”和“技术创新奖”，具体规则如下...' : 
                                         '之前一直觉得 AI 说话有点生硬，但是更新后的 V3 模型简直是质的飞跃。特别是情感反馈模块，她居然能听出我语气里的犹豫...'}
                                    </p>
                                    
                                    {/* Image Grid Preview (Conditional) */}
                                    {item % 2 === 0 && (
                                        <div className="flex gap-2 mb-3">
                                            <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=200&auto=format&fit=crop" alt="preview" className="w-32 h-24 object-cover rounded-lg border border-slate-700/50" />
                                            <img src="https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=200&auto=format&fit=crop" alt="preview" className="w-32 h-24 object-cover rounded-lg border border-slate-700/50" />
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-slate-400"><User size={12}/></div>
                                            <span className="hover:underline hover:text-slate-300">CyberUser_{item}077</span>
                                        </div>
                                        <span>2小时前</span>
                                        <div className="flex items-center gap-1"><MessageSquare size={12} /> {item * 42}</div>
                                    </div>
                                </div>
                                <div className="hidden sm:block text-center min-w-[60px]">
                                    <div className="bg-slate-800 rounded-lg py-2 px-1 text-slate-400 font-mono text-sm">
                                        <div className="font-bold text-slate-300">{item * 42}</div>
                                        <div className="text-[10px] scale-90">回复</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Pagination Mock */}
                    <div className="p-6 flex justify-center gap-2">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">1</button>
                        <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-lg text-sm font-bold hover:bg-slate-700">2</button>
                        <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-lg text-sm font-bold hover:bg-slate-700">3</button>
                        <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-lg text-sm font-bold hover:bg-slate-700">下一页</button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-80 space-y-6">
                
                {/* Sign In Card */}
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-bold text-slate-200">
                            <div>01月24日</div>
                            <div className="text-xs text-slate-500 font-normal">漏签 0 天</div>
                        </div>
                        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-sm shadow-lg shadow-indigo-500/20">
                            签到
                        </button>
                    </div>
                    <div className="text-xs text-center text-slate-500 pt-3 border-t border-slate-800">
                        本吧排名: <span className="text-orange-500 font-bold">TOP 3</span>
                    </div>
                </div>

                {/* Bar Managers */}
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                    <h3 className="text-sm font-bold text-slate-200 mb-4 border-l-4 border-indigo-500 pl-2">吧务团队</h3>
                    <div className="space-y-3">
                        {MOCK_AGENTS.slice(0, 3).map(agent => (
                            <div key={agent.id} className="flex items-center gap-3">
                                <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
                                <div>
                                    <div className="text-sm font-bold text-indigo-400 flex items-center gap-1">
                                        {agent.name} <Star size={10} fill="currentColor" />
                                    </div>
                                    <div className="text-xs text-slate-500">大吧主</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hot Topics */}
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                    <h3 className="text-sm font-bold text-slate-200 mb-4 border-l-4 border-rose-500 pl-2">全站热议</h3>
                    <div className="space-y-3">
                        {['Agent 生成大赛结果公布', '赛博朋克 2077 DLC 联动确认', 'OpenAI 发布新模型 Sora', '虚拟偶像 Seraphina 演唱会'].map((topic, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                                <span className={`w-4 h-4 flex items-center justify-center rounded text-[10px] font-bold flex-shrink-0 mt-0.5 ${i < 3 ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-400'}`}>{i+1}</span>
                                <span className="text-slate-300 hover:text-indigo-400 cursor-pointer hover:underline line-clamp-2">{topic}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ad Placeholder */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-800 text-center py-8">
                    <div className="text-slate-600 text-xs uppercase tracking-widest font-bold">Ad Space</div>
                </div>

            </div>

        </div>
      </div>

      <button onClick={onBack} className="fixed bottom-8 left-8 p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full border border-slate-700 shadow-xl z-50 group">
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default CommunityForumInterface;