import { DropdownMenu } from 'radix-ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import styles from './styles.module.css';
import type { LineStyleMenuItem } from '../../App';

export function DropdownLineStyle({
  selectedLineStyle,
  setSelectedLineStyle,
  lineStyleMenuItems,
}: {
  selectedLineStyle: LineStyleMenuItem;
  setSelectedLineStyle: (lineStyle: LineStyleMenuItem) => void;
  lineStyleMenuItems: LineStyleMenuItem[];
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.TriggerButton} aria-label='Customise options'>
          {selectedLineStyle}
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.Content} sideOffset={1} align='start'>
          {lineStyleMenuItems.map((item) => (
            <DropdownMenu.Item
              key={item}
              className={styles.Item}
              onSelect={(event: Event) => {
                const value = (event.target as HTMLButtonElement).textContent;

                if (value) {
                  setSelectedLineStyle(
                    lineStyleMenuItems.find((item) => item === value) ||
                      lineStyleMenuItems[0]
                  );
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
