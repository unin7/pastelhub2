import { useState, useEffect } from 'react';
import { ChatRoomList } from './ChatRoomList'; 
import { ChatConversation } from './ChatConversation'; 

export default function Timeline() {
  const [roomId, setRoomId] = useState<string | null>(null);

  // ✅ [수정] PC 버전(768px 이상)으로 처음 들어왔을 때만 기본 방 자동 선택
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile && !roomId) {
      setRoomId("group_stellive_all"); // 기본으로 보여줄 방 ID
    }
  }, []);

  return (
    // ✅ [수정] h-full 대신 h-[100dvh]를 사용하여 모바일 주소표시줄 영역 문제 해결 및 스크롤 고정
    <div className="flex justify-center items-center w-full h-[100dvh] p-0 font-sans bg-gray-50 overflow-hidden">
      <div className="w-full h-full bg-white rounded-none md:rounded-xl shadow-none md:shadow-md border-0 md:border border-gray-200 flex overflow-hidden font-sans relative">
        
        {/* 왼쪽: 채팅방 목록 */}
        {/* ✅ [수정] shrink-0, min-w-[320px] 추가하여 너비 줄어듦 방지 */}
        <div className={`
          flex-col bg-white z-10 border-r border-gray-100 h-full
          ${roomId ? 'hidden md:flex' : 'flex w-full'} 
          md:w-[320px] md:min-w-[320px] shrink-0
        `}>
          <ChatRoomList 
            current={roomId || ''} 
            onSelect={(id) => setRoomId(id)} 
          />
        </div>
        
        {/* 오른쪽: 대화 내용 */}
        <div className={`
          flex-col min-w-0 bg-[#b2c7da] relative h-full
          ${roomId ? 'flex w-full' : 'hidden md:flex'}
          md:flex-1 
        `}>
          {roomId ? (
            <ChatConversation 
              key={roomId} 
              roomId={roomId} 
              onBack={() => setRoomId(null)} 
            />
          ) : (
            <div className="hidden md:flex flex-1 flex-col items-center justify-center text-gray-400 gap-2 bg-[#b2c7da] h-full">
               <p className="text-sm font-medium">대화 상대를 선택해주세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
