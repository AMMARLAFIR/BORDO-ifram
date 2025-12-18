
export type Language = 'en' | 'si' | 'ta';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'si', label: 'Sinhala', nativeLabel: 'සිං' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தம' },
];
