import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, Smile, MicOff, Mic, Video, Phone, MoreHorizontal, Sparkles, Download, 
  User, Film, Users, Heart, MessageSquare, Share2, Settings, Play, ThumbsUp, Lock, Clock,
  Zap, Music
} from 'lucide-react';
import { Agent } from '../types';

export const CallInterface = ({ agent, onClose }: { agent: Agent, onClose: () => void }) => {
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

export const AgentDetailModal = ({ agent, onClose, onStartCall }: { agent: Agent, onClose: () => void, onStartCall: () => void }) => {
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
