import {getWidgetMetricsIds, getWidgetPresetId} from '@/entities/widget/model/getters';
import {Widget} from '@/entities/widget/model';

export const getUnavailabilityReason = (widget: Widget) => {
  const metricsIds = getWidgetMetricsIds(widget);
  if (metricsIds && metricsIds.length > 1) {
    return 'Only one metric can be selected';
  }
  if (getWidgetPresetId(widget)) {
    return 'Does not work with presets';
  }
  return;
}
