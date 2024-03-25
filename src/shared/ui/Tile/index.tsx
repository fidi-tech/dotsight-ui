import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Props = { isActive?: boolean, isDisabled?: boolean, className?: string, onClick?: () => void, testId?: string };

export const Tile = ({isActive, isDisabled, className, children, onClick, testId}: React.PropsWithChildren<Props>) => {
  return (
    <button
      className={cx(styles.root, className, {
        [styles.isActive]: isActive,
        [styles.isDisabled]: isDisabled,
      })}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </button>
  );
};
