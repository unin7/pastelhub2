import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Info } from 'lucide-react';
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
      case 'birthday': return '🎂';
      case 'album': return '💿';
      case 'concert': return '🎤';
      case 'broadcast': return '📺';
      case 'event': return '🎉';
      default: return '📅';
    }
  };

  return (
    <div className="w-full h-screen p-2 flex justify-center items-center overflow-hidden bg-gray-50/50">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* [레이아웃 컨테이너]
        1. 모바일: flex-col (세로)
        2. PC (md 이상): grid-cols-4 (가로 1:2:1 비율)
           - 상세정보(1) : 달력(2) : 리스트(1) = 총 4칸
      */}
      <div 
        className="
          w-full h-full gap-4
          flex flex-col
          md:grid md:grid-cols-4 md:max-w-[1400px] md:h-[560px]
        "
      >
        
        {/* =======================
            1. [상세 정보 패널]
            - 모바일: order-2 (달력 아래 위치), flex-1 (남은 공간 전부 차지)
            - PC: order-1 (맨 왼쪽), col-span-1 (1칸 차지)
           ======================= */}
        <div className="order-2 md:order-1 flex-1 md:flex-none md:col-span-1 h-full bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex flex-col justify-center text-center relative overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center w-full pt-4 md:pt-8 pb-4 md:pb-8">
               
               {/* 아이콘 */}
               <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 aspect-square mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl md:text-5xl mb-4 md:mb-8 border border-purple-50">
                {getEventIcon(selectedEvent.type)}
              </div>
              
              {/* 태그 */}
              <div className="inline-flex items-center justify-center px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 rounded-full bg-purple-50 text-purple-600 text-[10px] md:text-[11px] font-bold uppercase tracking-widest border border-purple-100 flex-shrink-0">
                {selectedEvent.type}
              </div>

              {/* 제목 & 설명 */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4 leading-tight px-1 w-full break-keep">
                {selectedEvent.title}
              </h2>
              
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed px-1 break-keep line-clamp-3 md:line-clamp-4 mb-4 md:mb-8">
                {selectedEvent.description}
              </p>

              {/* 메타 정보 (하단 고정) */}
              <div className="w-full bg-white/60 rounded-3xl p-4 md:p-5 text-left border border-white/80 space-y-3 md:space-y-4 shadow-sm mt-auto flex-shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 flex-shrink-0">
                    <CalendarIcon size={16} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Date</p>
                    <p className="text-xs md:text-sm font-bold text-gray-700 mt-0.5 truncate">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                 <div className="flex items-center gap-3 md:gap-4">
                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 flex-shrink-0">
                    <MapPin size={16} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Location</p>
                    <p className="text-xs md:text-sm font-bold text-gray-700 mt-0.5 truncate">Seoul, Korea</p>
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

        {/* =======================
            2. [중앙 달력]
            - 모바일: order-1 (맨 위), 높이 자동
            - PC: order-2 (중앙), col-span-2 (2칸 차지) -> 1:2:1 비율의 핵심
           ======================= */}
        <div className="order-1 md:order-2 w-full h-auto md:h-full md:col-span-2">
          <CalendarBoard 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            schedules={schedules}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            monthNames={monthNames}
          />
        </div>

        {/* =======================
            3. [우측 리스트]
            - 모바일: hidden (숨김 - 공간 부족)
            - PC: order-3 (맨 오른쪽), col-span-1 (1칸 차지), flex (보임)
           ======================= */}
        <div className="hidden md:flex order-3 md:col-span-1 h-full bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-4 pl-1 flex-shrink-0">
            <Clock className="w-5 h-5 text-purple-500" />
            <h4 className="text-gray-800 font-bold text-lg">Upcoming</h4>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide pr-1 pb-2">
            {schedules?.map((event) => {
              const eventDate = new Date(event.date);
              const isSelected = selectedEvent?.id === event.id;
              
              return (
                <button
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event);
                    setCurrentDate(new Date(event.date));
                  }}
                  className={`
                    w-full px-4 py-3 rounded-xl transition-all duration-200 text-left flex items-center gap-3 group
                    ${isSelected 
                      ? 'bg-purple-50 border-purple-100 ring-1 ring-purple-100' 
                      : 'hover:bg-white/50 border border-transparent'}
                  `}
                >
                  <div className={`
                    flex flex-col items-center justify-center min-w-[3rem] border-r pr-3
                    ${isSelected ? 'border-purple-200 text-purple-600' : 'border-gray-200 text-gray-400'}
                  `}>
                    <span className="text-[10px] font-bold uppercase">{monthNames[eventDate.getMonth()].slice(0, 3)}</span>
                    <span className="text-lg font-bold leading-none">{eventDate.getDate()}</span>
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-bold truncate ${isSelected ? 'text-gray-800' : 'text-gray-600'}`}>
                      {event.title}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium uppercase tracking-wide">
                      {event.type}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
