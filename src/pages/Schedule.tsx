import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Info } from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { ScheduleItem } from '../types';
import CalendarBoard from './CalendarBoard'; // 분리한 달력 컴포넌트

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
      case 'birthday': return '🎂';
      case 'album': return '💿';
      case 'concert': return '🎤';
      case 'broadcast': return '📺';
      case 'event': return '🎉';
      default: return '📅';
    }
  };

  return (
    // 전체 컨테이너: 
    // 모바일: 스크롤 가능(overflow-y-auto), 세로 정렬
    // PC: 화면 고정(h-screen, overflow-hidden), 중앙 정렬
    <div className="w-full min-h-screen md:h-screen p-2 flex justify-center items-start md:items-center overflow-y-auto md:overflow-hidden bg-gray-50/50">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 레이아웃 컨테이너 수정 
         1. 모바일: w-full, h-auto, flex-col (세로 배치)
         2. PC (md 이상): 보내주신 코드 참고 -> min-w-[1000px], grid-cols-4, h-[560px] 적용
      */}
      <div 
        className="
          w-full flex flex-col gap-6
          md:grid md:grid-cols-4 md:min-w-[1000px] md:max-w-[1400px] md:h-[560px]
        "
      >
        
        {/* =======================
            1. [좌측] 상세 정보 패널
            - 모바일: hidden (숨김)
            - PC: flex (보임)
           ======================= */}
        <div className="hidden md:flex md:col-span-1 h-full bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex-col justify-center text-center relative overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center w-full pt-8 pb-8">
               <div className="w-24 h-24 flex-shrink-0 aspect-square mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center text-4xl mb-8 border border-purple-50">
                {getEventIcon(selectedEvent.type)}
              </div>
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-purple-50 text-purple-600 text-[11px] font-bold uppercase tracking-widest border border-purple-100 flex-shrink-0">
                {selectedEvent.type}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight px-1 w-full break-keep">
                {selectedEvent.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed px-1 break-keep line-clamp-4 mb-8">
                {selectedEvent.description}
              </p>
              <div className="w-full bg-white/60 rounded-3xl p-5 text-left border border-white/80 space-y-4 shadow-sm mt-auto flex-shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 flex-shrink-0">
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
                   <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 flex-shrink-0">
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
            <div className="text-gray-300 flex flex-col items-center gap-4 select-none opacity-50 py-10">
              <Info className="w-20 h-20 opacity-20" />
              <p className="text-base font-medium">일정을 선택해주세요</p>
            </div>
          )}
        </div>

        {/* =======================
            2. [중앙] 달력 (Calendar Board)
            - 모바일: 항상 보임 (기본값)
            - PC: col-span-2 (중앙 2칸 차지)
           ======================= */}
        <div className="w-full h-auto md:h-full md:col-span-2">
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
            3. [우측] 다가오는 일정 (Upcoming)
            - 모바일: hidden (숨김)
            - PC: flex (보임)
           ======================= */}
        <div className="hidden md:flex md:col-span-1 h-full bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex-col overflow-hidden">
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
