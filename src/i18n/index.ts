import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import jaTranslation from './locales/ja/translation.json';
import zhTranslation from './locales/zh/translation.json';
import deTranslation from './locales/de/translation.json';
import frTranslation from './locales/fr/translation.json';
import esTranslation from './locales/es/translation.json';
import ptTranslation from './locales/pt/translation.json';
import koTranslation from './locales/ko/translation.json';
import ruTranslation from './locales/ru/translation.json';
import arTranslation from './locales/ar/translation.json';
import itTranslation from './locales/it/translation.json';
import nlTranslation from './locales/nl/translation.json';
import trTranslation from './locales/tr/translation.json';
import viTranslation from './locales/vi/translation.json';
import idTranslation from './locales/id/translation.json';

export const SUPPORTED_LANGUAGES = [
  'en', 'ja', 'zh', 'de', 'fr', 'es', 'pt',
  'ko', 'ru', 'ar', 'it', 'nl', 'tr', 'vi', 'id',
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ja: { translation: jaTranslation },
      zh: { translation: zhTranslation },
      de: { translation: deTranslation },
      fr: { translation: frTranslation },
      es: { translation: esTranslation },
      pt: { translation: ptTranslation },
      ko: { translation: koTranslation },
      ru: { translation: ruTranslation },
      ar: { translation: arTranslation },
      it: { translation: itTranslation },
      nl: { translation: nlTranslation },
      tr: { translation: trTranslation },
      vi: { translation: viTranslation },
      id: { translation: idTranslation },
    },
    fallbackLng: 'en',
    supportedLngs: [...SUPPORTED_LANGUAGES],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
