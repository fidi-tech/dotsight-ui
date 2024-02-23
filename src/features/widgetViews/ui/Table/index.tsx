import Widget from './widget';
import Placeholder from './placeholder';
import Icon from './icon.svg';
import {WidgetConfig} from '..';
import {WidgetType} from '../constants';

const table: WidgetConfig = {
  title: 'Table',
  type: WidgetType.table,
  Widget,
  Placeholder,
  Icon,
};

export default table;
