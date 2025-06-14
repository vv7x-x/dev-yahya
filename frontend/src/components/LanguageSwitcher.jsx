import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button onClick={() => changeLang('ar')} className="px-3 py-1 rounded bg-glitch text-cyber font-bold shadow-neon hover:bg-neon transition">عربي</button>
      <button onClick={() => changeLang('en')} className="px-3 py-1 rounded bg-holo text-cyber font-bold shadow-neon hover:bg-neon transition">EN</button>
    </div>
  );
};
export default LanguageSwitcher;
