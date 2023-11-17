import React from 'react';

import {PieChart as PieChartComponent} from '@/shared/ui/PieChart';
import Loader from '@/shared/ui/Loader';
import ErrorPlaceholder from '@/shared/ui/ErrorPlaceholder';

import styles from './index.module.scss';

const PIE = [
  {
    name: 'Unit #1',
    value: 721,
    color: '#7e8bff',
  },
  {
    name: 'Unit #2',
    value: 2100,
    color: '#79818d',
  },
  {
    name: 'Unit #3',
    value: 139,
    color: '#fafafa',
  }
];

type Props = {
  isLoading: boolean,
  isError: boolean,
}

const Placeholder = ({isLoading, isError}: Props) => {
  let content = <PieChartComponent pie={PIE} />
  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <ErrorPlaceholder />
  }
  return (
    <div className={styles.root}>
      {content}
    </div>
  )
}

export default Placeholder;
