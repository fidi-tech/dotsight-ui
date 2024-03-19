import {UnitId} from '@/entities/unit/model';

export const CURRENCY_FORMATTER: Record<UnitId, Intl.NumberFormat> = {
  usd: Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
  }),
}