import React from 'react';

import {Icons} from '@/shared/ui/icons';
import {CategoryId} from '@/entities/category/model';

import styles from './index.module.scss';

type Props = {
  categoryId: CategoryId,
}

const MAP = {
  [CategoryId.network]: () => (
    <p className={styles.title}>
      Select
      <span className={styles.branded}>
        <span className={styles.titleIcon}>
          <Icons.Nodes />
        </span>
        Networks
      </span>
      for your widget
    </p>
  ),
  [CategoryId.wallet]: () => (
    <p className={styles.title}>
      Select the
      <span className={styles.branded}>
        <span className={styles.titleIcon}>
          <Icons.Wallet />
        </span>
        Wallet(s)
      </span>
      for your widget
    </p>
  ),
  [CategoryId.token]: () => (
    <p className={styles.title}>
      Select the
      <span className={styles.branded}>
        <span className={styles.titleIcon}>
          <Icons.Wallet />
        </span>
        Token(s)
      </span>
      for your widget
    </p>
  ),
}

export const Title = ({categoryId}: Props) => {
  const TitleSource = MAP[categoryId];
  return <TitleSource />
}