import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');

  if (!auth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cyber text-neon">
        <h2 className="text-3xl mb-4">تسجيل دخول المشرف</h2>
        <input
          type="password"
          placeholder="كلمة المرور"
          className="mb-4 px-4 py-2 rounded bg-gray-800 text-white"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
          onClick={() => setAuth(pass === 'admin123')}
        >دخول</button>
        {pass && pass !== 'admin123' && <div className="text-red-400 mt-2">كلمة المرور غير صحيحة</div>}
      </div>
    );
  }

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
