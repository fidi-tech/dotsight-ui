import React, {useMemo} from 'react';

import styles from './index.module.scss';
import {formatTime, formatValue} from '../../helpers';
import {LegendLine} from '../LegendLine';

type Props = {
  external: {
    items: any[],
  },
  payload: any,
  label: string,
}
export const Tooltip = (props: Props) => {
  const {external} = props;
  const {items} = external;
  const list = useMemo(() => {
    const copy = props.payload.slice();
    copy.sort((a, b) => b.value - a.value);
    return copy;
  }, [props.payload]);
  return (
    <div className={styles.root}>
      <div className={styles.label}>{formatTime(props.label)}</div>
      {list.map(item => (
        <div className={styles.item}>
          <LegendLine name={items[item.dataKey].name} color={item.color} />
          <div>{formatValue(item.value)}</div>
        </div>
      ))}
    </div>
  );
}