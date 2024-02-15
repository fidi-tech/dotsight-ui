import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Props = { Icon?: React.Component, nameClassName?: string };

export const NameWithIcon = ({Icon, children, nameClassName}: React.PropsWithChildren<Props>) => {
  return (
    <div className={styles.root}>
      {Icon &&
        <div className={styles.icon}>
          {Icon}
        </div>
      }
      <div className={cx(styles.name, nameClassName)}>{children}</div>
    </div>
  );
};
