import hadith from './sahih_bukhari.json';
import { SahihAlBukhari } from './type.js';

const db: SahihAlBukhari = hadith as SahihAlBukhari;

export function getAllHadithEnglish() {
  const allBooks = db.all_books;
  return allBooks.map((sentence) => {
    sentence.english_title;
  });
}

export function getAllHadithArabic() {
  const allBooks = db.all_books;
  return allBooks.map((sentence) => {
    sentence.arabic_title;
  });
}
