export type TimeEntry = {
  date: string; // Format: "MM-DD"
  times: string[]; // Array of times in "HH:MM" format
};

export type MonthlyData = {
  [month: string]: TimeEntry[]; // Keys are month abbreviations (e.g., "JAN", "FEB")
};

export type Months =
  | 'JAN'
  | 'FEB'
  | 'MAR'
  | 'APR'
  | 'MAY'
  | 'JUN'
  | 'JUL'
  | 'AUG'
  | 'SEP'
  | 'OCT'
  | 'NOV'
  | 'DEC';
