import {HISTORICAL_LINES_DATASHAPE_CODE} from '@/entities/datashape/model/historicalLines';

import Widget from './widget';
import Configurator from './configurator';
import Placeholder from './placeholder';

const type = 'lineChart';
const dataShape = HISTORICAL_LINES_DATASHAPE_CODE;

const lineChart = {
  title: 'Time Series',
  type,
  dataShape,
  Widget,
  Configurator,
  Placeholder,
};

export default lineChart;
