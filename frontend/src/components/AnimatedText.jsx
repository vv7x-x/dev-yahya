import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

export default function AnimatedText({ textAr, textEn }) {
  const { i18n } = useTranslation();
  const textRef = useRef();
  useEffect(() => {
    const el = textRef.current;
    el.innerHTML = '';
    const text = i18n.language === 'ar' ? textAr : textEn;
    let i = 0;
    function type() {
      if (i < text.length) {
        el.innerHTML += text[i] === ' ' ? '&nbsp;' : text[i];
        i++;
        setTimeout(type, 40);
      }
    }
    type();
  }, [i18n.language, textAr, textEn]);
  return (
    <div className="text-2xl md:text-4xl font-mono text-matrix-green neon-glow mt-4 mb-8 text-center select-none" ref={textRef}></div>
  );
}
