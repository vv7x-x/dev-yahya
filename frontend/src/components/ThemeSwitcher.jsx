import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  return (
    <button
      className="fixed top-4 left-4 z-50 px-3 py-1 rounded bg-holo text-cyber font-bold shadow-neon hover:bg-neon transition"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
};
export default ThemeSwitcher;
