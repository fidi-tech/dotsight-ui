import {getWidgetMetricsIds, getWidgetPresetId, getWidgetSubCategoriesIds} from '@/entities/widget/model/getters';
import {Widget} from '@/entities/widget/model';

export const getUnavailabilityReason = (widget: Widget) => {
  const metricsIds = getWidgetMetricsIds(widget);
  const subCategoriesIds = getWidgetSubCategoriesIds(widget);
  if (metricsIds && metricsIds.length < 3) {
    return 'This widget type requires more than 3 metrics to be selected.';
  }
  if (subCategoriesIds && subCategoriesIds.length < 2) {
    return 'This widget type requires more than one metrics sub-category to be selected.';
  }
  if (getWidgetPresetId(widget)) {
    return 'This widget type doesn’t support metrics collection type. Please try again with the regular metrics only.';
  }
  return;
}
