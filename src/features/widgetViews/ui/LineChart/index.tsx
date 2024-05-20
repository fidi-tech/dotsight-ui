import Widget from './widget';
import Placeholder from './placeholder';
import Icon from './icon.svg';
import {getUnavailabilityReason} from './helpers';
import {WidgetConfig} from '..';
import {WidgetType} from '../constants';
import {ViewComponents} from './widget/views'

const lineChart: WidgetConfig = {
  title: 'Time Series',
  type: WidgetType.lineChart,
  Widget,
  Placeholder,
  Icon,
  getUnavailabilityReason,
  views: ViewComponents,
};

export default lineChart;
