export type Country = {
  country: string;
  cities: city[];
};

type city = {
  name: string;
  adjustTime: number;
};

export type CalculationMethod =
  | 'Kuwait'
  | 'Qatar'
  | 'Dubai'
  | 'MuslimWorldLeague'
  | 'Egyptian'
  | 'Karachi'
  | 'UmmAlQura'
  | 'MoonsightingCommittee'
  | 'NorthAmerica'
  | 'Singapore'
  | 'Tehran'
  | 'Turkey'
  | 'Other';

export interface CountryMethods {
  methods: CalculationMethod[];
}

export interface CalculationMethods {
  countries: {
    Egypt: CountryMethods;
    Kuwait: CountryMethods;
    Others: CountryMethods;
  };
}
