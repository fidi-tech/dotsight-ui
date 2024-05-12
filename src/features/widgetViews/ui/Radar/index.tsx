import Widget from './widget';
import Placeholder from './placeholder';
import Icon from './icon.svg';
import {WidgetConfig} from '..';
import {WidgetType} from '../constants';
import {getUnavailabilityReason} from './helpers';
import {ViewComponents} from './widget/views'

const radar: WidgetConfig = {
  title: 'Radar',
  type: WidgetType.radar,
  Widget,
  Placeholder,
  Icon,
  getUnavailabilityReason,
  views: ViewComponents,
};

export default radar;
