import React from 'react';

import {Module} from '@/shared/ui/Module';
import Loader from '@/shared/ui/Loader';
import ErrorPlaceholder from '@/shared/ui/ErrorPlaceholder';

import styles from './index.module.scss';

type Props = {
  isLoading: boolean,
  isError: boolean,
}

const Placeholder = ({isLoading, isError}: Props) => {
  let content ;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <ErrorPlaceholder text="Data is unavailable, select a different data source." />;
  }

  return (
    <Module className={styles.root}>
      {content}
    </Module>
  )
}

export default Placeholder;
