import * as React from 'react';

import DataFailed from './dataFailed.svg';

import styles from './index.module.scss';

const ErrorPlaceholder = () => {
    return (
      <div className={styles.root}>
          <DataFailed />
          <p>Oops! Something went wrong</p>
      </div>
    );
}

export default ErrorPlaceholder;
