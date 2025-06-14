import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber text-neon">
      <h2 className="text-4xl font-techno mb-4">{t('about_title')}</h2>
      <p className="max-w-2xl text-center text-lg text-holo">
        {t('about_desc')}
      </p>
    </div>
  );
};

export default About;
