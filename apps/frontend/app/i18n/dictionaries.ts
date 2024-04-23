import 'server-only';

type FlexibleDictionaryModule = {
  default?: Record<string, string>;
  [key: string]: any;
};

type Dictionaries = Record<string, () => Promise<FlexibleDictionaryModule>>;

const dictionaries: Dictionaries = {
  en: () => import('./locales/en.json').then((module) => module.default),
  ar: () => import('./locales/ar.json').then((module) => module.default),
};

export const getDictionary = (locale: string) => dictionaries[locale]();
