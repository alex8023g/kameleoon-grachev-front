export function mergeObjects(data: { [key: string]: number }[]) {
  const result: { [key: string]: number } = {};

  data.forEach((basket) => {
    for (const [key, value] of Object.entries(basket)) {
      if (result[key]) {
        result[key] += value;
      } else {
        result[key] = value;
      }
    }
  });
  return result;
}
