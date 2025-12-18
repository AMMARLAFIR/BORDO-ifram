
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "brand": "BORDO LEARN",
      "tagline": "INTELLIGENCE. BUILT BY YOU.",
      "loading_docs": "Synchronizing Docs",
      "optimizing": "Optimizing Educational Stream",
      "active_session": "LIVE SESSION",
      "native_bridge": "AI-Native Bridge",
      "connection_interrupted": "Connection Interrupted",
      "retry": "Retry Secure Connection",
      "failed_desc": "We encountered a technical issue while fetching the documentation.",
      "footer_text": "© 2024 BORDO LEARN • Sri Lanka Education Initiative • AI Powered"
    }
  },
  si: {
    translation: {
      "brand": "BORDO ඉගෙනුම",
      "tagline": "බුද්ධිය. ඔබ විසින් නිර්මාණය කරන ලදී.",
      "loading_docs": "ලේඛන සමමුහුර්ත කරමින්",
      "optimizing": "අධ්‍යාපනික ප්‍රවාහය ප්‍රශස්ත කරමින්",
      "active_session": "සක්‍රීය සැසිය",
      "native_bridge": "AI-දේශීය පාලම",
      "connection_interrupted": "සම්බන්ධතාවය බිඳ වැටී ඇත",
      "retry": "නැවත උත්සාහ කරන්න",
      "failed_desc": "ලේඛන ලබා ගැනීමේදී තාක්ෂණික දෝෂයක් ඇතිවිය.",
      "footer_text": "© 2024 BORDO ඉගෙනුම • ශ්‍රී ලංකා අධ්‍යාපන මුලපිරීම • AI බලගැන්වීම"
    }
  },
  ta: {
    translation: {
      "brand": "BORDO கற்றல்",
      "tagline": "அறிவு. உங்களால் உருவாக்கப்பட்டது.",
      "loading_docs": "ஆவணங்களை ஒத்திசைக்கிறது",
      "optimizing": "கல்வி ஓட்டத்தை மேம்படுத்துகிறது",
      "active_session": "செயலில் உள்ள அமர்வு",
      "native_bridge": "AI-நேட்டிவ் பிரிட்ஜ்",
      "connection_interrupted": "இணைப்பு துண்டிக்கப்பட்டது",
      "retry": "மீண்டும் முயற்சிக்கவும்",
      "failed_desc": "ஆவணங்களைப் பெறும்போது தொழில்நுட்ப சிக்கல் ஏற்பட்டது.",
      "footer_text": "© 2024 BORDO கற்றல் • இலங்கை கல்வி முயற்சி • AI இயக்கப்படுகிறது"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('bordo-lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
