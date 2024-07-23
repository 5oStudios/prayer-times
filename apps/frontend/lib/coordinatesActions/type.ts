export type Country = {
  country: string;
  cities: city[];
};

type city = {
  name: string;
  adjustTime: number;
};
