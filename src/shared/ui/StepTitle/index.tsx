import React from 'react';

import styles from './index.module.scss';

type Props = { n: number };

export const StepTitle = ({n, children}: React.PropsWithChildren<Props>) => {
  return (
    <div className={styles.root}>
      <div className={styles.number}>
        {n}
      </div>
      <div className={styles.text}>{children}</div>
    </div>
  );
};
