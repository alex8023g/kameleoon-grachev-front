import { useState } from 'react';
import './App.css';
import { prepareData, type Data } from './lib/prepareData';
import { Layout } from './components/Layout/Layout';
import { LineChartContainer } from './components/LineChartContainer/LineChartContainer';
import { AreaChartContainer } from './components/AreaChartContainer/AreaChartContainer';
import { Header } from './components/Header/Header';
import { useCurrentPng } from 'recharts-to-png';

export type VariantMenuItem = {
  id: number;
  name: string;
  stroke: string;
};

const { dataPerDay, monthTicks, dataPerWeek, weekTicks } = prepareData();

const variantMenuItems: VariantMenuItem[] = [
  { id: 1, name: 'All variations', stroke: '' },
  { id: 2, name: 'Original', stroke: 'black' },
  { id: 3, name: 'Variation A', stroke: 'blue' },
  { id: 4, name: 'Variation B', stroke: 'orange' },
  { id: 5, name: 'Variation C', stroke: 'red' },
];

export type PeriodMenuItem = 'day' | 'week';

const periodMenuItems: PeriodMenuItem[] = ['day', 'week'];

export type LineStyleMenuItem = 'linear' | 'monotone' | 'area';

const lineStyleMenuItems: LineStyleMenuItem[] = ['linear', 'monotone', 'area'];

function App() {
  const [selectedVariant, setSelectedVariant] = useState<VariantMenuItem>(
    variantMenuItems[0]
  );
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodMenuItem>('day');
  const [data, setData] = useState<Data[]>(dataPerDay);
  const [selectedLineStyle, setSelectedLineStyle] =
    useState<LineStyleMenuItem>('monotone');
  const [getPng, { ref, isLoading }] = useCurrentPng();
  return (
    <>
      <Header
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        variantMenuItems={variantMenuItems}
        dataPerDay={dataPerDay}
        dataPerWeek={dataPerWeek}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        setData={setData}
        periodMenuItems={periodMenuItems}
        selectedLineStyle={selectedLineStyle}
        setSelectedLineStyle={setSelectedLineStyle}
        lineStyleMenuItems={lineStyleMenuItems}
        getPng={getPng}
        isLoading={isLoading}
      />
      <main>
        <Layout ref={ref}>
          {selectedLineStyle === 'area' ? (
            <AreaChartContainer
              data={data}
              selectedPeriod={selectedPeriod}
              monthTicks={monthTicks}
              weekTicks={weekTicks}
              variantMenuItems={variantMenuItems}
              selectedVariant={selectedVariant}
            />
          ) : (
            <LineChartContainer
              data={data}
              selectedPeriod={selectedPeriod}
              monthTicks={monthTicks}
              weekTicks={weekTicks}
              variantMenuItems={variantMenuItems}
              selectedVariant={selectedVariant}
              selectedLineStyle={selectedLineStyle}
            />
          )}
        </Layout>
      </main>
    </>
  );
}

export default App;
