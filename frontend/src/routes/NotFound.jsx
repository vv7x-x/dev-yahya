import React from 'react';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <h1 className="text-6xl font-bold mb-4">404</h1>
    <p className="text-2xl mb-8">الصفحة غير موجودة</p>
    <a href="/" className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">العودة للرئيسية</a>
  </div>
);

export default NotFound;
