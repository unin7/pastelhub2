import { 
  Radio, Youtube, Twitter, Coffee, 
  Globe, Instagram, Heart, ExternalLink 
} from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { Member } from '../types';

export default function Home() {
  const { data: members } = useJsonData<Member[]>('status');

  const liveMembers = members?.filter(
    (member) => member.status && member.status.toLowerCase().includes('live')
  ) || [];

  const officialLinks = [
    { name: '공식 사이트', url: 'https://stellive.me/', icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: '네이버 카페', url: 'https://cafe.naver.com/tteokbokk1', icon: Coffee, color: 'text-green-600', bg: 'bg-green-50' },
    { name: '유튜브', url: 'https://www.youtube.com/@stellive_official', icon: Youtube, color: 'text-red-600', bg: 'bg-red-50' },
    { name: '공식 X', url: 'https://x.com/StelLive_kr', icon: Twitter, color: 'text-slate-700', bg: 'bg-slate-100' },
    { name: '인스타그램', url: 'https://www.instagram.com/officialstellive/', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
    { name: '공식 팬딩', url: 'https://fanding.kr/@stellive/', icon: Heart, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="w-full h-full p-6 md:p-10 overflow-y-auto custom-scrollbar animate-in fade-in duration-500 flex flex-col">
      <div className="max-w-5xl mx-auto space-y-8 flex-1 w-full">
        
        {/* 1. Hero Section (환영 배너) */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F4F8FF] to-[#EFF6FF] border border-blue-50/50 p-8 shadow-sm">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              반가워요! <span className="text-pastel-blue">파스텔</span>님 ✨
            </h1>
            <p className="text-slate-500 text-sm md:text-base">
              스텔라이브의 모든 소식을 한눈에 확인하세요.
            </p>
          </div>
          <div className="absolute -right-4 -bottom-8 opacity-5 pointer-events-none">
            <Radio size={200} />
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 2. Live List (메인 콘텐츠) - 넓게 사용 */}
          <section className="md:col-span-8 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Radio className="text-red-500 animate-pulse" size={20} />
                On Air
              </h2>
            </div>
            
            {liveMembers.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {liveMembers.map((member, idx) => {
                   const isXSpace = member.status === 'X_live';
                   return (
                    <a key={idx} href={member.liveUrl} target="_blank" rel="noreferrer"
                      className="group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                      <img src={member.profileImg} alt={member.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-50 shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-lg text-slate-800">{member.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isXSpace ? 'bg-purple-100 text-purple-600' : 'bg-red-100 text-red-600'}`}>
                            {isXSpace ? 'SPACE' : 'LIVE'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 truncate">
                          {member.title || "방송 시청하기"}
                        </p>
                      </div>
                      <ExternalLink size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors hidden sm:block" />
                    </a>
                   )
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
                <Radio size={24} className="opacity-50" />
                <p className="text-sm">현재 방송 중인 멤버가 없습니다.</p>
              </div>
            )}
          </section>

          {/* 3. Official Links (PC: 오른쪽 사이드바 / Mobile: 하단 배치) */}
          <section className="md:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 px-1 flex items-center gap-2">
              <Globe size={18} /> Official Links
            </h3>
            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="grid grid-cols-2 gap-3">
                {officialLinks.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group gap-2 text-center"
                  >
                    <div className={`p-2.5 rounded-full ${link.bg} ${link.color} group-hover:scale-110 transition-transform`}>
                      <link.icon size={22} />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 4. Footer (명료한 비공식 명시) */}
      <footer className="mt-12 py-8 border-t border-slate-100 text-center">
        <p className="text-xs font-bold text-slate-400 mb-1">
          Pastel Hub (Unofficial Fan Site)
        </p>
        <p className="text-[11px] text-slate-300">
          본 서비스는 스텔라이브(STELLIVE) 공식 앱이 아닌 <span className="text-slate-400 font-medium">비공식 팬사이트</span>입니다.<br/>
          제공되는 모든 이미지 및 명칭의 저작권은 스텔라이브 및 각 권리자에게 있습니다.
        </p>
      </footer>
      
    </div>
  );
}
