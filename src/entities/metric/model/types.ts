export type MetricId = string;

export type Metric = {
  icon: string | null,
  id: MetricId,
  isAvailable: boolean,
  isSelected: boolean,
  name: string,
}