import dayjs from 'dayjs';
import styles from './styles.module.css';
import type { TooltipContentProps } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { CupIcon } from '../icons/CupIcon';
import { maxBy } from 'lodash';
import { CalendarIcon } from '../icons/Calendar';

export function CustomTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltipContainer}>
        <div className={styles.header}>
          {isNaN(Number(label)) ? <CalendarIcon /> : 'week'}
          <span className='label'>
            {isNaN(Number(label)) ? dayjs(label).format('DD/MM/YYYY') : label}
          </span>
        </div>
        <div>
          {payload.map((pld, _, array) => {
            return (
              <div className={styles.payloadItem}>
                <div
                  style={{
                    color: pld.stoke,
                    backgroundColor: pld.stroke,
                  }}
                  className={styles.dot}
                ></div>
                <div className={styles.key}>{pld.dataKey}</div>
                {maxBy(array, 'value')?.value === pld.value && <CupIcon />}
                <div className={styles.value}>{pld.value}%</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
}
