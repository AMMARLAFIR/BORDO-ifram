
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImmersiveFrame from './components/ImmersiveFrame';
import { Language } from './types';
import './i18n';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [langKey, setLangKey] = useState(0); // Key to force re-render/re-fetch on language change

  useEffect(() => {
    const handleLangChange = () => {
      setLangKey(prev => prev + 1);
      setIsLoading(true);
    };
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-[#050b10] overflow-hidden">
      <Header />
      
      <main className="flex-grow p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full h-full max-w-[1440px] mx-auto relative group">
          {/* Decorative Glow */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-teal-500/20 via-transparent to-blue-500/20 rounded-[2.5rem] blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
          
          <div className="relative w-full h-full bg-[#0a1118] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
            <ImmersiveFrame 
              key={`${i18n.language}-${langKey}`}
              language={i18n.language as Language} 
              isLoading={isLoading}
              onLoaded={() => setIsLoading(false)}
            />
          </div>
        </div>
      </main>

      <footer className="h-10 flex items-center justify-center px-8 bg-[#050b10] border-t border-white/5 select-none">
        <p className="text-[8px] tracking-[0.4em] text-slate-700 uppercase font-black">
          {t('footer_text')}
        </p>
      </footer>
    </div>
  );
};

export default App;
