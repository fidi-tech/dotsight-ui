import {STATISTICS_DATASHAPE_CODE} from '@/entities/datashape/model/statistics';

import Widget from './widget';
import Configurator from './configurator';
import Placeholder from './placeholder';

export const type = 'statistics';
export const dataShape = STATISTICS_DATASHAPE_CODE;

const Statistics = {
  title: 'Key Statistics',
  type,
  dataShape,
  Widget,
  Configurator,
  Placeholder,
};

export default Statistics;
