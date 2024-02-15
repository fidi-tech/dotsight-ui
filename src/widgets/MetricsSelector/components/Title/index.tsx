import React from 'react';

import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';

export const Title = () => (
  <p className={styles.title}>
    Select
    <span className={styles.branded}>
        <span className={styles.titleIcon}>
          <Icons.Chart />
        </span>
        Metrics
      </span>
    for your widget
  </p>
);