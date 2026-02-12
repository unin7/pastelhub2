import { ScheduleItem } from '../types';

interface MobileScheduleProps {
  currentDate: Date;
  monthNames: string[];
}

export default function MobileSchedule({
  currentDate, monthNames
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