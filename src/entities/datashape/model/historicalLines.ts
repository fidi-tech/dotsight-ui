export type TimeSeries<T> = Array<{
  timestamp: number;
  value: T;
}>;

export const HISTORICAL_LINES_DATASHAPE_CODE = 'historical-lines';

export type HistoricalLinesDatashape = {
  items: Array<{
    name: string;
    value: TimeSeries<number | Record<string, number>>;
  }>;
};
