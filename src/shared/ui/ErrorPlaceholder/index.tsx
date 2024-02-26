import * as React from 'react';

import DataFailed from './dataFailed.svg';

import styles from './index.module.scss';

type Props = {
  text?: string;
}
const ErrorPlaceholder = ({text}: Props) => {
    return (
      <div className={styles.root}>
          <DataFailed />
          <p>{text || 'Oops! Something went wrong'}</p>
      </div>
    );
}

export default ErrorPlaceholder;
