import {getWidgetMetricsIds, getWidgetPresetId, getWidgetSubCategoriesIds} from '@/entities/widget/model/getters';
import {Widget} from '@/entities/widget/model';

export const getUnavailabilityReason = (widget: Widget) => {
  const metricsIds = getWidgetMetricsIds(widget);
  const subCategoriesIds = getWidgetSubCategoriesIds(widget);
  if (metricsIds && metricsIds.length < 3) {
    return 'Unavailable with less than 3 metrics selected';
  }
  if (subCategoriesIds && subCategoriesIds.length < 2) {
    return 'Unavailable with one entity selected';
  }
  if (getWidgetPresetId(widget)) {
    return 'Does not work with presets';
  }
  return;
}
