'use server';

import hadith from './sahih_bukhari.json';
import { SahihAlBukhari } from './type.js';

const db: SahihAlBukhari = hadith as SahihAlBukhari;
const indexLimit = 96;

type GetHadithProps = {
  index: number;
  lang: string;
  currentHadith: string[];
};

export async function getHadithLocal({
  index,
  lang,
  currentHadith,
}: GetHadithProps): Promise<string[]> {
  if (lang === 'ar') {
    const allArabicHadiths = getAllHadithArabic(index);
    currentHadith.push(...allArabicHadiths);
    return currentHadith;
  } else {
    const allEnglishHadiths = getAllHadithEnglish(index);
    currentHadith.push(...allEnglishHadiths);
    return currentHadith;
  }
}

function getAllHadithEnglish(index: number): string[] {
  if (index > indexLimit) return [];
  const allBooks = db.all_books;
  const allEnglishHadiths: string[] = [];
  allBooks[index].hadith_list.forEach((hadith) => {
    allEnglishHadiths.push(hadith.english_text);
  });

  return allEnglishHadiths;
}

function getAllHadithArabic(index: number): string[] {
  if (index > indexLimit) return [];
  const allBooks = db.all_books;
  const allArabicHadiths: string[] = [];

  allBooks[index].hadith_list.forEach((hadith) => {
    allArabicHadiths.push(hadith.arabic_text);
  });

  return allArabicHadiths;
}
