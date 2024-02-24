import React from 'react';

import {Table} from '@/shared/ui/Table';
import {Module} from '@/shared/ui/Module';
import Loader from '@/shared/ui/Loader';
import ErrorPlaceholder from '@/shared/ui/ErrorPlaceholder';
import {CURRENCY_FORMATTER} from '@/shared/lib/currency';
import {getColorsFromPaletteByVariant, PaletteVariant} from '@/shared/ui/styles/palettes';

import styles from './index.module.scss';
import {DEFAULT_UNIT_ID} from '@/entities/unit/model';

const ROWS = [
  ['Placeholder 1', CURRENCY_FORMATTER[DEFAULT_UNIT_ID].format(1568)],
  ['Placeholder 2', CURRENCY_FORMATTER[DEFAULT_UNIT_ID].format(1237.2)],
  ['Placeholder 3', CURRENCY_FORMATTER[DEFAULT_UNIT_ID].format(420)],
  ['Placeholder 4', CURRENCY_FORMATTER[DEFAULT_UNIT_ID].format(57)],
  ['Placeholder 5', CURRENCY_FORMATTER[DEFAULT_UNIT_ID].format(22)],
  ['Other', CURRENCY_FORMATTER[DEFAULT_UNIT_ID].format(2130)],
];

const PALETTE = getColorsFromPaletteByVariant(PaletteVariant.v1);

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