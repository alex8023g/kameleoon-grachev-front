import type { VariantMenuItem } from '../../App';
import type { PeriodMenuItem } from '../../App';
import type { LineStyleMenuItem } from '../../App';
import type { Data } from '../../lib/prepareData';
import { DownLoadBtn } from '../DownLoadBtn/DownLoadBtn';
import { DropdownLineStyle } from '../DropDownLineStyle/DropDownLineStyle';
import { DropdownPeriod } from '../DropDownPeriod/DropDownPeriod';
import { DropdownVariant } from '../DropDownVariant/DropDownVariant';
import { Layout } from '../Layout/Layout';
import styles from './styles.module.css';

export function Header({
  selectedVariant,
  setSelectedVariant,
  variantMenuItems,
  dataPerDay,
  dataPerWeek,
  selectedPeriod,
  setSelectedPeriod,
  setData,
  periodMenuItems,
  selectedLineStyle,
  setSelectedLineStyle,
  lineStyleMenuItems,
  getPng,
  isLoading,
}: {
  selectedVariant: VariantMenuItem;
  setSelectedVariant: (variant: VariantMenuItem) => void;
  variantMenuItems: VariantMenuItem[];
  dataPerDay: Data[];
  dataPerWeek: Data[];
  selectedPeriod: PeriodMenuItem;
  setSelectedPeriod: (period: PeriodMenuItem) => void;
  setData: (data: Data[]) => void;
  periodMenuItems: PeriodMenuItem[];
  selectedLineStyle: LineStyleMenuItem;
  setSelectedLineStyle: (lineStyle: LineStyleMenuItem) => void;
  lineStyleMenuItems: LineStyleMenuItem[];
  getPng: (callback?: BlobCallback) => Promise<string | undefined>;
  isLoading: boolean;
}) {
  return (
    <header>
      <Layout>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <DropdownVariant
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
              variantMenuItems={variantMenuItems}
            />
            <DropdownPeriod
              dataPerDay={dataPerDay}
              dataPerWeek={dataPerWeek}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              setData={setData}
              periodMenuItems={periodMenuItems}
            />
          </div>
          <div className={styles.rightContainer}>
            <DropdownLineStyle
              selectedLineStyle={selectedLineStyle}
              setSelectedLineStyle={setSelectedLineStyle}
              lineStyleMenuItems={lineStyleMenuItems}
            />
            <DownLoadBtn getPng={getPng} isLoading={isLoading} />
          </div>
        </div>
      </Layout>
    </header>
  );
}
