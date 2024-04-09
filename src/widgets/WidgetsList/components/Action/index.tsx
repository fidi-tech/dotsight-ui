import React, {ReactNode} from 'react';

import styles from './index.module.scss';

type Props = {
  children: ReactNode,
}

const Action = ({children}: Props) => (
  <div className={styles.root}>
    {children}
  </div>
);

export default Action;