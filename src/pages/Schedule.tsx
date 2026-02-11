import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Info } from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { ScheduleItem } from '../types';

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { 
      daysInMonth: lastDay.getDate(), 
      startingDayOfWeek: firstDay.getDay() 
    };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const totalSlots = 42; 
  const calendarCells = [
    ...Array(startingDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array(totalSlots - (startingDayOfWeek + daysInMonth)).fill(null)
  ];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedEvent(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedEvent(null);
  };

  const getEventsForDate = (day: number | null) => {
    if (!day || !schedules) return null;
    return schedules.find((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === currentDate.getFullYear() &&
        itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getDate() === day
      );
    });
  };

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

  const getEventColor = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'birthday': return 'bg-pink-100 text-pink-600 ring-pink-200';
      case 'album': return 'bg-purple-100 text-purple-600 ring-purple-200';
      case 'concert': return 'bg-blue-100 text-blue-600 ring-blue-200';
      case 'broadcast': return 'bg-yellow-100 text-yellow-700 ring-yellow-200';
      default: return 'bg-green-100 text-green-600 ring-green-200';
    }
  };

  return (
    <div className="w-full min-h-screen lg:h-screen p-4 lg:p-0 flex justify-center items-start lg:items-center overflow-y-auto lg:overflow-hidden bg-gray-50/50">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* [Main Grid Layout]
        - min-w-[1000px] 제거하고 w-full만 사용하되, 내부 min-w-0로 터짐 방지
        - lg:grid-cols-4 강제 적용
      */}
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-4 gap-6 h-auto lg:h-[560px]">
        
        {/* =======================
            1. [Left Panel] 
            - 문제의 원인 해결: PC에서 flex-col이 확실히 먹히도록 구조 단순화
            - overflow-hidden 추가하여 내부 요소가 부모를 뚫고 나가는 것 방지
            ======================= */}
        <div className="lg:col-span-1 min-w-0 w-full bg-white/70 backdrop-blur-xl rounded-xl p-4 lg:p-6 shadow-sm border border-white/60 relative overflow-hidden flex flex-col lg:h-full">
          {selectedEvent ? (
            /* [Layout Switcher]
               - Mobile: flex-row (가로) / items-center
               - PC: flex-col (세로) / justify-center / items-center
               - w-full 추가하여 PC에서 가로폭 꽉 채우기
            */
            <div className="flex flex-row lg:flex-col items-center lg:justify-center gap-4 lg:gap-0 h-full w-full">
                
              {/* 아이콘 영역 */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center lg:mb-6">
                 <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-xl shadow-sm flex items-center justify-center text-4xl lg:text-5xl border border-purple-50">
                  {getEventIcon(selectedEvent.type)}
                </div>
                {/* 태그: PC 전용 */}
                <div className="hidden lg:inline-flex mt-6 items-center justify-center px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[11px] font-bold uppercase tracking-widest border border-purple-100">
                    {selectedEvent.type}
                </div>
              </div>

              {/* 텍스트 정보 영역 
                 - min-w-0: Flex 자식 요소가 부모보다 커지는 것 방지 (가장 중요)
                 - flex-1: 남은 공간 차지
              */}
              <div className="flex-1 min-w-0 flex flex-col lg:w-full lg:items-center lg:text-center justify-center">
                {/* 모바일 전용 태그 */}
                <div className="lg:hidden self-start mb-1 px-2 py-0.5 rounded bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wide">
                  {selectedEvent.type}
                </div>

                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1 lg:mb-4 leading-tight truncate w-full lg:whitespace-normal lg:break-keep">
                  {selectedEvent.title}
                </h2>
                
                <p className="text-sm text-gray-500 leading-relaxed lg:break-keep line-clamp-2 lg:line-clamp-4 lg:mb-6 mb-0 w-full">
                  {selectedEvent.description}
                </p>

                {/* 메타 정보 */}
                <div className="mt-2 lg:mt-auto w-full lg:bg-white/60 lg:rounded-3xl lg:p-5 lg:border lg:border-white/80 lg:space-y-4 lg:shadow-sm">
                    {/* PC View */}
                    <div className="hidden lg:block">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 flex-shrink-0">
                                <CalendarIcon size={18} />
                            </div>
                            <div className="text-left min-w-0 flex-1">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Date</p>
                                <p className="text-sm font-bold text-gray-700 truncate">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 flex-shrink-0">
                                <MapPin size={18} />
                            </div>
                            <div className="text-left min-w-0 flex-1">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Location</p>
                                <p className="text-sm font-bold text-gray-700 truncate">Seoul, Korea</p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden flex flex-col gap-1 text-xs text-gray-500 mt-2">
                        <div className="flex items-center gap-2">
                            <CalendarIcon size={14} className="text-purple-400"/>
                            <span className="font-semibold">{new Date(selectedEvent.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-pink-400"/>
                            <span>Seoul, Korea</span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-300 flex flex-col items-center gap-4 select-none opacity-50 py-10 lg:py-0 justify-center h-full">
              <Info className="w-16 h-16 opacity-20" />
              <p className="text-base font-medium">일정을 선택해주세요</p>
            </div>
          )}
        </div>

        {/* =======================
            2. [Center Panel]
            ======================= */}
        <div className="lg:col-span-2 min-w-0 bg-white/70 backdrop-blur-xl rounded-2xl p-4 lg:p-6 shadow-sm border border-purple-50 flex flex-col h-auto lg:h-full overflow-hidden">
          <div className="flex items-center justify-between mb-2 lg:mb-4 flex-shrink-0 px-2 lg:px-4 pt-2">
            <h3 className="text-gray-800 font-bold flex items-center gap-2 lg:gap-3 text-xl lg:text-2xl tracking-tight">
              <CalendarIcon className="w-6 h-6 lg:w-7 lg:h-7 text-purple-500" />
              {monthNames[currentDate.getMonth()]} <span className="text-purple-300 font-light">{currentDate.getFullYear()}</span>
            </h3>
            <div className="flex gap-2">
              <button onClick={previousMonth} className="w-8 h-8 lg:w-9 lg:h-9 hover:bg-purple-50 rounded-full flex items-center justify-center transition-colors border border-transparent hover:border-purple-100">
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
              </button>
              <button onClick={nextMonth} className="w-8 h-8 lg:w-9 lg:h-9 hover:bg-purple-50 rounded-full flex items-center justify-center transition-colors border border-transparent hover:border-purple-100">
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-2 px-1 lg:px-2 flex-shrink-0">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className="text-center text-xs lg:text-sm font-bold text-gray-400 uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>

          <div className="flex-1 px-1 pb-1 min-h-0">
            <div className="grid grid-cols-7 grid-rows-6 gap-1 lg:gap-3 h-full">
              {calendarCells.map((day, i) => {
                const event = getEventsForDate(day);
                const isToday = day && new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();
                const isSelected = selectedEvent && day && new Date(selectedEvent.date).getDate() === day && new Date(selectedEvent.date).getMonth() === currentDate.getMonth();

                return (
                  <button
                    key={i}
                    onClick={() => day && event && setSelectedEvent(event)}
                    disabled={!day} 
                    className={`
                      w-full relative rounded-xl lg:rounded-2xl flex flex-col items-center justify-center transition-all duration-300 gap-0 lg:gap-0.5
                      aspect-square lg:aspect-auto lg:h-full
                      ${day && event 
                        ? `${getEventColor(event.type)} hover:scale-[1.05] shadow-sm cursor-pointer` 
                        : 'hover:bg-gray-50/50 text-gray-400'}
                      ${isToday ? 'ring-2 ring-purple-400 ring-offset-2 z-10' : ''}
                      ${isSelected ? 'ring-2 ring-gray-400 ring-offset-2 z-10 scale-95' : ''}
                      ${!day ? 'invisible pointer-events-none' : ''} 
                    `}
                  >
                    {day && (
                      <>
                        <span className={`text-sm lg:text-base leading-none ${event ? 'font-bold opacity-90' : ''}`}>{day}</span>
                        {event && <span className="text-lg lg:text-2xl leading-none group-hover:-translate-y-1 transition-transform">{getEventIcon(event.type)}</span>}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =======================
            3. [Right Panel]
            ======================= */}
        <div className="hidden lg:flex lg:col-span-1 min-w-0 bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex-col h-full overflow-hidden">
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
                    w-full px-4 py-3 rounded-xl transition-all duration-200 text-left flex items-center gap-3 group shrink-0
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
