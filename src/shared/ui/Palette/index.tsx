import React from 'react';

import styles from './index.module.scss';

type Props = {
  colors: string[],
}

export const Palette = ({colors}: Props) =>
  <div className={styles.root}>
    {colors.map(color => <div className={styles.color} style={{backgroundColor: color}} key={color} />)}
  </div>;
