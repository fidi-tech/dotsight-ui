import Widget from './widget';
import Placeholder from './placeholder';
import Icon from './icon.svg';
import {getUnavailabilityReason} from './helpers';
import {WidgetConfig} from '..';
import {WidgetType} from '../constants';

const lineChart: WidgetConfig = {
  title: 'Line Chart',
  type: WidgetType.lineChart,
  Widget,
  Placeholder,
  Icon,
  getUnavailabilityReason,
};

export default lineChart;
