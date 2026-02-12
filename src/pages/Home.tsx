import React from 'react';
import { 
  Youtube, 
  Instagram, 
  Twitter, 
  Coffee, 
  Globe, 
  Heart 
} from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData'; 
import { Member } from '../types'; 

// --- [공식 링크 및 푸터 컴포넌트] ---
// 복잡한 배열/인터페이스 다 제거하고 바로 작성합니다.

function OfficialLinks() {
  const currentYear = new Date().getFullYear();

  // 공통으로 쓰이는 디자인 클래스를 변수로 빼두면 코드가 좀 더 깔끔해집니다.
  const linkItemClass = "group relative flex flex-col items-center gap-2";
  const iconCircleClass = "relative w-14 h-14 rounded-full bg-white shadow-md hover:shadow-xl transition-all overflow-hidden group-hover:scale-110 duration-300 border border-purple-50";
  const iconWrapperClass = "absolute inset-0 flex items-center justify-center text-purple-400 group-hover:text-white transition-colors z-10";
  const labelClass = "text-xs text-gray-500 group-hover:text-purple-600 transition-colors font-medium";

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100/50 w-full">
      <h4 className="text-center text-gray-800 mb-5 font-bold text-lg">Official Links</h4>

      {/* 아이콘 버튼 영역 */}
      <div className="flex justify-center gap-4 flex-wrap">
        
        {/* 1. Official Site */}
        <a href="https://stellive.me/" target="_blank" rel="noopener noreferrer" className={linkItemClass}>
          <div className={iconCircleClass}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className={iconWrapperClass}>
              <Globe className="w-6 h-6" />
            </div>
          </div>
          <span className={labelClass}>Official Site</span>
        </a>

        {/* 2. Cafe */}
        <a href="https://cafe.naver.com/tteokbokk1" target="_blank" rel="noopener noreferrer" className={linkItemClass}>
          <div className={iconCircleClass}>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className={iconWrapperClass}>
              <Coffee className="w-6 h-6" />
            </div>
          </div>
          <span className={labelClass}>Cafe</span>
        </a>

        {/* 3. YouTube */}
        <a href="https://www.youtube.com/@stellive_official" target="_blank" rel="noopener noreferrer" className={linkItemClass}>
          <div className={iconCircleClass}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className={iconWrapperClass}>
              <Youtube className="w-6 h-6" />
            </div>
          </div>
          <span className={labelClass}>YouTube</span>
        </a>

        {/* 4. X (Twitter) */}
        <a href="https://x.com/StelLive_kr" target="_blank" rel="noopener noreferrer" className={linkItemClass}>
          <div className={iconCircleClass}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className={iconWrapperClass}>
              <Twitter className="w-6 h-6" />
            </div>
          </div>
          <span className={labelClass}>X</span>
        </a>

        {/* 5. Instagram */}
        <a href="https://www.instagram.com/officialstellive/" target="_blank" rel="noopener noreferrer" className={linkItemClass}>
          <div className={iconCircleClass}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className={iconWrapperClass}>
              <Instagram className="w-6 h-6" />
            </div>
          </div>
          <span className={labelClass}>Instagram</span>
        </a>

        {/* 6. Fanding */}
        <a href="https://fanding.kr/@stellive/" target="_blank" rel="noopener noreferrer" className={linkItemClass}>
          <div className={iconCircleClass}>
            <div className="absolute inset-0 bg-gradient-to-br from-rose-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className={iconWrapperClass}>
              <Heart className="w-6 h-6" />
            </div>
          </div>
          <span className={labelClass}>Fanding</span>
        </a>

      </div>

      {/* --- Footer Text --- */}
      <div className="text-center mt-8 pt-6 border-t border-purple-100/80">
        <p className="text-sm text-gray-700 font-medium mb-1">
          Made with 💜 by Fans
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

// --- [메인 페이지] ---

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
      
      {/* 2. 공식 링크 모음 */}
      <div className="w-full max-w-3xl px-4">
        <OfficialLinks />
      </div>
    </div>
  );
}
