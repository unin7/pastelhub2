import React from 'react';
import { Radio } from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { Member } from '../types';

// --- [1] 공식 링크 컴포넌트 ---

function OfficialLinks() {
  const currentYear = new Date().getFullYear();

  // 스타일 변수 (유지)
  const containerStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    overflow: 'hidden',
    border: '1px solid #f3e8ff'
  };

  const iconWrapperStyle = {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#c084fc',
    zIndex: 10,
    transition: 'color 0.2s'
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100/50 w-full">
      <h4 className="text-center text-gray-800 mb-5 font-bold text-lg">Official Links</h4>

      <div className="flex justify-center gap-4 flex-wrap">
        
        {/* 1. Official Site */}
        <a href="https://stellive.me/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
          <div style={containerStyle} className="group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{ background: 'linear-gradient(to bottom right, #a5b4fc, #67e8f9)' }}>
            </div>
            <div style={iconWrapperStyle} className="group-hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
            </div>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-purple-600 font-medium">Official Site</span>
        </a>

        {/* 2. Cafe */}
        <a href="https://cafe.naver.com/tteokbokk1" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
          <div style={containerStyle} className="group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{ background: 'linear-gradient(to bottom right, #fdba74, #fde047)' }}>
            </div>
            <div style={iconWrapperStyle} className="group-hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>
            </div>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-purple-600 font-medium">Cafe</span>
        </a>

        {/* 3. YouTube */}
        <a href="https://www.youtube.com/@stellive_official" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
          <div style={containerStyle} className="group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{ background: 'linear-gradient(to bottom right, #f9a8d4, #fca5a5)' }}>
            </div>
            <div style={iconWrapperStyle} className="group-hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            </div>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-purple-600 font-medium">YouTube</span>
        </a>

        {/* 4. X (Twitter) */}
        <a href="https://x.com/StelLive_kr" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
          <div style={containerStyle} className="group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{ background: 'linear-gradient(to bottom right, #93c5fd, #d8b4fe)' }}>
            </div>
            <div style={iconWrapperStyle} className="group-hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            </div>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-purple-600 font-medium">X</span>
        </a>

        {/* 5. Instagram */}
        <a href="https://www.instagram.com/officialstellive/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
          <div style={containerStyle} className="group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{ background: 'linear-gradient(to bottom right, #d8b4fe, #f9a8d4)' }}>
            </div>
            <div style={iconWrapperStyle} className="group-hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-purple-600 font-medium">Instagram</span>
        </a>

        {/* 6. Fanding */}
        <a href="https://fanding.kr/@stellive/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
          <div style={containerStyle} className="group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{ background: 'linear-gradient(to bottom right, #fda4af, #f9a8d4)' }}>
            </div>
            <div style={iconWrapperStyle} className="group-hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-purple-600 font-medium">Fanding</span>
        </a>

      </div>

      {/* --- Footer Text --- */}
      {/* 4. 글자 변경 및 상단 패딩 추가 (mt-12 pt-8) */}
      <div className="text-center mt-12 pt-8 border-t border-purple-100/80">
        <p className="text-sm text-gray-700 font-medium mb-1">
          Made by Fan for Fan
        </p>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          본 사이트는 팬이 운영하는 <b>비공식 팬 사이트</b>입니다.<br className="hidden sm:block"/>
          소속사(Stellive)와 직접적인 관련이 없으며 수익을 창출하지 않습니다.
        </p>
        <div className="mt-3 text-[10px] text-gray-400">
          <p>© {currentYear} Fan Community. All rights reserved.</p>
          <p className="mt-0.5">Streamer IP & Assets belongs to Stellive.</p>
        </div>
      </div>
    </div>
  );
}

// --- [2] 메인 Home 페이지 ---

export default function Home() {
  const { data: members } = useJsonData<Member[]>('status');

  const liveMembers = members?.filter(
    (member) => member.status && member.status.toLowerCase().includes('live')
  ) || [];

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. 환영 문구 */}
      <div className="text-center space-y-3 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          Welcome to Fandom
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          팬덤을 위한 모든 정보가 한곳에 ✨<br/>
          공식 링크와 현재 방송 중인 멤버를 확인하세요.
        </p>
      </div>

      {/* 2. 모바일 전용 Live 리스트 (순서 변경: 이곳으로 이동됨) */}
      <div className="w-full max-w-md md:hidden px-4">
        
        {/* 2. 'Live Now' 글자 및 헤더 제거됨 */}
        
        {liveMembers.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {liveMembers.map((member, idx) => {
              const isXSpace = member.status === 'X_live';
              const badgeText = isXSpace ? "SPACE" : "LIVE";
              const ringGradient = isXSpace ? 'from-purple-400 to-pink-400' : 'from-emerald-400 to-teal-400';

              return (
                <a 
                  key={`${member.name}-${idx}`}
                  href={member.liveUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group flex items-center gap-4 p-3 rounded-2xl bg-white shadow-sm border border-slate-100 active:scale-[0.98] transition-all hover:shadow-md hover:border-purple-200"
                >
                  <div className={`relative flex-none w-[52px] h-[52px] rounded-full p-[2px] bg-gradient-to-br ${ringGradient}`}>
                    <img src={member.profileImg} alt={member.name} className="w-full h-full rounded-full object-cover bg-white" />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-slate-50">
                      {isXSpace ? <Radio size={12} className="text-purple-500"/> : <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"/>}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base font-bold text-slate-800 truncate group-hover:text-purple-600 transition-colors">
                          {member.name}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${isXSpace ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {badgeText}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate group-hover:text-slate-700">
                      {member.title || (isXSpace ? '스페이스 청취하기' : '방송 시청하기')}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-3 bg-slate-50/50 rounded-2xl border border-slate-100 border-dashed">
            <div className="p-3 bg-slate-100 rounded-full">
                <Radio className="size-6 text-slate-300" />
            </div>
            <span className="text-sm font-medium">현재 방송 중인 멤버가 없습니다</span>
          </div>
        )}
      </div>

      {/* 3. 공식 링크 모음 (순서 변경: 이곳으로 이동됨) */}
      <div className="w-full max-w-3xl px-4">
        <OfficialLinks />
      </div>

    </div>
  );
}
