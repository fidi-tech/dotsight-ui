import {UnitId} from '@/entities/unit/model';

export const STATISTICS_DATASHAPE_CODE = 'statistics';

export type StatisticsDatashape = {
  name: string;
  logoUrl: string;
  stats: Array<{
    stat: string;
    value: number | Record<UnitId, number>;
    change: number,
  }>;
};
