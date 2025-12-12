import React from 'react';
import { ArrowLeft, Play, MonitorPlay, ChevronRight } from 'lucide-react';
import { VIDEO_PLAZA_DATA, MOCK_AGENTS } from '../constants';
import { Agent } from '../types';

const VideoPlazaInterface = ({ onBack, onAgentClick }: { onBack: () => void, onAgentClick: (agent: Agent) => void }) => {
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

export default VideoPlazaInterface;