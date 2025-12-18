
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-12 bg-[#050b10] border-b border-white/5 shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(20,184,166,0.3)]">
          B
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
            BORDO <span className="text-teal-400">LEARN</span>
          </h1>
          <p className="text-[9px] md:text-[10px] text-slate-500 tracking-[0.3em] font-bold leading-none mt-1 uppercase">
            {t('tagline')}
          </p>
        </div>
      </div>

      <LanguageSwitcher />
    </header>
  );
};

export default Header;
