import { 
  Radio, Youtube, Instagram, Twitter, Coffee, 
  Globe, Heart
} from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { Member } from '../types';

export default function Home() {
  const { data: members } = useJsonData<Member[]>('status');

  const liveMembers = members?.filter(
    (member) => member.status && member.status.toLowerCase().includes('live')
  ) || [];

  // ✅ 공식 링크 데이터
  const socialLinks = [
    {
      icon: Globe,
      label: 'Official Site',
      url: 'https://stellive.me/',
      gradient: 'from-indigo-300 to-purple-300',
    },
    {
      icon: Coffee,
      label: 'Fan Cafe',
      url: 'https://cafe.naver.com/tteokbokk1',
      gradient: 'from-green-300 to-emerald-300',
    },
    {
      icon: Youtube,
      label: 'YouTube',
      url: 'https://www.youtube.com/@stellive_official',
      gradient: 'from-pink-300 to-red-300',
    },
    {
      icon: Twitter,
      label: 'X (Twitter)',
      url: 'https://x.com/StelLive_kr',
      gradient: 'from-gray-300 to-slate-400', 
    },
    {
      icon: Instagram,
      label: 'Instagram',
      url: 'https://www.instagram.com/officialstellive/',
      gradient: 'from-purple-300 to-pink-300',
    },
    {
      icon: Heart,
      label: 'Fanding',
      url: 'https://fanding.kr/@stellive/',
      gradient: 'from-orange-300 to-yellow-300',
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar animate-in fade-in duration-500">
      <div className="flex flex-col items-center py-12 space-y-10 min-h-full">
        
        {/* 1. 공통 환영 문구 */}
        <div className="text-center space-y-3 px-4 shrink-0">
          <p className="text-slate-700 text-xl md:text-2xl font-bold">
            팬덤을 위한 모든 정보가 한곳에 ✨
          </p>
          <p className="text-slate-500 text-sm md:text-base">
            상단 메뉴나 사이드바를 통해 원하는 정보를 확인하세요.
          </p>
        </div>

        {/* 2. [모바일 전용] Live 리스트 (헤더 텍스트 삭제됨) */}
        <div className="w-full max-w-md md:hidden px-4 shrink-0">
          {liveMembers.length > 0 ? (
            <div className="space-y-3">
              {/* ✅ "Live Now" 텍스트/아이콘 삭제됨, 바로 리스트 출력 */}
              <div className="grid grid-cols-1 gap-3">
                {liveMembers.map((member, idx) => {
                  const isXSpace = member.status === 'X_live';
                  const badgeText = isXSpace ? "SPACE" : "LIVE";
                  const ringGradient = isXSpace ? 'from-pink-400 to-purple-400' : 'from-emerald-400 to-teal-400';

                  return (
                    <a 
                      key={`${member.name}-${idx}`}
                      href={member.liveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-white shadow-sm border border-slate-100 active:scale-[0.98] transition-all"
                    >
                      <div className={`relative flex-none w-[48px] h-[48px] rounded-full p-[2px] bg-gradient-to-br ${ringGradient}`}>
                        <img src={member.profileImg} alt={member.name} className="w-full h-full rounded-full object-cover bg-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[15px] font-bold text-slate-800 truncate">{member.name}</span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isXSpace ? 'bg-purple-50 text-purple-600' : 'bg-red-50 text-red-600 animate-pulse'}`}>
                            {badgeText}
                          </span>
                        </div>
                        <p className="text-[13px] text-slate-500 truncate">
                          {member.title || (isXSpace ? '스페이스 청취하기' : '방송 시청하기')}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400 space-y-2 opacity-80">
              <Radio className="size-8 mb-1" />
              <span className="text-sm font-medium">현재 방송 중인 멤버가 없습니다</span>
            </div>
          )}
        </div>

        {/* 3. [PC 전용] Official Links */}
        {/* ✅ md:block 유지하되, 레이아웃 간섭 없도록 구조 단순화 */}
        <div className="hidden md:block w-full max-w-3xl px-6 shrink-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100/50">
            <h4 className="text-center text-slate-800 font-bold text-lg mb-8">Official Links</h4>

            <div className="flex justify-center gap-6 flex-wrap">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div className="relative w-16 h-16 rounded-full bg-white shadow-md hover:shadow-xl transition-all overflow-hidden group-hover:scale-110 duration-300 border border-slate-50">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors z-10">
                      <link.icon className="w-7 h-7" />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-500 group-hover:text-purple-600 transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 4. [공통] Footer */}
        {/* ✅ 글자 크기 확대 (text-[10px] -> text-xs/sm) */}
        <div className="text-center space-y-1.5 pt-6 px-4 shrink-0 pb-10">
          <p className="text-base text-slate-600 font-bold">
            Made with 💜 by Fans, for Fans
          </p>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
            © 2025 Fan Community. All rights reserved. <br/>
            This is an unofficial fan application.
          </p>
        </div>

      </div>
    </div>
  );
}
