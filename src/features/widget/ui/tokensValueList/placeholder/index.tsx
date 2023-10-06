import React from 'react';

import {Table} from '@/shared/ui/Table';
import {Module} from '@/shared/ui/Module';
import {formatValue} from '@/entities/value/lib/format';
import Loader from '@/shared/ui/Loader';
import ErrorPlaceholder from '@/shared/ui/ErrorPlaceholder';

import styles from './index.module.scss';

const ROWS = [
  ['Placeholder 1', formatValue(1568)],
  ['Placeholder 2', formatValue(1237.2)],
  ['Placeholder 3', formatValue(420)],
  ['Placeholder 4', formatValue(57)],
  ['Placeholder 5', formatValue(22)],
  ['Other', formatValue(2130)],
];

const PALETTE = [
  '#7e8bff',
  '#7ec6ff',
  '#7effe5',
  '#7effb5',
  '#79818d',
  '#dcdee1',
];

type Props = {
  isLoading: boolean,
  isError: boolean,
}

const Placeholder = ({isLoading, isError}: Props) => {
  let content = <Table header={['Asset', 'Value']} rows={ROWS} palette={PALETTE} />;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <ErrorPlaceholder />;
  }

  return (
    <Module className={styles.root}>
      {content}
    </Module>
  )
}

export default Placeholder;