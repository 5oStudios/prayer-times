export interface OnlineAPIResponse<T> {
  data: T;
  meta: Meta;
}

export interface Hadith {
  id: string;
  content: string;
  translations: string[];
}

export interface Meta {
  current_page: string;
  last_page: number;
  total_items: number;
  per_page: string;
}
