import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function GlitchLogo() {
  const logoRef = useRef();
  useEffect(() => {
    const el = logoRef.current;
    const glitch = () => {
      gsap.fromTo(el, { x: 0 }, { x: 'random(-10,10)', duration: 0.1, yoyo: true, repeat: 5, onComplete: () => gsap.to(el, { x: 0, duration: 0.1 }) });
    };
    el.addEventListener('mouseenter', glitch);
    return () => el.removeEventListener('mouseenter', glitch);
  }, []);
  return (
    <h1 ref={logoRef} className="text-6xl md:text-8xl font-extrabold text-matrix-green neon-glow glitch select-none cursor-pointer mb-8 transition-all">
      <span className="glitch-layer" data-text="YAHYA">YAHYA</span>
    </h1>
  );
}
