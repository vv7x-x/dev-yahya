import { useTranslation } from 'react-i18next';
import GlowHover from '../components/GlowHover';
import { playClick } from '../components/SoundFX';
import { useEffect, useState } from 'react';
import { fetchProjects } from '../api/projects';

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber text-neon">
      <h2 className="text-4xl font-techno mb-4">{t('projects_title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {projects.length === 0 && <p className="text-holo">No projects yet.</p>}
        {projects.map((p) => (
          <GlowHover key={p._id}>
            <div className="bg-holo/10 border border-holo rounded-xl p-6 shadow-neon hover:scale-105 transition-transform cursor-pointer" onClick={playClick}>
              <h3 className="text-2xl font-techno">{p.title}</h3>
              <p className="text-holo">{p.description}</p>
              {p.link && <a href={p.link} className="text-holo underline" target="_blank" rel="noopener">Live</a>}
              {p.github && <a href={p.github} className="ml-4 text-glitch underline" target="_blank" rel="noopener">GitHub</a>}
            </div>
          </GlowHover>
        ))}
      </div>
    </div>
  );
};

export default Projects;
