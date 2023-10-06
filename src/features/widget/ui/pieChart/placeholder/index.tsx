import React from 'react';

import {PieChart as PieChartComponent} from '@/shared/ui/PieChart';
import Loader from '@/shared/ui/Loader';
import ErrorPlaceholder from '@/shared/ui/ErrorPlaceholder';

import styles from './index.module.scss';

const PIE = [
  {
    id: '1',
    percent: 0.7,
    color: '#7e8bff',
  },
  {
    id: '2',
    percent: 0.2,
    color: '#79818d',
  },
  {
    id: '3',
    percent: 0.1,
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
