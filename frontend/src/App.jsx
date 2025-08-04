import { useState, useEffect } from 'react';
import YahyaPortfolio from './components/YahyaPortfolio';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // تحميل الخطوط والمكتبات
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    const googleFonts = document.createElement('link');
    googleFonts.rel = 'stylesheet';
    googleFonts.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap';
    document.head.appendChild(googleFonts);

    // محاكاة تحميل المكتبات
    setTimeout(() => setIsLoaded(true), 1000);

    return () => {
      document.head.removeChild(fontAwesome);
      document.head.removeChild(googleFonts);
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1e1e1e] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-[#007acc] mx-auto mb-4"></div>
          <p className="text-[#cccccc] font-['Cairo']">جاري تحميل موقع يحيى رضا...</p>
        </div>
      </div>
    );
  }

  return <YahyaPortfolio />;
}

export default App;
