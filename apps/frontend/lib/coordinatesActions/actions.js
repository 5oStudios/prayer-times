import countriesCityDB from './countries+cities.json';
// import { Country, City } from './type';

export function getCountries() {
  return countriesCityDB
    .filter((country) => country.cities && country.cities.length > 0)
    .map((country) => country.name);
}

export function getCities(country) {
  const countryData = countriesCityDB.find((c) => c.name === country);
  return countryData ? countryData.cities : [];
}

export function getCoordinates(country, city) {
  console.log('country = ', country, ' ', 'city = ', city);
  const countryIndex = countriesCityDB.findIndex((c) => c.name === country);
  if (countryIndex === -1) {
    console.error(`Country '${country}' not found in the database.`);
    return { latitude: null, longitude: null }; // or handle as appropriate
  }

  const countryData = countriesCityDB[countryIndex];
  const cityIndex = countryData.cities.findIndex((c) => c.name === city);
  if (cityIndex === -1) {
    console.error(`City '${city}' not found in '${country}'.`);
    return { latitude: null, longitude: null }; // or handle as appropriate
  }

  const { latitude, longitude } = countryData.cities[cityIndex];
  console.log('lats = ', latitude, ' ', 'longs = ', longitude);
  return { latitude, longitude };
}
