import json from '../data/data.json';

export type VariationId = 0 | 10001 | 10002 | 10003;

export type Variation = {
  id: VariationId;
  name: string;
};

export type Data = {
  date: string;
  visits: { [key: string]: number };
  conversions: { [key: string]: number };
};
const variations: Variation[] = json.variations.map((variation) =>
  variation.id
    ? { id: variation.id as VariationId, name: variation.name }
    : { id: 0, name: variation.name }
);
console.log('🚀 ~ App ~ variations:', variations);

const dataProto = json.data as Data[];

// export const data: { date: string; rates: { [key: string]: number } }[] = [];
export const data: { [key: string]: number }[] = [];

dataProto.forEach((item) => {
  const dataItem = {
    date: item.date,
    ...Object.fromEntries(
      Object.entries(item.conversions).map(([key, value]) => [
        variations.find((variation) => variation.id === (Number(key) as VariationId))
          ?.name,
        item.visits[key] === 0
          ? 0
          : Math.round((value / item.visits[key]) * 100 * 100) / 100,
      ])
    ),
  };
  data.push(dataItem);
});
