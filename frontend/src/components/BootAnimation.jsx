import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './BootAnimation.css';

const BootAnimation = ({ onFinish }) => {
  const matrixRef = useRef();

  useEffect(() => {
    // Matrix effect
    const canvas = matrixRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    const chars = 'アァカyahya redaサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function draw() {
      ctx.fillStyle = 'rgba(15,15,15,0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + 'px monospace';
      ctx.fillStyle = '#39FF14';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    let interval = setInterval(draw, 33);
    // Glitch logo animation
    gsap.fromTo('.glitch-logo', {
      opacity: 0,
      y: 100,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      delay: 1,
      ease: 'expo.out',
      onComplete: () => {
        setTimeout(() => {
          gsap.to('.boot-overlay', { opacity: 0, duration: 1, onComplete: onFinish });
        }, 1800);
      }
    });
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="boot-overlay fixed inset-0 z-50 flex items-center justify-center bg-cyber">
      <canvas ref={matrixRef} className="absolute inset-0 w-full h-full" />
      <div className="glitch-logo relative text-center select-none">
        <h1 className="text-5xl md:text-7xl font-techno text-neon glitch-text drop-shadow-neon">
          <span className="glitch" data-text="Yahya Reda">Yahya Reda</span>
        </h1>
        <p className="text-glitch text-xl mt-4 tracking-widest glitch-text2">WELCOME TO THE MATRIX</p>
      </div>
    </div>
  );
};

export default BootAnimation;
