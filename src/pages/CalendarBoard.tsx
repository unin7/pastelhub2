import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { ScheduleItem } from '../types';

interface CalendarBoardProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  schedules: ScheduleItem[] | null;
  selectedEvent: ScheduleItem | null;
  setSelectedEvent: (event: ScheduleItem | null) => void;
  monthNames: string[];
}

export default function CalendarBoard({
  currentDate,
  setCurrentDate,
  schedules,
  selectedEvent,
  setSelectedEvent,
  monthNames
}: CalendarBoardProps) {

  // --- 날짜 계산 로직 ---
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

  // --- 이벤트 핸들러 ---
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

  // --- 스타일 헬퍼 ---
  const getEventColor = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'birthday': return 'bg-pink-100 text-pink-600 ring-pink-200';
      case 'album': return 'bg-purple-100 text-purple-600 ring-purple-200';
      case 'concert': return 'bg-blue-100 text-blue-600 ring-blue-200';
      case 'broadcast': return 'bg-yellow-100 text-yellow-700 ring-yellow-200';
      default: return 'bg-green-100 text-green-600 ring-green-200';
    }
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

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-purple-50 flex flex-col h-full overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0 px-4 pt-2">
        <h3 className="text-gray-800 font-bold flex items-center gap-3 text-2xl tracking-tight">
          <CalendarIcon className="w-7 h-7 text-purple-500" />
          {monthNames[currentDate.getMonth()]} <span className="text-purple-300 font-light">{currentDate.getFullYear()}</span>
        </h3>
        <div className="flex gap-2">
          <button onClick={previousMonth} className="w-9 h-9 hover:bg-purple-50 rounded-full flex items-center justify-center transition-colors border border-transparent hover:border-purple-100">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button onClick={nextMonth} className="w-9 h-9 hover:bg-purple-50 rounded-full flex items-center justify-center transition-colors border border-transparent hover:border-purple-100">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 mb-2 px-2 flex-shrink-0">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="flex-1 px-1 pb-1">
        <div className="grid grid-cols-7 grid-rows-6 gap-3 h-full content-start">
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
                  w-full h-16 self-center rounded-2xl flex flex-col items-center justify-center relative transition-all duration-300 gap-0.5
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
                    <span className={`text-base leading-none ${event ? 'font-bold opacity-90' : ''}`}>{day}</span>
                    {event && <span className="text-2xl leading-none group-hover:-translate-y-1 transition-transform">{getEventIcon(event.type)}</span>}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
