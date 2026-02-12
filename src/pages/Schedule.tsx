import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Info, Music, Gift, Radio, PartyPopper } from 'lucide-react';
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

  // 아이콘 헬퍼 함수
  const getEventIcon = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'birthday': return <Gift className="w-1/2 h-1/2" />;
      case 'album': return <Music className="w-1/2 h-1/2" />;
      case 'concert': return <CalendarIcon className="w-1/2 h-1/2" />;
      case 'broadcast': return <Radio className="w-1/2 h-1/2" />;
      case 'event': return <PartyPopper className="w-1/2 h-1/2" />;
      default: return <CalendarIcon className="w-1/2 h-1/2" />;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-50/50 overflow-hidden">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* [메인 레이아웃 컨테이너]
        1. Mobile: flex flex-col (세로 배치), w-full, h-full
        2. PC (md): grid grid-cols-4 (가로 4칸), 중앙 정렬(mx-auto), 높이 고정
      */}
      <div 
        className="
          w-full h-full p-4
          flex flex-col gap-4
          md:grid md:grid-cols-4 md:gap-6 md:max-w-[1400px] md:h-[600px] md:items-center md:mx-auto md:p-0
        "
      >
        
        {/* =======================
            1. [좌측] PC용 상세 정보 (Mobile: Hidden)
            md:flex (보임) / md:col-span-1 (1칸)
           ======================= */}
        <div className="hidden md:flex md:col-span-1 h-full bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex-col justify-center text-center relative overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center w-full pt-8 pb-8">
               <div className="w-24 h-24 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-500 mb-8 border border-purple-50">
                {getEventIcon(selectedEvent.type)}
              </div>
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-purple-50 text-purple-600 text-[11px] font-bold uppercase tracking-widest border border-purple-100">
                {selectedEvent.type}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight px-1 w-full break-keep">
                {selectedEvent.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed px-1 break-keep line-clamp-4 mb-8">
                {selectedEvent.description}
              </p>
              <div className="w-full bg-white/60 rounded-3xl p-5 text-left border border-white/80 space-y-4 shadow-sm mt-auto">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
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
                   <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
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
            <div className="text-gray-300 flex flex-col items-center gap-4 select-none opacity-50">
              <Info className="w-20 h-20 opacity-20" />
              <p className="text-base font-medium">일정을 선택해주세요</p>
            </div>
          )}
        </div>

        {/* =======================
            2. [중앙] 달력 (공통)
            Mobile: 상단 배치 (높이 자동)
            PC: md:col-span-2 (중앙 2칸 차지) -> w-full로 꽉 채움
           ======================= */}
        <div className="w-full md:h-full md:col-span-2 shrink-0">
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
            3. [우측] PC용 Upcoming (Mobile: Hidden)
            md:flex (보임) / md:col-span-1 (1칸)
           ======================= */}
        <div className="hidden md:flex md:col-span-1 h-full bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/60 flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-4 pl-1 flex-shrink-0">
            <Clock className="w-5 h-5 text-purple-500" />
            <h4 className="text-gray-800 font-bold text-lg">Upcoming</h4>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide pr-1 pb-2">
            {schedules?.map((event) => {
              const isSelected = selectedEvent?.id === event.id;
              return (
                <button
                  key={event.id}
                  onClick={() => { setSelectedEvent(event); setCurrentDate(new Date(event.date)); }}
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-200 text-left flex items-center gap-3 ${isSelected ? 'bg-purple-50 border-purple-100 ring-1 ring-purple-100' : 'hover:bg-white/50 border border-transparent'}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-bold truncate ${isSelected ? 'text-gray-800' : 'text-gray-600'}`}>{event.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium uppercase tracking-wide">{event.type}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =======================
            4. [하단] 모바일 전용 상세 정보 (PC: Hidden)
            flex-1 (남은 공간 모두 차지)
           ======================= */}
        <div className="flex md:hidden flex-1 w-full bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/60 flex-col overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in slide-in-from-bottom-2 duration-300 h-full flex flex-col">
              {/* 모바일 헤더 */}
              <div className="flex items-center gap-4 mb-4 shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                  {getEventIcon(selectedEvent.type)}
                </div>
                <div className="min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-600 text-[10px] font-bold mb-1">
                    {selectedEvent.type}
                  </span>
                  <h2 className="text-lg font-bold text-gray-800 truncate">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              {/* 모바일 본문 (스크롤 가능) */}
              <div className="flex-1 overflow-y-auto mb-3 scrollbar-hide">
                <p className="text-sm text-gray-600 leading-relaxed break-keep">
                  {selectedEvent.description}
                </p>
              </div>

              {/* 모바일 푸터 */}
              <div className="pt-3 border-t border-gray-100 flex items-center text-xs text-gray-500 shrink-0">
                 <MapPin size={14} className="mr-1" />
                 <span>Seoul, Korea</span>
                 <span className="mx-2">|</span>
                 <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
              </div>
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-3">
               <Info className="w-10 h-10 opacity-20" />
               <p className="text-sm font-medium">일정을 선택해주세요</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
