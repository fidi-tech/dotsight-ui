import type {Widget} from './types';

export const getWidgetId = (widget: Widget) => widget.id;
export const getWidgetName = (widget: Widget) => widget.name;
export const getWidgetCategoryId = (widget: Widget) => widget.category;
export const getWidgetSubCategoriesIds = (widget: Widget) => widget.subcategories;
export const getWidgetMetricsIds = (widget: Widget) => widget.metrics;