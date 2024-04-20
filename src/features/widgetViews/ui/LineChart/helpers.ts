import {getWidgetMetricsIds, getWidgetPresetId} from '@/entities/widget/model/getters';
import {Widget} from '@/entities/widget/model';

export const getUnavailabilityReason = (widget: Widget) => {
  const metricsIds = getWidgetMetricsIds(widget);
  if (metricsIds && metricsIds.length > 1) {
    return 'This widget type requires a single metric being selected.';
  }
  if (getWidgetPresetId(widget)) {
    return 'This widget type doesn’t support metrics collection type. Please try again with the regular metrics only.';
  }
  return;
}
