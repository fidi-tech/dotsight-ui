import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Props = {
  className?: string,
};

export const Module = ({children, className}: React.PropsWithChildren<Props>) => {
  return (
    <div className={cx(styles.root, className)}>
      {children}
    </div>
  );
};
