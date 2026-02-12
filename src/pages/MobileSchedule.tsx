import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Info } from 'lucide-react';
import { ScheduleItem } from '../types';

// 부모에게 받을 Props 타입 정의
interface MobileScheduleProps {
  // 데이터
  selectedEvent: ScheduleItem | null;
  currentDate: Date;
  calendarCells: (number | null)[];
  
  // 공통 상수/함수 (부모에게서 받음)
  monthNames: string[];
  getEventIcon: (type: string) => React.ReactNode;
  getEventColor: (type: string) => string;

  // 핸들러
  previousMonth: () => void;
  nextMonth: () => void;
  getEventsForDate: (day: number | null) => ScheduleItem | undefined;
  setSelectedEvent: (event: ScheduleItem | null) => void;
}

export default function MobileSchedule({
  monthNames, currentDate
}: MobileScheduleProps) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Mobile View Connected</h1>
      <p className="text-gray-500">
        현재 날짜: {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </p>
    </div>
  );
}