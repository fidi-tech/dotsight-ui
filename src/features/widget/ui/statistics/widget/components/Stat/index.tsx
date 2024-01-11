import React from 'react';
import cx from 'classnames';

import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';

type Props = {
  stat: string,
  value: string | undefined,
  change: number,
}
export const Stat = ({stat, value, change}: Props) => {
  const hasChange = change > 0 || change < 0;
  return (
    <div className={styles.root}>
      <div className={styles.name}>{stat}</div>
      <div className={styles.value}>
        {value}
        {hasChange && (
          <span className={cx(styles.percentage, {[styles.negative]: change < 0})}>
            <Icons.Triangle />
            {change}%
          </span>
        )}
      </div>
    </div>
  );
}