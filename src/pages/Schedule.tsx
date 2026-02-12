import { useState, useEffect } from 'react';
import { useJsonData } from '../hooks/useJsonData';
import { ScheduleItem } from '../types';

// 분리한 뷰 컴포넌트 임포트
import MobileSchedule from './MobileSchedule';
import DesktopSchedule from './DesktopSchedule';

// 원본의 상수를 여기로 가져옴
const monthNames = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];

export default function Schedule() {
  // [Logic] 1. 데이터 및 상태 관리 (원본 코드와 동일)
  const { data: schedules } = useJsonData<ScheduleItem[]>('schedules');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); 
  const [selectedEvent, setSelectedEvent] = useState<ScheduleItem | null>(null);

  useEffect(() => {
    if (schedules && schedules.length > 0 && !selectedEvent) {
      setSelectedEvent(schedules[0]);
    }
  }, [schedules]);

  // [Logic] 2. 날짜 계산 (원본 코드와 동일)
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

  // [Logic] 3. 핸들러 함수 (원본 코드와 동일)
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
      const d = new Date(item.date);
      return d.getFullYear() === currentDate.getFullYear() && 
             d.getMonth() === currentDate.getMonth() && 
             d.getDate() === day;
    });
  };

  // [Logic] 4. 아이콘/색상 함수 (원본에서 컴포넌트 내부에 있던 것을 여기로 가져옴)
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

  // [Props] 자식들에게 내려줄 데이터 묶음
  const viewProps = {
    schedules, selectedEvent, calendarCells, currentDate, monthNames,
    previousMonth, nextMonth, getEventsForDate, setSelectedEvent, setCurrentDate,
    getEventIcon, getEventColor
  };

  return (
    <>
      {/* 반응형 분기점 (lg: 1024px)
        - 화면이 1024px 미만이면 MobileSchedule 표시
        - 화면이 1024px 이상이면 DesktopSchedule 표시
      */}
      <div className="block lg:hidden">
        <MobileSchedule {...viewProps} />
      </div>
      <div className="hidden lg:block">
        <DesktopSchedule {...viewProps} />
      </div>
    </>
  );
}