export type Book = {
  num: string;
  english_title: string;
  arabic_title: string;
  hadith_list: Hadith[];
};

export type Hadith = {
  title: string;
  narrator: string;
  english_text: string;
  arabic_text: string;
  local_num: string;
  grade: string;
  uuid: string;
};

export type SahihAlBukhari = {
  name: string;
  arabic_name: string;
  short_desc: string;
  num_books: string;
  num_hadiths: string;
  all_books: Book[];
};
