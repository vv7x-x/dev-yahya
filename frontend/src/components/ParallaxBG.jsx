import { useEffect, useRef } from 'react';

const ParallaxBG = () => {
  const ref = useRef();
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      ref.current.style.transform = `translate(${-x}px, ${-y}px) scale(1.05)`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return (
    <div ref={ref} className="fixed inset-0 -z-10 bg-gradient-to-br from-cyber via-holo to-glitch opacity-80 blur-2xl transition-transform duration-300" />
  );
};
export default ParallaxBG;
