import { DropdownMenu } from 'radix-ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import styles from './styles.module.css';
import type { PeriodMenuItem } from '../../App';
import type { Data } from '../../lib/prepareData';

export function DropdownPeriod({
  dataPerDay,
  dataPerWeek,
  selectedPeriod,
  setSelectedPeriod,
  setData,
  periodMenuItems,
}: {
  dataPerDay: Data[];
  dataPerWeek: Data[];
  selectedPeriod: PeriodMenuItem;
  setSelectedPeriod: (period: PeriodMenuItem) => void;
  setData: (data: Data[]) => void;
  periodMenuItems: PeriodMenuItem[];
}) {
  // const [selectedPeriod, setSelectedPeriod] = useState<PeriodMenuItem>('day');

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.TriggerButton} aria-label='Customise options'>
          {selectedPeriod}
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.Content} sideOffset={1} align='start'>
          {periodMenuItems.map((item) => (
            <DropdownMenu.Item
              key={item}
              className={styles.Item}
              onSelect={(event: Event) => {
                const value = (event.target as HTMLButtonElement).textContent;

                if (value) {
                  setSelectedPeriod(
                    periodMenuItems.find((item) => item === value) || periodMenuItems[0]
                  );
                  setData(value === 'day' ? dataPerDay : dataPerWeek);
                }
              }}
            >
              {item}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
