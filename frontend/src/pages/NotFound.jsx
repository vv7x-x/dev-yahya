import React from 'react';
import MatrixBG from '../components/MatrixBG';
import GlitchLogo from '../components/GlitchLogo';
import NightModeToggle from '../components/NightModeToggle';
import CustomCursor from '../components/CustomCursor';
import AnimatedText from '../components/AnimatedText';
import SidebarMenu from '../components/SidebarMenu';
import LanguageSwitcher from '../components/LanguageSwitcher';
import AIBotSection from '../components/AIBotSection';
import usePlayWelcomeSound from '../hooks/usePlayWelcomeSound';
import '../styles/notfound-matrix.css';

export default function NotFound() {
  usePlayWelcomeSound();
  return (
    <div className="relative w-full h-screen overflow-hidden dark bg-matrix-dark text-matrix-green">
      <MatrixBG />
      <CustomCursor />
      <NightModeToggle />
      <SidebarMenu />
      <LanguageSwitcher className="fixed top-4 left-4 z-50" />
      <div className="flex flex-col items-center justify-center h-full z-10 relative">
        <GlitchLogo />
        <AnimatedText textAr="تم منح الوصول، أهلاً يحيى" textEn="ACCESS GRANTED, Welcome Yahya" />
      </div>
      <AIBotSection />
    </div>
  );
}
