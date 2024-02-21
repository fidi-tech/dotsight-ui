import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Props = { isActive?: boolean, isDisabled?: boolean, className?: string, onClick?: () => void };

export const Tile = ({isActive, isDisabled, className, children, onClick}: React.PropsWithChildren<Props>) => {
  return (
    <div
      className={cx(styles.root, className, {
        [styles.isActive]: isActive,
        [styles.isDisabled]: isDisabled,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
