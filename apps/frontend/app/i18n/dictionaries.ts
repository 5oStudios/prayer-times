import 'server-only';

type FlexibleDictionaryModule =
  | typeof import('./locales/ar.json')
  | typeof import('./locales/en.json');

type Dictionaries = Record<string, () => Promise<FlexibleDictionaryModule>>;

const dictionaries: Dictionaries = {
  en: () => import('./locales/en.json').then((module) => module.default),
  ar: () => import('./locales/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) =>
  dictionaries[locale === 'ar' ? 'ar' : 'en']();

export enum SupportedLanguages {
  Arabic = 'ar',
  English = 'en',
}
