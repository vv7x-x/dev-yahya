import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const demoProjects = [
  { title: 'موقع شخصي ثلاثي الأبعاد', tags: ['3D', 'WebGL'] },
  { title: 'لوحة تحكم تفاعلية', tags: ['Dashboard', 'React'] },
  { title: 'بوت ذكاء اصطناعي', tags: ['AI', 'Chatbot'] },
];

const AI = () => {
  const { t } = useTranslation();
  const [msg, setMsg] = useState('');
  const [reply, setReply] = useState('');
  const [suggested, setSuggested] = useState([]);

  const handleSend = () => {
    if (!msg) return;
    // منطق بوت بسيط: اقتراح مشاريع حسب الكلمات المفتاحية
    const found = demoProjects.filter(p => msg.split(' ').some(word => p.tags.join(' ').toLowerCase().includes(word.toLowerCase())));
    setReply(found.length ? 'هذه مشاريع قد تهمك:' : 'لم أجد مشاريع مناسبة، جرب كلمات أخرى!');
    setSuggested(found);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber text-neon">
      <h2 className="text-4xl font-techno mb-4">{t('ai_title')}</h2>
      <div className="bg-cyber/80 border border-glitch rounded-xl p-8 shadow-neon w-full max-w-lg">
        <p className="text-holo mb-4">{t('ai_desc')}</p>
        <div className="flex gap-2 mb-4">
          <input value={msg} onChange={e => setMsg(e.target.value)} className="flex-1 p-2 rounded bg-cyber text-neon border border-holo" placeholder="اكتب اهتماماتك..." />
          <button onClick={handleSend} className="bg-neon text-cyber font-bold px-4 rounded shadow-neon hover:bg-holo transition">إرسال</button>
        </div>
        {reply && <div className="mb-2 text-holo">{reply}</div>}
        <ul>
          {suggested.map((p, i) => <li key={i} className="text-glitch">{p.title}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default AI;
