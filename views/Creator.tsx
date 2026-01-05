import React from 'react';
import { ArrowLeft, FileText, Save, Camera, Settings, Sparkles, Music, Mic } from 'lucide-react';

const CreateAgentInterface = ({ onExit }: { onExit: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 md:px-10 pb-20 animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onExit} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400"><ArrowLeft size={24} /></button>
            <h1 className="text-2xl font-bold text-slate-100">创作新的 Agent</h1>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={onExit} className="px-5 py-2.5 rounded-full font-bold text-slate-400 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all text-sm flex items-center gap-2"><FileText size={16} /> 保存草稿</button>
             <button onClick={onExit} className="px-5 py-2.5 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all text-sm flex items-center gap-2"><Save size={16} /> 保存发布</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800 flex flex-col items-center">
               <div className="w-40 h-40 bg-slate-800 rounded-full mb-4 flex items-center justify-center border-2 border-dashed border-slate-700 text-slate-500 cursor-pointer hover:border-indigo-500 hover:text-indigo-500 transition-colors group"><Camera size={32} className="group-hover:scale-110 transition-transform"/></div>
               <p className="text-xs text-slate-500 mb-4">点击上传头像或生成 3D 形象</p>
               <input type="text" placeholder="给 TA 起个名字" className="w-full text-center text-lg font-bold border-b border-slate-800 focus:border-indigo-500 outline-none py-2 bg-transparent transition-colors text-slate-200 placeholder-slate-600" />
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800">
              <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2"><Settings size={18}/> 基础设定</h3>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">一句话介绍 (Tagline)</label><input type="text" className="w-full bg-slate-800 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-900 outline-none transition-all text-slate-200 placeholder-slate-600" placeholder="例如：赛博朋克心理咨询师" /></div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1.5">分类</label>
                   <div className="flex flex-wrap gap-2">{['情感', '助手', '游戏', '历史', '语言'].map(tag => (<span key={tag} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold hover:bg-indigo-900/50 hover:text-indigo-400 cursor-pointer border border-slate-700 transition-colors">{tag}</span>))}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800">
               <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2"><Sparkles size={18} className="text-indigo-500"/> 人设与 Prompt</h3>
               <div className="space-y-4">
                  <div><label className="block text-xs font-bold text-slate-500 mb-1.5">详细设定 (System Prompt)</label><textarea className="w-full h-40 bg-slate-800 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-900 outline-none transition-all resize-none font-mono text-slate-200 placeholder-slate-600" placeholder="在这里输入 Agent 的核心人设、说话风格、背景故事..."></textarea></div>
                  <div><label className="block text-xs font-bold text-slate-500 mb-1.5">开场白</label><input type="text" className="w-full bg-slate-800 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-900 outline-none transition-all text-slate-200 placeholder-slate-600" placeholder="初次见面时 TA 会说什么？" /></div>
               </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800">
               <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2"><Music size={18} className="text-rose-500"/> 声音配置</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border-2 border-indigo-500 bg-indigo-900/20 cursor-pointer relative"><div className="absolute top-2 right-2 text-indigo-500"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div></div><div className="font-bold text-indigo-300 mb-1">御姐音 - V3</div><div className="text-xs text-indigo-400">当前选择</div></div>
                  <div className="p-4 rounded-xl border border-slate-700 hover:border-indigo-500/50 cursor-pointer bg-slate-800 transition-all"><div className="font-bold text-slate-300 mb-1">元气少女 - V2</div><div className="text-xs text-slate-500">点击试听</div></div>
                  <div className="p-4 rounded-xl border border-slate-700 hover:border-indigo-500/50 cursor-pointer bg-slate-800 transition-all"><div className="font-bold text-slate-300 mb-1">磁性大叔 - V1</div><div className="text-xs text-slate-500">点击试听</div></div>
                  <div className="flex items-center justify-center p-4 rounded-xl border border-dashed border-slate-700 text-slate-500 hover:text-indigo-400 hover:border-indigo-500 cursor-pointer transition-all"><span className="text-sm font-bold flex items-center gap-1"><Mic size={16}/> 录制声音克隆</span></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgentInterface;