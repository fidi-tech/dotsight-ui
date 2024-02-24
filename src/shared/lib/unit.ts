import {UnitId} from '@/entities/unit/model';

type MultiValue = Record<UnitId, number>
type Value = number | MultiValue;

export function isMetricMultiValue(value: Value): value is MultiValue {
  return typeof value === 'object';
}
export const getAbsoluteMetricValue = (value: Value, unitId?: UnitId): number | undefined => {
  if (isMetricMultiValue(value)) {
    if (!unitId) {
      return Object.values(value)[0];
    }
    return value[unitId];
  }
  return value;
}
