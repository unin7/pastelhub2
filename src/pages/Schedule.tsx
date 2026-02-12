import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Info } from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { ScheduleItem } from '../types';
import CalendarBoard from './CalendarBoard'; // 분리한 컴포넌트 임포트

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

  // 상세 페이지에서도 아이콘이 필요하여 중복 사용 (또는 별도 utils로 분리 추천)
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
    <div className="w-full min-h-screen md:h-screen p-2 flex justify-center items-start md:items-center overflow-y-auto md:overflow-hidden bg-gray-50/50">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 반응형 컨테이너 설정:
         1. 모바일 (기본): flex-col (세로 배치), 높이 자동(h-auto)
         2. 데스크탑 (md 이상): grid-cols-4 (가로 배치), 높이 고정(560px)
      */}
      <div 
        className="w-full max-w-md md:max-w-[1400px] flex flex-col md:grid md:grid-cols-4 gap-6"
        style={{ height: 'auto' }} // 모바일 기본값
      >
        
        {/* =======================
            1. [달력] Calendar Board (모바일: 최상단, 데스크탑: 중앙)
            order-1 (모바일) / order-2 (데스크탑)
           ======================= */}
        <div className="order-1 md:order-2 md:col-span-2 h-[450px] md:h-[560px]">
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
            2. [상세 정보] Details Panel
            order-2 (모바일) / order-1 (데스크탑)
           ======================= */}
        <div className="order-2 md:order-1 md:col-span-1 h-auto md:h-[560px] bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex flex-col justify-center text-center relative overflow-hidden min-h-[300px]">
          {selectedEvent ? (
            <div className="animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center w-full pt-4 md:pt-8 pb-4 md:pb-8">
               {/* 아이콘 */}
               <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 aspect-square mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl md:text-4xl mb-6 md:mb-8 border border-purple-50">
                {getEventIcon(selectedEvent.type)}
              </div>
              
              {/* 타입 태그 */}
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 md:mb-6 rounded-full bg-purple-50 text-purple-600 text-[11px] font-bold uppercase tracking-widest border border-purple-100 flex-shrink-0">
                {selectedEvent.type}
              </div>

              {/* 제목 & 설명 */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4 leading-tight px-1 w-full break-keep">
                {selectedEvent.title}
              </h2>
              
              <p className="text-sm text-gray-500 leading-relaxed px-1 break-keep line-clamp-4 mb-6 md:mb-8">
                {selectedEvent.description}
              </p>

              {/* 메타 정보 */}
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
            3. [리스트] Upcoming Panel
            order-3 (항상 마지막)
           ======================= */}
        <div className="order-3 md:col-span-1 h-[300px] md:h-[560px] bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex flex-col overflow-hidden mb-10 md:mb-0">
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
                    // 모바일에서는 선택 시 상단 달력으로 부드럽게 스크롤 이동 기능 추가 가능
                    window.scrollTo({ top: 0, behavior: 'smooth' });
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
