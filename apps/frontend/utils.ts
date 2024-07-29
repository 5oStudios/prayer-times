export const wait = async (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const minuetsToMilliseconds = (minuets: number) => minuets * 60 * 1000;

export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }

    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export function getShiftBy(cityId: number): number {
  if (cityId >= 0 && cityId <= 24) {
    return 1;
  }
  if (cityId >= 25 && cityId <= 35) {
    return 2;
  }
  if (cityId >= 36 && cityId <= 39) {
    return 4;
  }
  if (cityId === 40) {
    return 5;
  }
  return 6;
}
