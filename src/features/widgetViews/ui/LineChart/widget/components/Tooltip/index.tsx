import React, {useMemo} from 'react';

import styles from './index.module.scss';
import {formatTime} from '../../helpers';
import {LegendLine} from '../LegendLine';

type Props = {
  external: {
    items: any[],
    formatter: (value: number) => string,
  },
  payload: any,
  label: string,
}
export const Tooltip = (props: Props) => {
  const {external, payload} = props;
  const {items, formatter} = external;
  const list = useMemo(() => {
    const copy = payload.slice();
    copy.sort((a, b) => b.value - a.value);
    return copy;
  }, [payload]);
  return (
    <div className={styles.root}>
      <div className={styles.label}>{formatTime(props.label)}</div>
      {list.map(item =>
        <div className={styles.item} key={items[item.dataKey].name}>
          <LegendLine name={items[item.dataKey].name} color={item.color}/>
          <div>{formatter(item.value)}</div>
        </div>
      )}
    </div>
  );
}