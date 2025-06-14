import { useState, useEffect } from 'react';
import BootAnimation from './components/BootAnimation';
import AppRouter from './routes/AppRouter';
import LanguageSwitcher from './components/LanguageSwitcher';
import ParallaxBG from './components/ParallaxBG';
import ThemeSwitcher from './components/ThemeSwitcher';
import BackToTop from './components/BackToTop';
import Notification from './components/Notification';
import './App.css';

function App() {
  const [bootDone, setBootDone] = useState(false);
  const [notif, setNotif] = useState({ message: '', type: 'info' });

  // مثال: إظهار إشعار عند التشغيل
  useEffect(() => {
    setNotif({ message: 'مرحباً بك في الموقع المطور!', type: 'info' });
    const timer = setTimeout(() => setNotif({ message: '', type: 'info' }), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ParallaxBG />
      <LanguageSwitcher />
      <ThemeSwitcher />
      <Notification message={notif.message} type={notif.type} onClose={() => setNotif({ message: '', type: 'info' })} />
      {!bootDone && <BootAnimation onFinish={() => setBootDone(true)} />}
      {bootDone && <AppRouter />}
      <BackToTop />
    </>
  );
}

export default App;
