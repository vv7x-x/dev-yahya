import React from 'react';
import { FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaDownload } from 'react-icons/fa';

const items = [
  { label: 'عن يحيى', icon: <FaUser />, href: '/about' },
  { label: 'المهارات', icon: <FaCode />, href: '/skills' },
  { label: 'المشاريع', icon: <FaProjectDiagram />, href: '/projects' },
  { label: 'اتصل بي', icon: <FaEnvelope />, href: '/contact' },
  { label: 'التحميل', icon: <FaDownload />, href: '/cv' },
];

export default function SidebarMenu() {
  return (
    <nav className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-black/60 rounded-r-xl shadow-lg p-2 flex flex-col gap-4">
      {items.map(item => (
        <a key={item.label} href={item.href} className="flex items-center gap-2 text-matrix-green hover:text-purple-400 transition text-lg px-3 py-2 rounded hover:bg-matrix-green/10">
          {item.icon}
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
