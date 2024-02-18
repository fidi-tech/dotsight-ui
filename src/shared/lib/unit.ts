import {UnitId} from '@/entities/unit/model';
import {CURRENCY_FORMATTER} from '@/shared/lib/currency';

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


type UnitId = string;
type Unit = {
  id: UnitId,
  symbol: string,
  name: string,
  icon: string | null,
}
export const getScalarValue = (value?: Value, unit?: Unit) => {
  if (typeof value === 'undefined') {
    return '';
  }
  if (isMetricMultiValue(value)) {
    if (!unit) {
      return Object.values(value)[0];
    }
    return CURRENCY_FORMATTER[unit.id].format(value[unit.id]);
  }
  return value;
}
