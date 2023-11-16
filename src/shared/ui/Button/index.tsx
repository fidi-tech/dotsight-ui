import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Theme = 'regular';
type IconPosition = 'Left' | 'Right';

type Props = {
  text?: string;
  onClick: () => any;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  className?: string;
  theme?: Theme;
  disabled?: boolean;
  e2e?: string;
  testId?: string;
};

export const Button = ({text, onClick, icon, className, theme = 'regular', iconPosition = 'Right', e2e, testId, disabled = false}: Props) => {
  const cName = cx(styles.root, className, {
    [styles[`theme-${theme}`]]: true,
    [styles.disabled]: disabled,
    [styles.clickable]: !disabled && onClick,
  });
  return (
    <div className={cName} onClick={!disabled ? onClick : undefined} data-e2e={e2e} data-testid={testId} role="button">
      {icon && iconPosition === 'Left' && <div className={styles.icon}>{icon}</div>}
      {text && <p className={styles.text}>{text}</p>}
      {icon && iconPosition === 'Right' && <div className={styles.icon}>{icon}</div>}
    </div>
  );
}
