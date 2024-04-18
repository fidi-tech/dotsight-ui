import React, {ReactNode} from 'react';
import cx from 'classnames';

import WithTooltip from '@/shared/ui/WithTooltip';

import styles from './index.module.scss';

type Props = {
  isActive?: boolean,
  isDisabled?: boolean,
  className?: string,
  onClick?: () => void,
  testId?: string,
  Tooltip?: ReactNode,
};

export const Tile = ({isActive, isDisabled, className, children, onClick, testId, Tooltip}: React.PropsWithChildren<Props>) => {
  const content = (
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
  if (Tooltip) {
    return (
      <WithTooltip Tooltip={Tooltip}>
        {content}
      </WithTooltip>
    )
  }
  return content;
};
