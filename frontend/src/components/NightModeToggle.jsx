import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function NightModeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  return (
    <button
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-black/60 hover:bg-matrix-green/80 transition shadow-lg"
      onClick={() => setDark(v => !v)}
      aria-label="تبديل الوضع الليلي"
    >
      {dark ? <FaSun className="text-yellow-400 text-2xl" /> : <FaMoon className="text-matrix-green text-2xl" />}
    </button>
  );
}
