import React from 'react';

import {Module} from '@/shared/ui/Module';
import ErrorPlaceholder from '@/shared/ui/ErrorPlaceholder';
import Loader from '@/shared/ui/Loader';

import styles from './index.module.scss';

type Props = {
  isLoading: boolean,
  isError: boolean,
}

const Placeholder = ({isLoading, isError}: Props) => {
  let content = <div className={styles.content}>
    <p className={styles.label}>Label</p>
    <p className={styles.value}>Value</p>
  </div>;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <ErrorPlaceholder />
  }

  return (
    <Module className={styles.root}>
      {content}
    </Module>
  )
}

export default Placeholder;