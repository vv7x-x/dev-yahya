import { useTranslation } from 'react-i18next';

const CV = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber text-neon">
      <h2 className="text-4xl font-techno mb-4">{t('cv_title')}</h2>
      <a href="/cv.pdf" download className="bg-neon text-cyber font-bold py-3 px-8 rounded shadow-neon hover:bg-holo transition text-2xl mt-8">{t('cv_download')}</a>
    </div>
  );
};

export default CV;
