import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MoreHorizontal, Play, Radio, Users, Clock, MessageSquare, Globe, User, Heart, ChevronRight } from 'lucide-react';
import GlobalStyles from './components/GlobalStyles';
import { Navbar, HeroBanner, SectionHeader, AgentCard } from './components/Shared';
import { CallInterface, AgentDetailModal } from './components/Overlays';
import { CATEGORIES, MOCK_AGENTS, VIDEO_FEED, LIVE_FEED, COMMUNITY_FEED } from './constants';
import { Agent, Banner } from './types';

// View Imports
import LeaderboardInterface from './views/Leaderboard';
import VideoPlazaInterface from './views/VideoPlaza';
import ActivityDetailInterface from './views/ActivityDetail';
import CreateAgentInterface from './views/Creator';
import HistoryInterface from './views/History';
import CommunityForumInterface from './views/CommunityForum';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Banner | null>(null); 
  const [isCalling, setIsCalling] = useState(false);

  // Refs for scroll and anchor navigation
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const liveSectionRef = useRef<HTMLDivElement>(null);
  const communitySectionRef = useRef<HTMLDivElement>(null);

  // Handlers
  const handleAgentClick = useCallback((agent: Agent) => {
    setSelectedAgent(agent);
  }, []);

  const handleBannerClick = useCallback((activity: Banner) => {
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

  const scrollToSection = useCallback((ref: React.RefObject<HTMLDivElement>) => {
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
        return selectedActivity ? <ActivityDetailInterface activity={selectedActivity} onBack={() => setActiveTab('home')} /> : null;
      case 'leaderboard':
        return <LeaderboardInterface onBack={() => setActiveTab('home')} />;
      case 'video_plaza':
        return <VideoPlazaInterface onBack={() => setActiveTab('home')} onAgentClick={handleAgentClick} />;
      case 'community_forum':
        return <CommunityForumInterface onBack={() => setActiveTab('home')} />;
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
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-900 text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}
                >
                  {cat.label}
                </button>
              ))}
              <button className="w-8 h-8 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center shrink-0 hover:bg-slate-700 hover:text-slate-300"><MoreHorizontal size={16} /></button>
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
                 <div key={video.id} className="bg-slate-900 rounded-xl overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10 transition-all border border-slate-800">
                    <div className="h-40 w-full relative flex items-center justify-center overflow-hidden">
                       <img src={video.cover} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                       <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all absolute"><Play size={16} fill="currentColor" /></div>
                       <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] px-1.5 py-0.5 rounded font-mono border border-white/10">03:24</div>
                    </div>
                    <div className="p-3"><h4 className="font-bold text-slate-200 text-sm mb-1 truncate">{video.title}</h4><div className="flex items-center justify-between text-xs text-slate-500"><div className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-slate-700"></div>{video.author}</div><span>{video.views} 播放</span></div></div>
                 </div>
               ))}
            </div>

            {/* Live Feed */}
            <div ref={liveSectionRef}>
              <SectionHeader title="直播广场" action="进入直播" isActive={activeTab === 'live'} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {LIVE_FEED.map(live => (
                  <div key={live.id} className="bg-slate-900 rounded-xl overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10 transition-all border border-slate-800 relative">
                    <div className="h-40 w-full relative flex items-center justify-between px-4 py-3 overflow-hidden">
                      <img src={live.cover} alt={live.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                      
                      <div className="flex flex-col justify-between h-full py-1 relative z-10">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div><span className="text-[11px] font-bold text-white/90 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur">直播中</span></div>
                        <div className="space-y-1"><div className="text-xs text-white/80 flex items-center gap-1"><Radio size={14} className="opacity-90" /><span>{live.tag}</span></div><div className="flex items-center gap-2 text-[11px] text-white/80"><div className="w-5 h-5 rounded-full bg-white/20 border border-white/40"></div><span>{live.host}</span></div></div>
                      </div>
                      <div className="flex flex-col items-end justify-between h-full py-1 relative z-10"><div className="text-[10px] text-white/80 bg-black/30 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1"><Users size={12} /><span>{live.viewers} 人</span></div><div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur flex items-center justify-center group-hover:scale-105 transition-transform"><Play size={18} fill="currentColor" className="text-white" /></div></div>
                    </div>
                    <div className="p-3"><h4 className="font-bold text-slate-200 text-sm mb-1 line-clamp-2">{live.title}</h4><div className="flex items-center justify-between text-[11px] text-slate-500"><span className="flex items-center gap-1"><Clock size={12} /><span>正在进行</span></span><span className="flex items-center gap-1"><MessageSquare size={12} /><span>互动热烈</span></span></div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Feed */}
            <div ref={communitySectionRef}>
              <SectionHeader 
                title="社区广场" 
                action="进入社区" 
                isActive={activeTab === 'community'} 
                onActionClick={() => { setActiveTab('community_forum'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                {COMMUNITY_FEED.map(post => (
                  <div key={post.id} className="bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-indigo-800 hover:shadow-md hover:shadow-indigo-500/5 transition-all cursor-pointer flex flex-col gap-3">
                    <div className="flex items-center justify-between"><span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-900/30 text-indigo-400 font-bold flex items-center gap-1"><Globe size={12} />{post.tag}</span><span className="text-[11px] text-slate-500 flex items-center gap-1"><User size={12} />{post.author}</span></div>
                    <h4 className="text-sm font-bold text-slate-200 leading-snug line-clamp-2">{post.title}</h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1"><div className="flex items-center gap-3"><span className="flex items-center gap-1 hover:text-indigo-400 transition-colors"><MessageSquare size={12} /><span>{post.replies} 条回复</span></span><span className="flex items-center gap-1 hover:text-rose-500 transition-colors"><Heart size={12} /><span>{post.likes}</span></span></div><button className="px-2 py-1 rounded-full bg-slate-800 text-[11px] text-slate-400 hover:bg-indigo-900/50 hover:text-indigo-400 flex items-center gap-1 transition-colors"><ChevronRight size={12} /><span>查看详情</span></button></div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pb-20">
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