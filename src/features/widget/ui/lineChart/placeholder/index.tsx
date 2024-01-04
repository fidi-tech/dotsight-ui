import React from 'react';

import {LineChart as LineChartComponent} from '@/shared/ui/LineChart';
import Loader from '@/shared/ui/Loader';
import ErrorPlaceholder from '@/shared/ui/ErrorPlaceholder';
import {getColorsFromPaletteByVariant, PaletteVariant} from '@/shared/ui/styles/palettes';

import styles from './index.module.scss';

const palette = getColorsFromPaletteByVariant(PaletteVariant.v1);
const LABELS = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
];

const DATASETS = [
  {
    label: 'First',
    data: [
      {x: '10:00', y: 10},
      {x: '11:00', y: 20},
      {x: '12:00', y: 15},
      {x: '13:00', y: 5},
    ],
    borderColor: palette[0],
    backgroundColor: palette[0],
  },
  {
    label: 'Second',
    data: [
      {x: '10:00', y: 25},
      {x: '11:00', y: 10},
      {x: '12:00', y: 15},
      {x: '13:00', y: 30},
    ],
    borderColor: palette[0],
    backgroundColor: palette[0],
  },
];

type Props = {
  isLoading: boolean,
  isError: boolean,
}

const Placeholder = ({isLoading, isError}: Props) => {
  let content = <LineChartComponent labels={LABELS} datasets={DATASETS} />
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
