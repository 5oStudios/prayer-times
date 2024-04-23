'use client';

import { createContext, ReactNode, useContext } from 'react';
import { getDictionary } from '../i18n/dictionaries';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

const DictionaryContext = createContext<Dictionary | null>(null);

export default function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: ReactNode;
}) {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}

export function useDictionary() {
  const dictionary = useContext(DictionaryContext);
  if (dictionary === null) {
    throw new Error('useDictionary hook must be used within DictionaryProvider');
  }

  return dictionary;
}
