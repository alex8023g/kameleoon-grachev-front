import { DropdownMenu } from 'radix-ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import styles from './styles.module.css';
import type { VariantMenuItem } from '../../App';

export function DropdownVariant({
  selectedVariant,
  setSelectedVariant,
  variantMenuItems,
}: {
  selectedVariant: VariantMenuItem;
  setSelectedVariant: (variant: VariantMenuItem) => void;
  variantMenuItems: VariantMenuItem[];
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.TriggerButton} aria-label='Customise options'>
          {selectedVariant?.name}
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.Content} sideOffset={1}>
          {variantMenuItems.map((item) => (
            <DropdownMenu.Item
              key={item.id}
              className={styles.Item}
              onSelect={(event: Event) => {
                const value = (event.target as HTMLButtonElement).textContent;
                console.log('🚀 ~ DropdownVariant ~ value:', value);
                if (value) {
                  setSelectedVariant(
                    variantMenuItems.find((item) => item.name === value) ||
                      variantMenuItems[0]
                  );
                }
              }}
            >
              {item.name}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
