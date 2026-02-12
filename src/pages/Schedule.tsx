import { useState, useEffect } from 'react';
import { useJsonData } from '../hooks/useJsonData';
import { ScheduleItem } from '../types';

// 분리한 뷰 컴포넌트 임포트
import MobileSchedule from './MobileSchedule';
import DesktopSchedule from './DesktopSchedule';

/**
 * [공통 상수 및 함수]
 * 이 컴포넌트 내부에서 정의하여 Props로 내려줍니다.
 */
const monthNames = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];

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

export default function Schedule() {
  // 1. 데이터 로드
  const { data: schedules } = useJsonData<ScheduleItem[]>('schedules');
  
  // 2. 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); 
  const [selectedEvent, setSelectedEvent] = useState<ScheduleItem | null>(null);

  // 3. 초기 선택 로직
  useEffect(() => {
    if (schedules && schedules.length > 0 && !selectedEvent) {
      setSelectedEvent(schedules[0]);
    }
  }, [schedules]);

  // 4. 날짜 계산 로직
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

  // 5. 이벤트 핸들러
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

  // 6. 뷰에 전달할 Props 묶음 (공통 함수 포함)
  const viewProps = {
    schedules,
    selectedEvent,
    currentDate,
    calendarCells,
    monthNames,         // 공통 상수 전달
    getEventIcon,       // 공통 함수 전달
    getEventColor,      // 공통 함수 전달
    previousMonth,
    nextMonth,
    getEventsForDate,
    setSelectedEvent,
    setCurrentDate,
  };

  return (
    <>
      {/* 모바일 뷰 (lg 미만에서 표시) */}
      <div className="block lg:hidden">
        <MobileSchedule {...viewProps} />
      </div>

      {/* 데스크탑 뷰 (lg 이상에서 표시) */}
      <div className="hidden lg:block">
        <DesktopSchedule {...viewProps} />
      </div>
    </>
  );
}