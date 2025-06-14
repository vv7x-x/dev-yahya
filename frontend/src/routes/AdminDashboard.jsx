import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber text-neon">
      <h2 className="text-4xl font-techno mb-4">{t('admin_title')}</h2>
      <div className="bg-cyber/80 border border-glitch rounded-xl p-8 shadow-neon">
        <p className="text-holo">{t('admin_desc')}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
