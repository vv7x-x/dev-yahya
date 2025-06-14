import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const GITHUB_USER = 'yahya-reda'; // غيّر هذا لاسم المستخدم الحقيقي

const GithubOpenSource = () => {
  const { t } = useTranslation();
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`)
      .then(res => res.json())
      .then(setRepos);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber text-neon">
      <h2 className="text-4xl font-techno mb-4">{t('github_title')}</h2>
      <div className="bg-cyber/80 border border-holo rounded-xl p-8 shadow-neon w-full max-w-2xl">
        <p className="text-holo mb-4">{t('github_desc')}</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map(repo => (
            <li key={repo.id} className="bg-holo/10 border border-holo rounded p-4 hover:scale-105 transition-transform">
              <a href={repo.html_url} target="_blank" rel="noopener" className="text-glitch font-bold underline">{repo.name}</a>
              <p className="text-holo text-sm mt-2">{repo.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GithubOpenSource;
