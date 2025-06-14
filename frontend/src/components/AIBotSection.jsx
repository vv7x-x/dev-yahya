import React from 'react';

export default function AIBotSection() {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-end pb-4 z-50">
      <div className="bg-black/80 border border-matrix-green rounded-2xl px-6 py-4 shadow-xl max-w-md w-full flex flex-col items-center animate-fade-in">
        <div className="text-matrix-green text-lg font-mono mb-2">🤖 Yahya AI Bot</div>
        <div className="text-white text-center text-sm">مرحباً! أنا بوت الذكاء الاصطناعي الخاص بيحيى. اسألني عن أي مشروع أو مهارة أو تواصل معي!</div>
      </div>
    </div>
  );
}
