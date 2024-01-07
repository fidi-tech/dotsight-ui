import React, {ChangeEvent} from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Props = {
  value?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  wrong?: boolean,
  isDisabled?: boolean,
};

export const Input = ({value, onChange, wrong, isDisabled = false}: Props) => {
  return (
    <input
      className={cx(styles.root, {[styles.wrong]: wrong})}
      onChange={onChange}
      value={value}
      disabled={isDisabled}
    />
  );
};
