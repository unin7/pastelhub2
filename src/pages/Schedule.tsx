import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Info, Music, Gift, Radio, PartyPopper } from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { ScheduleItem } from '../types';
import CalendarBoard from './CalendarBoard';

const monthNames = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];

export default function Schedule() {
  const { data: schedules } = useJsonData<ScheduleItem[]>('schedules');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); 
  const [selectedEvent, setSelectedEvent] = useState<ScheduleItem | null>(null);

  useEffect(() => {
    if (schedules && schedules.length > 0 && !selectedEvent) {
      setSelectedEvent(schedules[0]);
    }
  }, [schedules]);

  // 아이콘 헬퍼 함수
  const getEventIcon = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'birthday': return <Gift className="w-full h-full p-2" />;
      case 'album': return <Music className="w-full h-full p-2" />;
      case 'concert': return <CalendarIcon className="w-full h-full p-2" />;
      case 'broadcast': return <Radio className="w-full h-full p-2" />;
      case 'event': return <PartyPopper className="w-full h-full p-2" />;
      default: return <CalendarIcon className="w-full h-full p-2" />;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50/50 flex flex-col items-center justify-center overflow-hidden">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* [레이아웃 핵심 수정: All Grid]
        - display: flex 제거 -> grid로 통일
        
        1. Mobile (기본):
           - grid-cols-1 : 가로 1칸
           - grid-rows-[auto_1fr] : 첫 줄(달력)은 내용만큼, 둘째 줄(상세)은 남은 공간 전부
           - h-full, w-full : 화면 전체 사용
           
        2. PC (md 이상):
           - md:grid-cols-4 : 가로 4칸 (좌1:중2:우1 비율용)
           - md:grid-rows-1 : 세로 1줄로 변경
           - md:h-[560px] : 높이 고정
      */}
      <div 
        className="
          w-full h-full p-4 gap-4
          grid grid-cols-1 grid-rows-[auto_1fr]
          md:grid-cols-4 md:grid-rows-1 md:gap-6 md:max-w-[1400px] md:min-w-[1000px] md:h-[560px] md:p-0
        "
      >
        
        {/* 1. [좌측] 상세 정보 (PC 전용)
           - Mobile: hidden
           - PC: block, col-span-1
        */}
        <div className="hidden md:flex md:col-span-1 h-full bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex-col justify-center text-center relative overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center w-full pt-8 pb-8">
               <div className="w-24 h-24 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-500 mb-8 border border-purple-50">
                {getEventIcon(selectedEvent.type)}
              </div>
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-purple-50 text-purple-600 text-[11px] font-bold uppercase tracking-widest border border-purple-100">
                {selectedEvent.type}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight px-1 w-full break-keep">
                {selectedEvent.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed px-1 break-keep line-clamp-4 mb-8">
                {selectedEvent.description}
              </p>
              <div className="w-full bg-white/60 rounded-3xl p-5 text-left border border-white/80 space-y-4 shadow-sm mt-auto">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
                    <CalendarIcon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Date</p>
                    <p className="text-sm font-bold text-gray-700 mt-0.5 truncate">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Location</p>
                    <p className="text-sm font-bold text-gray-700 mt-0.5 truncate">Seoul, Korea</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-300 flex flex-col items-center gap-4 select-none opacity-50">
              <Info className="w-20 h-20 opacity-20" />
              <p className="text-base font-medium">일정을 선택해주세요</p>
            </div>
          )}
        </div>

        {/* 2. [중앙] 달력 (공통)
           - Mobile: row-start-1 (첫번째 줄)
           - PC: md:col-span-2 (중앙 2칸 차지) -> 1:2:1 비율 완성
        */}
        <div className="w-full h-full md:col-span-2 row-start-1 overflow-hidden">
          <CalendarBoard 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            schedules={schedules}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            monthNames={monthNames}
          />
        </div>

        {/* 3. [우측] 일정 리스트 (PC 전용)
           - Mobile: hidden
           - PC: block, col-span-1
        */}
        <div className="hidden md:flex md:col-span-1 h-full bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-4 pl-1 flex-shrink-0">
            <Clock className="w-5 h-5 text-purple-500" />
            <h4 className="text-gray-800 font-bold text-lg">Upcoming</h4>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide pr-1 pb-2">
            {schedules?.map((event) => {
              const isSelected = selectedEvent?.id === event.id;
              return (
                <button
                  key={event.id}
                  onClick={() => { setSelectedEvent(event); setCurrentDate(new Date(event.date)); }}
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-200 text-left flex items-center gap-3 ${isSelected ? 'bg-purple-50 border-purple-100 ring-1 ring-purple-100' : 'hover:bg-white/50 border border-transparent'}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-bold truncate ${isSelected ? 'text-gray-800' : 'text-gray-600'}`}>{event.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium uppercase tracking-wide">{event.type}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. [하단] 상세 정보 (모바일 전용)
           - Mobile: row-start-2 (두번째 줄), h-full (남은 공간 꽉 채움)
           - PC: hidden
        */}
        <div className="md:hidden row-start-2 w-full h-full bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/60 flex flex-col overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in slide-in-from-bottom-2 duration-300 h-full flex flex-col">
              {/* 모바일 헤더 */}
              <div className="flex items-center gap-4 mb-4 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-purple-500 border border-purple-50 shrink-0">
                  {getEventIcon(selectedEvent.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-600 text-[10px] font-bold uppercase">
                      {selectedEvent.type}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 truncate">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              {/* 내용 스크롤 */}
              <div className="flex-1 overflow-y-auto mb-3 scrollbar-hide">
                <p className="text-sm text-gray-600 leading-relaxed break-keep">
                  {selectedEvent.description}
                </p>
              </div>

              {/* 하단 정보 */}
              <div className="pt-3 border-t border-gray-100 flex items-center text-xs text-gray-500 shrink-0">
                 <MapPin size={14} className="mr-1 text-pink-400" />
                 <span className="font-medium">Seoul, Korea</span>
              </div>
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-3">
               <Info className="w-10 h-10 opacity-20" />
               <p className="text-sm font-medium">일정을 선택해주세요</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
