import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber text-neon">
      <h2 className="text-4xl font-techno mb-4">{t('contact_title')}</h2>
      <form className="flex flex-col gap-4 w-full max-w-md bg-cyber/80 p-8 rounded-xl border border-holo shadow-neon">
        <input className="p-3 rounded bg-cyber text-neon border border-holo focus:outline-none" placeholder={t('contact_name')} />
        <input className="p-3 rounded bg-cyber text-neon border border-holo focus:outline-none" placeholder={t('contact_email')} />
        <textarea className="p-3 rounded bg-cyber text-neon border border-holo focus:outline-none" placeholder={t('contact_message')} rows={4} />
        <button className="bg-neon text-cyber font-bold py-2 rounded shadow-neon hover:bg-holo transition">{t('contact_send')}</button>
      </form>
      <div className="flex gap-6 mt-8 text-3xl">
        <a href="https://wa.me/" target="_blank" rel="noopener" className="hover:text-holo">🟢</a>
        <a href="https://facebook.com/" target="_blank" rel="noopener" className="hover:text-holo">📘</a>
        <a href="https://github.com/" target="_blank" rel="noopener" className="hover:text-holo">🐙</a>
        <a href="https://instagram.com/" target="_blank" rel="noopener" className="hover:text-holo">📸</a>
      </div>
    </div>
  );
};

export default Contact;
