import countryCityDB from './cities.json';
import { Country } from './type';

const db: Country = countryCityDB as unknown as Country;

function getCountryName() {
  return db.country;
}

function getCities(country: string) {
  return db.cities.map((city) => city.name);
}

function getCityAdjustTime(index: number) {
  return db.cities[index].adjustTime;
}

export { getCountryName, getCities, getCityAdjustTime };
