import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef();
  useEffect(() => {
    const cursor = cursorRef.current;
    const move = e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border-2 border-matrix-green shadow-neon-glow mix-blend-difference transition-all duration-75"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
}
