import React, {useMemo} from 'react';
import { TooltipProps } from 'recharts';

import {MetricId} from '@/entities/metric/model';

import styles from './index.module.scss';
import {LegendLine} from '../LegendLine';

type Props = TooltipProps<number, string> & {
  external: {
    items: Record<string, any>,
    metrics: Record<MetricId, any>,
  },
};

export const Tooltip = (props: Props) => {
  const {external, payload} = props;
  const {items, metrics} = external;
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
      <div className={styles.label}>{metrics[props.label]?.name}</div>
      {list.map(item => {
        const row = item.dataKey && items[item.dataKey];
        if (!row || !item.value) {
          return null;
        }
        return (
          <div className={styles.item} key={item.name}>
            <LegendLine name={row.name} color={item.color!}/>
            {item.value ? <div>{item.value * item.payload.max}</div> : undefined}
          </div>
        );
      })}
    </div>
  );
}