import React from 'react';

import {PieChart as PieChartComponent} from '@/shared/ui/PieChart';
import Loader from '@/shared/ui/Loader';
import ErrorPlaceholder from '@/shared/ui/ErrorPlaceholder';
import {getColorsFromPaletteByVariant, PaletteVariant} from '@/shared/ui/styles/palettes';

import styles from './index.module.scss';

const palette = getColorsFromPaletteByVariant(PaletteVariant.v1);
const PIE = [
  {
    name: 'Unit #1',
    value: 2100,
    color: palette[0],
  },
  {
    name: 'Unit #2',
    value: 721,
    color: palette[1],
  },
  {
    name: 'Unit #3',
    value: 139,
    color: palette[2],
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
