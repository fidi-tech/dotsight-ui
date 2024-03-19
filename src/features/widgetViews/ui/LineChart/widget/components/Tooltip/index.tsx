import React, {useMemo} from 'react';
import { TooltipProps } from 'recharts';

import styles from './index.module.scss';
import {formatTime} from '../../helpers';
import {LegendLine} from '../LegendLine';

type Props = TooltipProps<number, string> & {
  external: {
    items: Record<string, any>,
    formatter: (value: number) => string,
  },
};

export const Tooltip = (props: Props) => {
  const {external, payload} = props;
  const {items, formatter} = external;
  const list = useMemo(() => {
    const copy = (payload ?? []).slice().filter(Boolean);
    copy.sort((a, b) => {
      if (!a.value) {
        return 1;
      }
      if (!b.value) {
        return -1;
      }
      return b.value - a.value;
    });
    return copy;
  }, [payload]);
  return (
    <div className={styles.root}>
      <div className={styles.label}>{formatTime(props.label)}</div>
      {list.map(item => {
        const row = item.dataKey && items[item.dataKey];
        if (!row) {
          return null;
        }
        return (
          <div className={styles.item} key={row.name}>
            <LegendLine name={row.name} color={item.color!}/>
            {item.value ? <div>{formatter(item.value)}</div> : undefined}
          </div>
        );
      })}
    </div>
  );
}