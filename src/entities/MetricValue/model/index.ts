import {DEFAULT_UNIT_ID, UnitId} from '@/entities/unit/model';
import {CURRENCY_FORMATTER} from '@/shared/lib/currency';

export class MetricValue {
  scalar?: number = undefined;
  units?: Record<UnitId, number> = undefined;
  constructor (value: Record<UnitId, number> | number) {
    if (typeof value === 'number') {
      this.scalar = value;
    } else {
      this.units = value;
    }
  }

  isNull() {
    return (
      !this.isScalar() && !this.isMultiValue()
    )
  }

  isScalar() {
    return typeof this.scalar !== 'undefined';
  }

  isMultiValue() {
    return typeof this.units !== 'undefined';
  }

  getNumericValue(unitId: UnitId = DEFAULT_UNIT_ID) {
    if (this.scalar) {
      return this.scalar;
    } else if (this.units) {
      return this.units[unitId];
    } else {
      return NaN;
    }
  }

  getStringValue(unitId: UnitId = DEFAULT_UNIT_ID) {
    if (this.scalar) {
      return this.scalar.toString();
    } else if (this.units) {
      return CURRENCY_FORMATTER[unitId].format(this.units[unitId]);
    } else {
      return '';
    }
  }
}