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
    <div className="w-full h-screen p-2 overflow-hidden bg-gray-50/50 flex justify-center items-center">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* [레이아웃 전략: 100% Grid]
        
        1. Mobile (기본):
           - grid-cols-1 : 가로 1칸
           - grid-rows-[auto_1fr] : 세로 2줄 (첫줄:달력-자동높이, 둘째줄:상세-남은공간전부)
           - h-full : 화면 전체 높이 사용
           
        2. PC (md 이상):
           - md:grid-cols-4 : 가로 4칸 (1:2:1 비율용)
           - md:grid-rows-1 : 세로 1줄
           - md:h-[560px] : 높이 고정
      */}
      <div 
        className="
          w-full h-full gap-4
          grid grid-cols-1 grid-rows-[auto_1fr]
          md:grid-cols-4 md:min-w-[1000px] md:max-w-[1400px] md:h-[560px] md:gap-6
        "
      >
        
        {/* 1. [좌측] PC용 상세 정보 (1칸) 
          - Mobile: hidden
          - PC: block, col-span-1
        */}
        <div className="hidden md:block col-span-1 h-full bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 relative overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center w-full pt-8 pb-8">
               <div className="w-24 h-24 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-500 mb-8 border border-purple-50">
                {getEventIcon(selectedEvent.type)}
              </div>
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-purple-50 text-purple-600 text-[11px] font-bold uppercase tracking-widest border border-purple-100">
                {selectedEvent.type}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight px-1 w-full break-keep text-center">
                {selectedEvent.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed px-1 break-keep line-clamp-4 mb-8 text-center">
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
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-4 select-none opacity-50">
              <Info className="w-20 h-20 opacity-20" />
              <p className="text-base font-medium">일정을 선택해주세요</p>
            </div>
          )}
        </div>

        {/* 2. [중앙] 달력 (PC: 2칸 / Mobile: 1칸-상단)
          - Mobile: row-start-1 (첫번째 줄)
          - PC: md:col-span-2 (가운데 2칸 차지)
        */}
        <div className="w-full md:h-full md:col-span-2 row-start-1">
          <CalendarBoard 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            schedules={schedules}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            monthNames={monthNames}
          />
        </div>

        {/* 3. [우측] PC용 Upcoming (1칸)
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

        {/* 4. [하단] 모바일 전용 상세 정보 (남은 공간 채움)
          - Mobile: row-start-2 (두번째 줄), h-full (남은 공간 꽉 채움)
          - PC: hidden
        */}
        <div className="md:hidden row-start-2 h-full w-full bg-white/80 backdrop-blur-md rounded-t-3xl p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border border-white/60 overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
              {/* 모바일 헤더 */}
              <div className="flex items-start gap-4 mb-4 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-purple-500 border border-purple-50 shrink-0">
                  {getEventIcon(selectedEvent.type)}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-600 text-[10px] font-bold uppercase tracking-wider">
                      {selectedEvent.type}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 leading-tight truncate">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              {/* 모바일 본문 (스크롤) */}
              <div className="flex-1 overflow-y-auto mb-4 scrollbar-hide">
                <p className="text-sm text-gray-600 leading-relaxed break-keep">
                  {selectedEvent.description}
                </p>
              </div>

              {/* 모바일 푸터 */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-3 text-gray-500 shrink-0">
                <MapPin size={16} className="text-pink-400" />
                <span className="text-xs font-bold text-gray-600">Seoul, Korea</span>
              </div>
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-3">
               <Info className="w-12 h-12 opacity-20" />
               <p className="text-sm font-medium">일정을 선택해주세요</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
