import {Metric} from './types';

export const getMetricId = (metric: Metric) => metric.id;
export const getMetricIsSelected = (metric: Metric) => metric.isSelected;
export const getMetricName = (metric: Metric) => metric.name;
export const getMetricIcon = (metric: Metric) => metric.icon;