import { useState } from 'react';
import './App.css';
import { DropdownVariant } from './components/DropDownVariant/DropDownVariant';
import { data, monthTicks } from './lib/prepareData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import dayjs from 'dayjs';

export type VariantMenuItem = {
  id: number;
  name: string;
  stroke: string;
};

const variantMenuItems: VariantMenuItem[] = [
  { id: 1, name: 'All variations', stroke: '' },
  { id: 2, name: 'Original', stroke: 'black' },
  { id: 3, name: 'Variation A', stroke: 'blue' },
  { id: 4, name: 'Variation B', stroke: 'orange' },
  { id: 5, name: 'Variation C', stroke: 'red' },
];

function App() {
  const [selectedVariant, setSelectedVariant] = useState<VariantMenuItem>(
    variantMenuItems[0]
  );
  return (
    <>
      <header>
        <DropdownVariant
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          variantMenuItems={variantMenuItems}
        />
      </header>
      <main>
        <LineChart
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
          <YAxis width='auto' />
          <XAxis
            dataKey='date'
            interval='preserveEnd'
            type='category'
            ticks={monthTicks}
            tick={{ transform: 'translate(20, 0)' }}
            tickFormatter={(value) => dayjs(value).format('MMM')}
          />
          <Tooltip />
          {variantMenuItems
            .filter((item) => {
              if (selectedVariant?.name === 'All variations') {
                return true;
              } else return item.name === selectedVariant?.name;
            })
            .map((item) => (
              <Line
                key={item.id}
                type='monotone'
                dot={false}
                dataKey={item.name}
                stroke={item.stroke}
              />
            ))}
        </LineChart>
      </main>
    </>
  );
}

export default App;
