
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Language, LANGUAGES } from '../types';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as Language;

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('bordo-lang', lang);
    // Dispatch a custom event to notify components that need to re-fetch translated content
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  };

  return (
    <div className="relative flex items-center bg-[#0f172a]/80 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-inner">
      {/* Animated Sliding Highlight */}
      <div 
        className="absolute h-[calc(100%-8px)] rounded-xl bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-300 ease-out"
        style={{
          width: `calc(${100 / LANGUAGES.length}% - 4px)`,
          left: `calc(${(LANGUAGES.findIndex(l => l.code === currentLang) * 100) / LANGUAGES.length}% + 4px)`
        }}
      />
      
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`
            relative z-10 px-5 py-2.5 rounded-xl text-xs font-black tracking-widest transition-colors duration-300
            ${currentLang === lang.code ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
          `}
        >
          {lang.nativeLabel}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
