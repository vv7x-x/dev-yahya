import { useState } from 'react';

export default function Notification({ message, type = 'info', onClose }) {
  if (!message) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white transition bg-${type === 'error' ? 'red' : 'blue'}-600`}>
      <span>{message}</span>
      <button className="ml-4 text-white font-bold" onClick={onClose}>×</button>
    </div>
  );
}
