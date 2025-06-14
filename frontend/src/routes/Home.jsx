import { useTranslation } from 'react-i18next';
import GlowHover from '../components/GlowHover';
import { playClick } from '../components/SoundFX';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber text-neon">
      <GlowHover>
        <h1 className="text-5xl md:text-7xl font-techno glitch-text cursor-pointer" onClick={playClick}>{t('home_title')}</h1>
      </GlowHover>
      <p className="mt-4 text-xl text-holo">{t('home_sub')}</p>
    </div>
  );
};

export default Home;
