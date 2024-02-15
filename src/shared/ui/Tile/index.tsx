import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Props = { isActive?: boolean, className?: string, onClick?: () => void };

export const Tile = ({isActive, className, children, onClick}: React.PropsWithChildren<Props>) => {
  return (
    <div className={cx(styles.root, className, {[styles.isActive]: isActive})} onClick={onClick}>
      {children}
    </div>
  );
};
