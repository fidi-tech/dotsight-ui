import Widget from './widget';
import Placeholder from './placeholder';
import Icon from './icon.svg';
import {getUnavailabilityReason} from './helpers';

const type = 'lineChart';

const lineChart = {
  title: 'Line Chart',
  type,
  Widget,
  Placeholder,
  Icon,
  getUnavailabilityReason,
};

export default lineChart;
