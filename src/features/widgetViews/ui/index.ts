import {ReactNode} from 'react';

import {Widget} from '@/entities/widget/model';

import LineChart from './LineChart';
import Table from './Table';
import {WidgetType} from './constants';

export type WidgetConfig = {
  title: string,
  type: WidgetType,
  Widget: ({data}: any) => ReactNode;
  Placeholder: ({isLoading, isError}: any) => ReactNode;
  Icon: ReactNode;
  getUnavailabilityReason?: (widget: Widget) => string | undefined
}
export const widgets: Record<WidgetType, WidgetConfig> = {
  [WidgetType.lineChart]: LineChart,
  [WidgetType.table]: Table,
};

export default widgets;