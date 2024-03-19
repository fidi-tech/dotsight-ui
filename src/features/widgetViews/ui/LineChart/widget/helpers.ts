import {addMinutes, format} from 'date-fns';

import {UnitId} from '@/entities/unit/model';
import {CURRENCY_FORMATTER} from '@/shared/lib/currency';

export const formatTime = (value: number) => {
  if (!value) {
    return '';
  }
  const date = new Date(value * 1000);
  return format(addMinutes(date, date.getTimezoneOffset()), 'd MMM')
};

const formatCompact = Intl.NumberFormat('en-US', {
  notation: "compact",
  maximumFractionDigits: 1
})
export const formatValue = (value: number, unitId?: UnitId) => {
  if (!value) {
    return '';
  }
  return unitId ? CURRENCY_FORMATTER[unitId].format(value) : formatCompact.format(value);
}