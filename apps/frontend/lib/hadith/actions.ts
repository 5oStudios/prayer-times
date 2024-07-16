'use server';

import hadith from './sahih_bukhari.json';
import { SahihAlBukhari } from './type.js';

const db: SahihAlBukhari = hadith as SahihAlBukhari;

function getAllHadithEnglish(index: number): string[] {
  const allBooks = db.all_books;
  const allEnglishHadiths: string[] = [];
  allBooks[index].hadith_list.forEach((hadith) => {
    allEnglishHadiths.push(hadith.english_text);
  });

  return allEnglishHadiths;
}

function getAllHadithArabic(index: number): string[] {
  const allBooks = db.all_books;
  const allArabicHadiths: string[] = [];

  allBooks[index].hadith_list.forEach((hadith) => {
    allArabicHadiths.push(hadith.arabic_text);
  });

  return allArabicHadiths;
}

export { getAllHadithEnglish, getAllHadithArabic };
