import * as React from 'react';

import styles from './index.module.scss';

type Props = {
  testId?: string,
}

const Loader = ({testId}: Props) =>
    <div className={styles.root} data-testid={testId}>
        <div/>
        <div/>
        <div/>
        <div/>
    </div>;

export default Loader;