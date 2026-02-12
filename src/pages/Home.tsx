import React from 'react';
import { 
  Youtube, 
  Instagram, 
  Twitter, 
  Coffee, 
  Globe, 
  Heart, 
  Radio 
} from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData'; // 경로 확인 필요
import { Member } from '../types'; // 경로 확인 필요

// --- [1] 공식 링크 데이터 ---

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  gradient: string;
  url: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Globe className="w-6 h-6" />,
    label: 'Official Site',
    gradient: 'from-indigo-300 to-cyan-300',
    url: 'https://stellive.me/',
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    label: 'Cafe',
    gradient: 'from-orange-300 to-yellow-300',
    url: 'https://cafe.naver.com/tteokbokk1',
  },
  {
    icon: <Youtube className="w-6 h-6" />,
    label: 'YouTube',
    gradient: 'from-pink-300 to-red-300',
    url: 'https://www.youtube.com/@stellive_official',
  },
  {
    icon: <Twitter className="w-6 h-6" />,
    label: 'X',
    gradient: 'from-blue-300 to-purple-300',
    url: 'https://x.com/StelLive_kr',
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    label: 'Instagram',
    gradient: 'from-purple-300 to-pink-300',
    url: 'https://www.instagram.com/officialstellive/',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    label: 'Fanding',
    gradient: 'from-rose-300 to-pink-300',
    url: 'https://fanding.kr/@stellive/',
  },
];

// --- [2] 공식 링크 및 푸터 컴포넌트 ---

function OfficialLinks() {
  // 현재 연도를 자동으로 가져옵니다 (2026, 2027... 자동으로 변경됨)
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100/50 w-full">
      <h4 className="text-center text-gray-800 mb-5 font-bold text-lg">Official Links</h4>

      {/* 아이콘 버튼 영역 */}
      <div className="flex justify-center gap-4 flex-wrap">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center gap-2"
            aria-label={link.label}
          >
            {/* Icon Circle */}
            <div className="relative w-14 h-14 rounded-full bg-white shadow-md hover:shadow-xl transition-all overflow-hidden group-hover:scale-110 duration-300 border border-purple-50">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-purple-400 group-hover:text-white transition-colors z-10">
                {link.icon}
              </div>
            </div>

            {/* Label */}
            <span className="text-xs text-gray-500 group-hover:text-purple-600 transition-colors font-medium">
              {link.label}
            </span>
          </a>
        ))}
      </div>

      {/* --- Footer Text (오해 소지 없도록 명확히 수정됨) --- */}
      <div className="text-center mt-8 pt-6 border-t border-purple-100/80">
        <p className="text-sm text-gray-700 font-medium mb-1">
          Made with 💜 by Fans
        </p>
        
        {/* 비공식 사이트임을 명확히 알리는 문구 */}
        <p className="text-[11px] text-gray-500 leading-relaxed">
          본 사이트는 팬이 운영하는 <b>비공식 팬 사이트</b>입니다.<br className="hidden sm:block"/>
          소속사(Stellive)와 직접적인 관련이 없으며 수익을 창출하지 않습니다.
        </p>

        {/* 저작권 표시 (자동 연도 적용) */}
        <div className="mt-3 text-[10px] text-gray-400">
          <p>© {currentYear} Fan Community. All rights reserved.</p>
          <p className="mt-0.5">Streamer IP & Assets belongs to Stellive.</p>
        </div>
      </div>
    </div>
  );
}

// --- [3] 메인 Home 페이지 ---

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

      {/* 2. 공식 링크 모음 (PC/Mobile 공통 노출) */}
      <div className="w-full max-w-3xl px-4">
        <OfficialLinks />
      </div>

      {/* 3. 모바일 전용 Live 리스트 (md:hidden - 768px 미만에서만 보임) */}
      <div className="w-full max-w-md md:hidden px-4">
        <div className="flex items-center gap-2 mb-4 ml-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-widest">
              Live Now
            </h2>
        </div>

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
    </div>
  );
}
