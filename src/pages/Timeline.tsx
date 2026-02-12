import { useState } from 'react';
import { ChatRoomList } from './ChatRoomList'; 
import { ChatConversation } from './ChatConversation'; 

export default function Timeline() {
  // 초기값을 null로 두어 모바일에서 처음에 목록이 보이게 하는 것이 좋습니다.
  const [roomId, setRoomId] = useState<string | null>(null);

  return (
    <div className="flex justify-center items-center w-full h-full p-0 font-sans bg-gray-50">
      <div className="w-full h-full bg-white rounded-xl shadow-md border border-gray-200 flex overflow-hidden font-sans relative">
        
        {/* 왼쪽: 채팅방 목록 */}
        {/* 모바일: roomId가 있으면 숨김 / 데스크탑: 항상 보임 (w-[320px]) */}
        <div className={`
          flex-col bg-white z-10 border-r border-gray-100
          ${roomId ? 'hidden md:flex' : 'flex w-full'} 
          md:w-[320px] md:flex-none
        `}>
          <ChatRoomList 
            current={roomId || ''} 
            onSelect={(id) => setRoomId(id)} 
          />
        </div>
        
        {/* 오른쪽: 대화 내용 */}
        {/* 모바일: roomId가 없으면 숨김 / 데스크탑: 항상 보임 (flex-1) */}
        <div className={`
          flex-col min-w-0 bg-[#b2c7da] relative
          ${roomId ? 'flex w-full' : 'hidden md:flex'}
          md:flex-1 
        `}>
          {roomId ? (
            <ChatConversation 
              key={roomId} 
              roomId={roomId} 
              onBack={() => setRoomId(null)} // 뒤로가기 핸들러 전달
            />
          ) : (
            // 데스크탑에서 선택된 방이 없을 때 보여줄 화면
            <div className="hidden md:flex flex-1 flex-col items-center justify-center text-gray-400 gap-2 bg-[#b2c7da]">
               <p className="text-sm font-medium">대화 상대를 선택해주세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
