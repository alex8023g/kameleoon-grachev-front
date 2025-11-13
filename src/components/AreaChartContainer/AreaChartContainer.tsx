import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import type { Data } from '../../lib/prepareData';
import type { PeriodMenuItem, VariantMenuItem } from '../../App';
import dayjs from 'dayjs';

export function AreaChartContainer({
  data,
  selectedPeriod,
  monthTicks,
  weekTicks,
  variantMenuItems,
  selectedVariant,
}: {
  data: Data[];
  selectedPeriod: PeriodMenuItem;
  monthTicks: string[];
  weekTicks: string[];
  variantMenuItems: VariantMenuItem[];
  selectedVariant: VariantMenuItem;
}) {
  return (
    <AreaChart
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <YAxis width='auto' tickFormatter={(value) => `${value}%`} />
      <XAxis
        dataKey='date'
        interval='preserveEnd'
        type='category'
        ticks={selectedPeriod === 'day' ? monthTicks : weekTicks}
        tick={{ transform: 'translate(20, 0)' }}
        tickFormatter={(value) =>
          selectedPeriod === 'day' ? dayjs(value).format('MMM') : value
        }
      />
      <Tooltip />
      {variantMenuItems
        .filter((item) => {
          if (selectedVariant?.name === 'All variations') {
            return true;
          } else return item.name === selectedVariant?.name;
        })
        .map((item) => (
          <Area
            key={item.id}
            type={'monotone'}
            dot={false}
            dataKey={item.name}
            stroke={item.stroke}
            fill={item.stroke}
            fillOpacity={0.2}
          />
        ))}
    </AreaChart>
  );
}
