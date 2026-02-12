import { useState, useEffect } from 'react';
import { Clock, MapPin, Info, Calendar as CalendarIcon } from 'lucide-react';
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

  // 이벤트 타입별 아이콘/컬러 헬퍼 (Detail 패널용)
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
    <div className="w-full h-screen p-2 flex justify-center items-center overflow-hidden">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 데스크탑 레이아웃 (md 이상에서만 그리드 유지) */}
      <div 
        className="hidden min-w-[1000px] max-w-[1400px] w-full md:grid grid-cols-4 gap-6"
        style={{ height: '560px' }}
      >
        
        {/* =======================
            1. [좌측] 상세 정보 패널 (Details Panel)
           ======================= */}
        <div className="col-span-1 bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex flex-col justify-center text-center h-full relative overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center w-full pt-8 pb-8">
               
               {/* 이벤트 아이콘 */}
               <div className="w-24 h-24 flex-shrink-0 aspect-square mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center text-4xl mb-8 border border-purple-50">
                {getEventIcon(selectedEvent.type)}
              </div>
              
              {/* 이벤트 타입 태그 */}
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-purple-50 text-purple-600 text-[11px] font-bold uppercase tracking-widest border border-purple-100 flex-shrink-0">
                {selectedEvent.type}
              </div>

              {/* 제목 및 설명 */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight px-1 w-full break-keep">
                {selectedEvent.title}
              </h2>
              
              <p className="text-sm text-gray-500 leading-relaxed px-1 break-keep line-clamp-4 mb-8">
                {selectedEvent.description}
              </p>

              {/* 일시 및 장소 메타 정보 */}
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
            /* 선택된 이벤트가 없을 때 표시되는 Placeholder */
            <div className="text-gray-300 flex flex-col items-center gap-4 select-none opacity-50">
              <Info className="w-20 h-20 opacity-20" />
              <p className="text-base font-medium">일정을 선택해주세요</p>
            </div>
          )}
        </div>

        {/* 2. [중앙] 메인 캘린더 (컴포넌트화) */}
        <div className="col-span-2">
          <CalendarBoard 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            schedules={schedules}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            monthNames={monthNames}
          />
        </div>

        {/* 3. [우측] Upcoming 리스트 */}
        <div className="col-span-1 bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex flex-col h-full overflow-hidden">
          <div className="flex items-center gap-2 mb-4 flex-shrink-0">
            <Clock className="w-5 h-5 text-purple-500" />
            <h4 className="text-gray-800 font-bold text-lg">Upcoming</h4>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
            {schedules?.map((event) => (
              <button
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setCurrentDate(new Date(event.date));
                }}
                className={`w-full px-4 py-3 rounded-xl transition-all text-left flex items-center gap-3 group border ${selectedEvent?.id === event.id ? 'bg-purple-50 border-purple-100 ring-1 ring-purple-100' : 'hover:bg-white/50 border-transparent'}`}
              >
                <div className={`flex flex-col items-center min-w-[2.5rem] border-r pr-3 ${selectedEvent?.id === event.id ? 'border-purple-200 text-purple-600' : 'border-gray-200 text-gray-400'}`}>
                  <span className="text-[9px] font-bold">{monthNames[new Date(event.date).getMonth()]}</span>
                  <span className="text-lg font-bold leading-none">{new Date(event.date).getDate()}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold truncate text-gray-800">{event.title}</p>
                  <p className="text-[10px] text-gray-400 uppercase">{event.type}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 (md 미만에서 표시) */}
      <div className="md:hidden w-full flex flex-col gap-4 max-w-md">
        {/* 모바일 1: Upcoming 간략 요약 */}
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-purple-50">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-purple-500" />
            <h4 className="text-gray-800 font-bold text-sm">Upcoming Schedules</h4>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {schedules?.slice(0, 5).map((event) => (
              <div 
                key={event.id}
                onClick={() => { setSelectedEvent(event); setCurrentDate(new Date(event.date)); }}
                className="flex-shrink-0 bg-white p-3 rounded-xl border border-gray-100 shadow-sm w-32"
              >
                <p className="text-[10px] text-purple-500 font-bold mb-1">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-xs font-bold text-gray-700 truncate">{event.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 모바일 2: 달력 (분리된 컴포넌트 재사용) */}
        <div className="h-[500px]">
          <CalendarBoard 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            schedules={schedules}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            monthNames={monthNames}
          />
        </div>

        {/* 모바일 3: 선택된 날짜 상세 내역 */}
        {selectedEvent && (
          <div className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/60 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-4">
              
              {/* 1. 좌측 아이콘 영역 (중앙 정렬 유지) */}
              <div className="w-16 h-16 flex-shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl border border-purple-50">
                {getEventIcon(selectedEvent.type)}
              </div>
        
              {/* 2. 우측 정보 영역 (이 영역 내부의 우측 상단에 태그 배치) */}
              <div className="flex-1 min-w-0 relative pt-1"> 
                {/* 정보 영역 내 우상단 태그 */}
                <div className="absolute top-0 right-0">
                  <span className="bg-purple-50 px-2 py-0.5 rounded-md text-purple-600 text-[9px] font-extrabold uppercase tracking-tight border border-purple-100/50">
                    {selectedEvent.type}
                  </span>
                </div>
        
                {/* 제목 및 설명 (태그와 겹치지 않게 우측 패딩 유지) */}
                <div className="pr-12"> 
                  <h3 className="font-bold text-gray-800 text-base mb-0.5 leading-tight truncate">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-gray-500 text-[11px] mb-3 line-clamp-1">
                    {selectedEvent.description}
                  </p>
                </div>
        
                {/* 하단 메타 정보 */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100/80">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-md bg-purple-50 flex items-center justify-center text-purple-500">
                      <CalendarIcon size={9} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-md bg-pink-50 flex items-center justify-center text-pink-500">
                      <MapPin size={9} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">Seoul</span>
                  </div>
                </div>
              </div>
        
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
