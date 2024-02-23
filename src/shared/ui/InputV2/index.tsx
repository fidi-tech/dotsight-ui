import React from 'react';

import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({...props}: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <Icons.Search />
      </div>
      <div className={styles.inputWrapper}>
        <input {...props} />
      </div>
    </div>
  );
};
