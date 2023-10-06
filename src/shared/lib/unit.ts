import {UnitId} from '@/entities/unit/model';

type Value = number | Record<UnitId, number>;

export const getAbsoluteMetricValue = (value: Value, unitId?: UnitId): number | undefined => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'object') {
    if (!unitId) {
      return Object.values(value)[0];
    }
    return value[unitId];
  }
}
