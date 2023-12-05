import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Props = {
  className?: string,
  dataTestId?: string,
};

export const Module = ({children, className, dataTestId}: React.PropsWithChildren<Props>) => {
  return (
    <div className={cx(styles.root, className)} data-testid={dataTestId}>
      {children}
    </div>
  );
};
