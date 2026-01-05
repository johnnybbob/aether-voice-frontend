import React from 'react';
import { Calendar, MapPin, ArrowLeft, Sparkles, Gift, Ticket } from 'lucide-react';
import { Banner } from '../types';
import { MOCK_AGENTS } from '../constants';

const ActivityDetailInterface = ({ activity, onBack }: { activity: Banner, onBack: () => void }) => {
  if (!activity) return null;

  return (
    <div className="min-h-screen bg-slate-950 pt-20 animate-in fade-in duration-300">
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
        <div className="bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-800">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                 <section>
                    <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2"><Sparkles className={`text-${activity.themeColor}-500`} /> 活动介绍</h2>
                    <p className="text-slate-400 leading-relaxed text-lg">欢迎来到 {activity.posterTitle}！这不仅仅是一场活动，这是一次穿越数字与现实边界的探索之旅。在这里，你将见证最前沿的 AI 技术与艺术的完美融合。</p>
                 </section>
                 <section>
                    <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2"><Gift className={`text-${activity.themeColor}-500`} /> 独家权益</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {['限定 SSR 音色包', 'Pro 会员 30天体验卡', '专属 3D 虚拟形象配饰', '创作者社区 VIP 徽章'].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
                             <div className={`w-8 h-8 rounded-full bg-${activity.themeColor}-900 flex items-center justify-center text-${activity.themeColor}-400 font-bold`}>{i + 1}</div>
                             <span className="font-bold text-slate-300">{item}</span>
                          </div>
                       ))}
                    </div>
                 </section>
              </div>
              <div className="space-y-8">
                 <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
                    <div className="text-sm text-slate-500 mb-2">距离报名截止还有</div>
                    <div className="text-3xl font-black text-slate-100 font-mono mb-6">03 : 12 : 45</div>
                    <button className={`w-full py-4 rounded-xl bg-gradient-to-r ${activity.bgGradient} text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2`}><Ticket /> 立即报名</button>
                    <p className="text-xs text-slate-500 mt-4">已有 12,450 人报名参加</p>
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-200 mb-4">特邀嘉宾</h3>
                    <div className="space-y-3">
                       {MOCK_AGENTS.slice(0,3).map(agent => (
                          <div key={agent.id} className="flex items-center gap-3">
                             <img src={agent.avatar} className="w-10 h-10 rounded-full object-cover" alt="guest"/>
                             <div><div className="text-sm font-bold text-slate-200">{agent.name}</div><div className="text-xs text-slate-500">{agent.tagline}</div></div>
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

export default ActivityDetailInterface;