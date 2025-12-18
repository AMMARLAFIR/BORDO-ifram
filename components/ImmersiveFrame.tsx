
import React, { useEffect, useState, useRef } from 'react';
import { Language } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import { useTranslation } from 'react-i18next';

interface ImmersiveFrameProps {
  language: Language;
  isLoading: boolean;
  onLoaded: () => void;
}

const translationCache: Record<string, Record<string, string>> = {};

const ImmersiveFrame: React.FC<ImmersiveFrameProps> = ({ language, isLoading, onLoaded }) => {
  const { t } = useTranslation();
  const [contentUrl, setContentUrl] = useState('https://docs.arduino.cc/learn/');
  const [srcDoc, setSrcDoc] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  const fetchAndProcess = async (targetUrl: string) => {
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const baseUrl = new URL(targetUrl).origin + new URL(targetUrl).pathname;
      const baseTag = doc.createElement('base');
      baseTag.href = baseUrl;
      doc.head.prepend(baseTag);

      // Mobile Responsive & UI Improvements
      const customStyles = `
        <style>
          /* Remove global non-essential headers/footers */
          .arduino-header > nav:first-child, .arduino-footer, .footer-container, #footer, .cookie-banner, .feedback-widget { 
            display: none !important; 
          }
          
          /* Force Dark Mode and Responsive Base */
          html, body { 
            background-color: #0a1118 !important; 
            color: #cbd5e1 !important; 
            font-family: 'Inter', 'Noto Sans Sinhala', 'Noto Sans Tamil', sans-serif !important; 
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden !important;
            -webkit-font-smoothing: antialiased;
          }

          body {
            display: flex !important;
            flex-direction: column !important;
            min-height: 100vh !important;
          }

          /* Restore and Theme the Documentation Header (Search/Menu) */
          header.arduino-header, .docs-header, header {
            display: flex !important;
            background-color: #050b10 !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
            padding: 0.5rem 1rem !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 100 !important;
            align-items: center !important;
            justify-content: space-between !important;
          }

          /* Style the logo/title in the header */
          header h1, .header-title {
            font-size: 1rem !important;
            color: #2dd4bf !important;
            font-weight: 800 !important;
            text-transform: uppercase !important;
          }

          /* Responsive Layout */
          .main-wrapper {
            display: flex !important;
            flex: 1 !important;
            width: 100% !important;
          }

          /* Sidebar: Hidden by default on mobile, visible on desktop */
          aside, .sidebar, .docs-sidebar {
            background-color: #050b10 !important;
            border-right: 1px solid rgba(255,255,255,0.05) !important;
            height: calc(100vh - 50px) !important;
            position: sticky !important;
            top: 50px !important;
            overflow-y: auto !important;
            padding: 1.5rem !important;
            flex-shrink: 0 !important;
            transition: transform 0.3s ease !important;
          }

          @media (max-width: 1024px) {
            aside, .sidebar, .docs-sidebar {
              position: fixed !important;
              left: 0 !important;
              transform: translateX(-100%) !important;
              z-index: 90 !important;
              width: 280px !important;
              box-shadow: 20px 0 50px rgba(0,0,0,0.5) !important;
            }
            /* When menu is active (site uses a class on body usually) */
            body.menu-open aside, body.menu-open .sidebar {
              transform: translateX(0) !important;
            }
          }

          @media (min-width: 1025px) {
            aside, .sidebar, .docs-sidebar {
              width: 280px !important;
              display: block !important;
            }
          }

          /* Main Content Container */
          main, .docs-content, article {
            flex-grow: 1 !important;
            padding: 1.5rem !important;
            width: 100% !important;
            max-width: 100% !important;
            background-color: #0a1118 !important;
            box-sizing: border-box !important;
          }

          @media (min-width: 768px) {
            main, .docs-content, article {
              padding: 3rem !important;
              max-width: 900px !important;
              margin: 0 auto !important;
            }
          }

          /* Breadcrumbs Area */
          .breadcrumb, .breadcrumbs, .breadcrumb-container, nav[aria-label="Breadcrumb"] {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 0.5rem !important;
            margin-bottom: 1.5rem !important;
            padding: 0 !important;
            font-size: 0.65rem !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.1em !important;
            color: #475569 !important;
          }

          .breadcrumb a { color: #2dd4bf !important; text-decoration: none !important; }

          h1 { color: #ffffff !important; font-size: 1.75rem !important; margin: 0.5rem 0 1.5rem 0 !important; }
          @media (min-width: 768px) {
            h1 { font-size: 2.5rem !important; }
          }
          
          p, li { line-height: 1.7 !important; font-size: 1rem !important; margin-bottom: 1.25rem !important; color: #94a3b8 !important; }
          
          /* Videos and Code */
          .video-container, iframe[src*="youtube"] {
            width: 100% !important;
            aspect-ratio: 16/9 !important;
            border-radius: 12px !important;
            margin: 2rem 0 !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
          }

          code, pre { 
            background-color: #050b10 !important; 
            padding: 1rem !important;
            border-radius: 8px !important;
            overflow-x: auto !important;
            font-size: 0.9rem !important;
          }

          /* Menu/Toggle Button Styling */
          button.menu-toggle, .hamburger, [aria-label*="menu"] {
            background: transparent !important;
            border: none !important;
            color: #2dd4bf !important;
            padding: 10px !important;
            cursor: pointer !important;
          }
        </style>
      `;
      doc.head.insertAdjacentHTML('beforeend', customStyles);

      const bridgeScript = doc.createElement('script');
      bridgeScript.textContent = `
        document.addEventListener('click', (e) => {
          const a = e.target.closest('a');
          if (a && a.href && !a.href.startsWith('javascript:')) {
            const url = new URL(a.href);
            if (url.hostname.includes('arduino.cc')) {
              e.preventDefault();
              window.parent.postMessage({ type: 'NAVIGATE', url: a.href }, '*');
            }
          }
          
          // Detect menu button clicks to toggle sidebar class
          const btn = e.target.closest('button, .menu-toggle, [aria-label*="menu"]');
          if (btn) {
            document.body.classList.toggle('menu-open');
          }
        });

        window.addEventListener('message', (e) => {
          if (e.data.type === 'APPLY_TRANSLATIONS') {
            const translations = e.data.payload;
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let node;
            while (node = walker.nextNode()) {
              const text = node.nodeValue.trim();
              if (translations[text]) {
                node.nodeValue = translations[text];
              }
            }
          }
        });
      `;
      doc.body.appendChild(bridgeScript);

      setSrcDoc(doc.documentElement.outerHTML);
      onLoaded(); 

      if (language !== 'en') {
        performBackgroundTranslation(targetUrl, doc, language);
      }

    } catch (error) {
      console.error('Bridge Error:', error);
      onLoaded();
    }
  };

  const performBackgroundTranslation = async (targetUrl: string, doc: Document, lang: Language) => {
    const cacheKey = `${lang}-${targetUrl}`;
    const langName = lang === 'si' ? 'Sinhala' : 'Tamil';
    
    if (translationCache[cacheKey]) {
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage({
          type: 'APPLY_TRANSLATIONS',
          payload: translationCache[cacheKey]
        }, '*');
      }, 600);
      return;
    }

    setIsTranslating(true);
    
    const uniqueTexts = new Set<string>();
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent || ['code', 'pre', 'script', 'style'].includes(parent.tagName.toLowerCase())) return NodeFilter.FILTER_REJECT;
        const text = node.nodeValue?.trim() || '';
        return text.length > 5 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    let node;
    while ((node = walker.nextNode()) && uniqueTexts.size < 30) { 
      uniqueTexts.add(node.nodeValue!.trim());
    }

    if (uniqueTexts.size > 0) {
      const textsToTranslate = Array.from(uniqueTexts);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      try {
        const aiResponse = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Translate to ${langName}: ` + JSON.stringify(textsToTranslate),
          config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
            systemInstruction: `FAST Technical Translator. Output JSON Array ONLY. Keep English technical terms. Be concise.`,
            temperature: 0
          }
        });

        const results = JSON.parse(aiResponse.text || '[]');
        const mapping: Record<string, string> = {};
        textsToTranslate.forEach((original, i) => {
          if (results[i]) mapping[original] = results[i];
        });

        translationCache[cacheKey] = mapping;
        
        iframeRef.current?.contentWindow?.postMessage({
          type: 'APPLY_TRANSLATIONS',
          payload: mapping
        }, '*');

      } catch (e) {
        console.warn("Background translation error.");
      }
    }
    setIsTranslating(false);
  };

  useEffect(() => {
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(() => fetchAndProcess(contentUrl), 300);
    return () => { if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current); };
  }, [contentUrl, language]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'NAVIGATE') setContentUrl(e.data.url);
      else if (e.data.type === 'RETRY') fetchAndProcess(contentUrl);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [contentUrl]);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050b10]">
      <div className="h-10 bg-[#0a1118] border-b border-white/5 flex items-center px-4 justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
          </div>
          <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
          <div className="flex items-center gap-2 px-2 py-1 bg-black/40 rounded-full border border-white/5 max-w-[150px] md:max-w-none">
            <span className="text-[7px] md:text-[8px] text-slate-600 font-mono tracking-widest uppercase truncate">
              STREAM // {contentUrl.replace('https://', '').substring(0, 20)}...
            </span>
          </div>
        </div>

        {isTranslating && (
          <div className="flex items-center gap-2 px-2 py-1 bg-teal-500/10 border border-teal-500/20 rounded-lg animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
            <span className="text-[7px] md:text-[8px] font-black text-teal-400 uppercase tracking-widest">
              {t('native_bridge')}
            </span>
          </div>
        )}
      </div>

      <div className="relative flex-grow overflow-hidden bg-[#050b10]">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050b10]">
            <div className="w-8 h-8 border-2 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-[8px] text-teal-500/50 font-black tracking-[0.4em] uppercase">
              {t('loading_docs')}
            </p>
          </div>
        )}

        <iframe
          ref={iframeRef}
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-same-origin allow-forms allow-presentation allow-downloads allow-popups allow-modals"
          className={`w-full h-full border-none transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          title="BORDO Educational Content"
        />
        
        <div className="absolute bottom-4 right-4 z-40 pointer-events-none scale-75 md:scale-100 origin-bottom-right">
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-xl border border-white/5 px-3 py-1.5 rounded-xl shadow-2xl">
            <div className="w-1 h-1 rounded-full bg-teal-500"></div>
            <span className="text-[8px] text-white/50 font-black tracking-[0.2em] uppercase">
              {t('active_session')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveFrame;
