import React from 'react';
import cx from 'classnames';

import {useEnhance} from '@/shared/ui/Switch/hooks';

import styles from './index.module.scss';

type Props = {
  initial?: boolean,
  onChange?: (enabled: boolean) => void;
  className?: string;
  switcherClassName?: string;
  controllable?: boolean;
};

const Switch = ({initial, onChange, className, switcherClassName, controllable}: Props) => {
  const {
    isChecked,
    onChange: _onChange,
  } = useEnhance({initial, onChange, controllable})

  return (
    <label className={cx(styles.root, className)}>
      <input type="checkbox" checked={isChecked} onChange={_onChange} onClick={e => e.stopPropagation()} />
      <span className={cx(styles.switch, switcherClassName)} />
    </label>
  )
}

export default Switch;