import {DISTRIBUTION_DATASHAPE_CODE} from '@/entities/datashape/model/distribution';

import Widget from './widget';
import Configurator from './configurator';
import Placeholder from './placeholder';

const type = 'pieChart';
const dataShape = DISTRIBUTION_DATASHAPE_CODE;

const pieChart = {
  title: 'Pie Chart',
  type,
  dataShape,
  Widget,
  Configurator,
  Placeholder,
};

export default pieChart;
