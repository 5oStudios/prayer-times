import cities from './times.json';
import { CalculationMethods } from './type';

const db: CalculationMethods = cities as CalculationMethods;

export function getCountries() {
  const countries = Object.keys(db.countries);
  return countries;
}

export function getMethods(country: keyof CalculationMethods['countries']) {
  const methods = db.countries[country]?.methods;
  return methods;
}
