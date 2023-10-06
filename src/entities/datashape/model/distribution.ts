export const DISTRIBUTION_DATASHAPE_CODE = 'distribution'

export type DistributionDatashape = {
  code: string,
  items: Array<{
    id: string;
    name: string;
    iconUrl?: string;
    value: number | Record<string, number>;
  }>;
};
