import countryCityDB from './cities.json';
import { City, Country } from './type';

const db: Country = countryCityDB as unknown as Country;

function getCountryName() {
  return db.country;
}

function getCities(): City[] {
  return db.cities.map((city) => city);
}

function getCityAdjustTime(index: number) {
  return db.cities[index].adjustTime;
}

export { getCountryName, getCities, getCityAdjustTime };
