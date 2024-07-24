export const wait = async (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const minuetsToMilliseconds = (minuets: number) => minuets * 60 * 1000;
