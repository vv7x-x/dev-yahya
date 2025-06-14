import { useState } from 'react';
import BootAnimation from './components/BootAnimation';
import AppRouter from './routes/AppRouter';
import LanguageSwitcher from './components/LanguageSwitcher';
import ParallaxBG from './components/ParallaxBG';
import ThemeSwitcher from './components/ThemeSwitcher';
import BackToTop from './components/BackToTop';
import './App.css';

function App() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <>
      <ParallaxBG />
      <LanguageSwitcher />
      <ThemeSwitcher />
      {!bootDone && <BootAnimation onFinish={() => setBootDone(true)} />}
      {bootDone && <AppRouter />}
      <BackToTop />
    </>
  );
}

export default App;
