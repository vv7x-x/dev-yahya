import { useState } from 'react';

const YahyaPortfolio = () => {
  const [activeTab, setActiveTab] = useState('about');

  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };

  const TabContent = ({ id, children, isActive }) => (
    <div className={`${isActive ? 'block' : 'hidden'} p-5 h-full`}>
      {children}
    </div>
  );

  return (
    <div className="w-full h-screen bg-[#1e1e1e] text-[#cccccc] overflow-hidden font-sans" dir="rtl">
      {/* Title Bar */}
      <div className="h-[30px] bg-[#252526] border-b border-[#3e3e42] flex items-center px-3 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer hover:scale-110 transition-transform"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] cursor-pointer hover:scale-110 transition-transform"></div>
          <div className="w-3 h-3 rounded-full bg-[#27ca3f] cursor-pointer hover:scale-110 transition-transform"></div>
        </div>
        <div className="text-xs text-[#969696]">يحيى رضا - Developer Portfolio</div>
        <div className="flex gap-2 text-xs">
          <i className="fas fa-minus p-1 hover:bg-[#2d2d30] rounded cursor-pointer"></i>
          <i className="fas fa-square p-1 hover:bg-[#2d2d30] rounded cursor-pointer"></i>
          <i className="fas fa-times p-1 hover:bg-[#2d2d30] rounded cursor-pointer"></i>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex h-[calc(100vh-52px)]">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] border-r border-[#3e3e42] flex flex-col items-center py-2">
          <div className="w-10 h-10 flex items-center justify-center mb-2 rounded bg-[#252526] border-l-2 border-[#007acc]">
            <i className="fas fa-folder-tree text-[#cccccc]"></i>
          </div>
          <div className="w-10 h-10 flex items-center justify-center mb-2 rounded hover:bg-[#252526] cursor-pointer transition-all">
            <i className="fas fa-search text-[#969696] hover:text-[#cccccc]"></i>
          </div>
          <div className="w-10 h-10 flex items-center justify-center mb-2 rounded hover:bg-[#252526] cursor-pointer transition-all">
            <i className="fas fa-code-branch text-[#969696] hover:text-[#cccccc]"></i>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-[#252526] border-r border-[#3e3e42]">
          <div className="p-4 border-b border-[#3e3e42] flex justify-between items-center">
            <h3 className="text-sm font-semibold">مستكشف المشاريع</h3>
            <div className="flex gap-1">
              <i className="fas fa-plus text-xs text-[#969696] hover:text-[#cccccc] cursor-pointer p-1 hover:bg-[#2d2d30] rounded"></i>
              <i className="fas fa-refresh text-xs text-[#969696] hover:text-[#cccccc] cursor-pointer p-1 hover:bg-[#2d2d30] rounded"></i>
            </div>
          </div>
          <div className="p-2">
            <div className="mb-2">
              <div className="flex items-center gap-2 p-1 hover:bg-[#2d2d30] rounded cursor-pointer">
                <i className="fas fa-folder-open text-[#ff8c42] text-sm"></i>
                <span className="text-sm">portfolio</span>
              </div>
              <div className="mr-4">
                {['about', 'projects', 'skills', 'contact'].map((item) => (
                  <div 
                    key={item}
                    className={`flex items-center gap-2 p-1 hover:bg-[#2d2d30] rounded cursor-pointer ${
                      activeTab === item ? 'bg-[#2d2d30] border-r-2 border-[#007acc]' : ''
                    }`}
                    onClick={() => switchTab(item)}
                  >
                    <i className={`text-sm ${
                      item === 'about' ? 'fab fa-js-square text-[#dcdcaa]' :
                      item === 'projects' ? 'fab fa-react text-[#007acc]' :
                      item === 'skills' ? 'fab fa-css3-alt text-[#007acc]' :
                      'fab fa-html5 text-[#ff8c42]'
                    }`}></i>
                    <span className="text-sm">{item}.{
                      item === 'about' ? 'js' :
                      item === 'projects' ? 'jsx' :
                      item === 'skills' ? 'css' : 'html'
                    }</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex bg-[#252526] border-b border-[#3e3e42] overflow-x-auto">
            {['about', 'projects', 'skills', 'contact'].map((item) => (
              <div 
                key={item}
                className={`flex items-center gap-2 px-4 py-2 border-r border-[#3e3e42] cursor-pointer min-w-[120px] ${
                  activeTab === item ? 'bg-[#1e1e1e] border-b-2 border-[#007acc]' : 'bg-[#2d2d30]'
                }`}
                onClick={() => switchTab(item)}
              >
                <span className="text-sm">{item}.{
                  item === 'about' ? 'js' :
                  item === 'projects' ? 'jsx' :
                  item === 'skills' ? 'css' : 'html'
                }</span>
                <i className="fas fa-times text-xs opacity-60 hover:opacity-100"></i>
              </div>
            ))}
          </div>

          {/* Editor Container */}
          <div className="flex-1 flex">
            {/* Line Numbers */}
            <div className="w-12 bg-[#252526] border-r border-[#3e3e42] p-2 text-center font-mono text-xs text-[#969696]">
              {Array.from({length: 20}, (_, i) => (
                <div key={i + 1} className="h-[18px] leading-[18px]">{i + 1}</div>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-auto">
              {/* About Content */}
              <TabContent id="about" isActive={activeTab === 'about'}>
                <div className="h-full flex items-center justify-center">
                  <div className="max-w-lg text-center font-mono">
                    <div className="text-lg mb-1 animate-pulse">
                      <span className="text-[#569cd6]">const</span>{' '}
                      <span className="text-[#9cdcfe]">developer</span>{' '}
                      <span className="text-[#d4d4d4]">=</span>{' '}
                      <span className="text-[#ffd700]">{'{'}</span>
                    </div>
                    <div className="text-lg mb-1 mr-4">
                      <span className="text-[#92c5f8]">name</span>
                      <span className="text-[#d4d4d4]">:</span>{' '}
                      <span className="text-[#ce9178]">"يحيى رضا"</span>
                      <span className="text-[#d4d4d4]">,</span>
                    </div>
                    <div className="text-lg mb-1 mr-4">
                      <span className="text-[#92c5f8]">title</span>
                      <span className="text-[#d4d4d4]">:</span>{' '}
                      <span className="text-[#ce9178]">"Full Stack Developer"</span>
                      <span className="text-[#d4d4d4]">,</span>
                    </div>
                    <div className="text-lg mb-1 mr-4">
                      <span className="text-[#92c5f8]">specialization</span>
                      <span className="text-[#d4d4d4]">:</span>{' '}
                      <span className="text-[#ffd700]">[</span>
                      <span className="text-[#ce9178]">"مواقع ويب"</span>
                      <span className="text-[#d4d4d4]">,</span>{' '}
                      <span className="text-[#ce9178]">"بوتات"</span>
                      <span className="text-[#ffd700]">]</span>
                      <span className="text-[#d4d4d4]">,</span>
                    </div>
                    <div className="text-lg mb-1 mr-4">
                      <span className="text-[#92c5f8]">experience</span>
                      <span className="text-[#d4d4d4]">:</span>{' '}
                      <span className="text-[#ce9178]">"5+ years"</span>
                      <span className="text-[#d4d4d4]">,</span>
                    </div>
                    <div className="text-lg mb-1 mr-4">
                      <span className="text-[#92c5f8]">passion</span>
                      <span className="text-[#d4d4d4]">:</span>{' '}
                      <span className="text-[#ce9178]">"تطوير حلول مبتكرة"</span>
                    </div>
                    <div className="text-lg">
                      <span className="text-[#ffd700]">{'}'}</span>
                      <span className="text-[#d4d4d4]">;</span>
                    </div>
                  </div>
                </div>
              </TabContent>

              {/* Projects Content */}
              <TabContent id="projects" isActive={activeTab === 'projects'}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: 'fas fa-globe', title: 'مواقع الويب', desc: 'تطوير مواقع ويب متجاوبة وسريعة باستخدام أحدث التقنيات', tags: ['React', 'Node.js', 'MongoDB'] },
                    { icon: 'fas fa-robot', title: 'البوتات الذكية', desc: 'بوتات تلجرام وديسكورد متقدمة بذكاء اصطناعي', tags: ['Python', 'Telegram API', 'AI/ML'] },
                    { icon: 'fas fa-mobile-alt', title: 'تطبيقات الجوال', desc: 'تطبيقات جوال أصلية ومتجاوبة لأنظمة iOS و Android', tags: ['React Native', 'Flutter', 'Firebase'] }
                  ].map((project, index) => (
                    <div key={index} className="bg-gradient-to-br from-[#252526] to-[#2d2d30] p-6 rounded-xl border border-[#3e3e42] hover:shadow-xl hover:shadow-[#007acc]/20 transition-all duration-300 hover:-translate-y-2">
                      <div className="w-15 h-15 bg-gradient-to-r from-[#007acc] to-[#c586c0] rounded-xl flex items-center justify-center mb-4">
                        <i className={`${project.icon} text-white text-2xl`}></i>
                      </div>
                      <h3 className="text-xl mb-3">{project.title}</h3>
                      <p className="text-[#969696] mb-4 leading-relaxed">{project.desc}</p>
                      <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-[#333333] text-[#007acc] px-3 py-1 rounded-full text-xs border border-[#007acc] hover:bg-[#007acc] hover:text-white transition-all">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabContent>

              {/* Skills Content */}
              <TabContent id="skills" isActive={activeTab === 'skills'}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { category: 'Frontend', skills: [
                      { name: 'JavaScript', level: '95%' },
                      { name: 'React', level: '90%' },
                      { name: 'CSS/SCSS', level: '92%' }
                    ]},
                    { category: 'Backend', skills: [
                      { name: 'Node.js', level: '88%' },
                      { name: 'Python', level: '85%' },
                      { name: 'MongoDB', level: '80%' }
                    ]}
                  ].map((section, index) => (
                    <div key={index}>
                      <h3 className="text-lg mb-5 text-[#007acc] relative">
                        {section.category}
                        <div className="absolute bottom-[-5px] left-0 w-10 h-0.5 bg-[#007acc]"></div>
                      </h3>
                      <div className="space-y-5">
                        {section.skills.map((skill, skillIndex) => (
                          <div key={skillIndex}>
                            <div className="mb-2">{skill.name}</div>
                            <div className="h-1.5 bg-[#2d2d30] rounded overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#007acc] to-[#c586c0] rounded transition-all duration-1000"
                                style={{ width: skill.level }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabContent>

              {/* Contact Content */}
              <TabContent id="contact" isActive={activeTab === 'contact'}>
                <div className="text-center">
                  <h2 className="text-2xl mb-8">تواصل معي</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
                    {[
                      { icon: 'fas fa-envelope', text: 'yahya@example.com', href: 'mailto:yahya@example.com' },
                      { icon: 'fas fa-phone', text: '+123 456 7890', href: 'tel:+1234567890' },
                      { icon: 'fab fa-telegram', text: '@YahyaReda', href: '#' },
                      { icon: 'fab fa-github', text: 'github.com/yahyareda', href: '#' }
                    ].map((contact, index) => (
                      <a key={index} href={contact.href} className="flex items-center gap-4 bg-[#252526] p-5 rounded-lg border border-[#3e3e42] hover:border-[#007acc] transition-all hover:-translate-y-1 hover:shadow-lg">
                        <i className={`${contact.icon} text-xl text-[#007acc]`}></i>
                        <span>{contact.text}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </TabContent>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-[22px] bg-[#007acc] text-white flex justify-between items-center px-4 text-xs">
        <div className="flex gap-4">
          <span>JavaScript</span>
          <span>UTF-8</span>
          <span>CRLF</span>
        </div>
        <div className="flex gap-4">
          <span>Ln 1, Col 1</span>
          <span>يحيى رضا - مطور محترف</span>
        </div>
      </div>
    </div>
  );
};

export default YahyaPortfolio;