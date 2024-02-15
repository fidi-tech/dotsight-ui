import {Metric} from './types';

export const getMetricId = (metric: Metric) => metric.id;
export const getMetricIsSelected = (metric: Metric) => metric.isSelected;