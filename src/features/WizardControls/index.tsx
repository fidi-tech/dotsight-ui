import React, {ReactNode} from 'react';

import styles from './index.module.scss';
import {Bar} from '@/shared/ui/Bar';

type Props = {
  left?: ReactNode,
  right: ReactNode,
  percentage?: number,
}

const WizardControls = ({left, right, percentage}: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.left}>{left}</div>
      {percentage && <div className={styles.center}><Bar p={percentage}/></div>}
      <div className={styles.right}>{right}</div>
    </div>
  )
}

export default WizardControls;
