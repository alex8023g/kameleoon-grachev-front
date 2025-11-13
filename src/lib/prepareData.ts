import dayjs from 'dayjs';
import json from '../data/data.json';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { mergeObjects } from './mergeObjects';

dayjs.extend(weekOfYear);

type VariationId = 0 | 10001 | 10002 | 10003;

type Variation = {
  id: VariationId;
  name: string;
};

type DataProto = {
  date: string;
  visits: { [key: string]: number };
  conversions: { [key: string]: number };
};

export type Data = {
  date: string;
} & Record<string, number>;

export function prepareData() {
  const variations: Variation[] = json.variations.map((variation) =>
    variation.id
      ? { id: variation.id as VariationId, name: variation.name }
      : { id: 0, name: variation.name }
  );

  const dataProto = json.data as DataProto[];

  const dataPerDay: Data[] = [];
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
    dataPerDay.push(dataItem);
  });

  const seen = new Set<string>();
  const monthTicks = dataPerDay.reduce<string[]>((acc, item) => {
    const monthKey = dayjs(item.date).format('YYYY-MM');
    if (!seen.has(monthKey)) {
      seen.add(monthKey);
      acc.push(item.date);
    }
    return acc;
  }, []);

  const dataPerWeekProto: DataProto[] = [];
  let dataItemProto: DataProto | null = null;
  const weekNumbers = new Set<number>();
  dataProto.forEach((item) => {
    const weekNumber = dayjs(item.date).week();
    if (!weekNumbers.has(weekNumber)) {
      weekNumbers.add(weekNumber);
      if (dataItemProto) {
        dataPerWeekProto.push(dataItemProto);
      }
      dataItemProto = structuredClone(item);
    } else {
      if (dataItemProto) {
        dataItemProto.visits = mergeObjects([dataItemProto.visits, item.visits]);
        dataItemProto.conversions = mergeObjects([
          dataItemProto.conversions,
          item.conversions,
        ]);
      }
    }
  });

  if (dataItemProto) {
    dataPerWeekProto.push(dataItemProto);
  }

  const weekTicks: string[] = [];
  const dataPerWeek: Data[] = [];
  dataPerWeekProto.forEach((item, index) => {
    weekTicks.push(String(index + 1));
    const dataItem = {
      date: String(index + 1),
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
    dataPerWeek.push(dataItem);
  });

  return { dataPerDay, monthTicks, dataPerWeek, weekTicks };
}
