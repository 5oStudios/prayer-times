import { Hadith, Meta, OnlineAPIResponse } from "../../../../src/interfaces";


export const convertStringsToHadithResponse = (strings: string[]): OnlineAPIResponse<Hadith[]> => {
  const hadithList: Hadith[] = strings.map((content, index) => ({
    id: index.toString(),
    content,
    translations: [], // Add translations if available
  }));

  const meta: Meta = {
    current_page: '1',
    last_page: 1,
    total_items: strings.length,
    per_page: strings.length.toString(),
  };

  return { data: hadithList, meta };
};
