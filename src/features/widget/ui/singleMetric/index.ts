import {SINGLE_METRIC_DATASHAPE_CODE} from '@/entities/datashape/model/singleMetric';

import Widget from './widget';
import Configurator from './configurator';
import Placeholder from './placeholder';

export const type = 'singleMetric';
export const dataShape = SINGLE_METRIC_DATASHAPE_CODE;

const singleMetric = {
  title: 'Single metric',
  type,
  dataShape,
  Widget,
  Configurator,
  Placeholder,
};

export default singleMetric;
