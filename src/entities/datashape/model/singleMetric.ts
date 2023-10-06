import { UnitId } from '@/entities/unit/model';

export const SINGLE_METRIC_DATASHAPE_CODE = 'single-metric';

type Value = number | Record<UnitId, number>;
export type SingleMetricDatashape = {
  value: Value;
};
