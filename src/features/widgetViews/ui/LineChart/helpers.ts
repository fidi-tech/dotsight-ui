import {getWidgetMetricsIds} from '@/entities/widget/model/getters';

export const getUnavailabilityReason = (widget) => {
  if (getWidgetMetricsIds(widget)?.length > 1) {
    return 'Only one metric can be selected';
  }
  return;
}