export type PipelineId = string;

export type Pipeline = {
  id: PipelineId;
  name: string;
  widgets: Array<{
    id: string;
    type: string;
    config: object;
    datashape: string;
  }>;
  mappers: Record<string, {
    id: string;
    code: string;
    type: string;
    config: object;
  }>;
  dataSources: Array<{
    id: string;
    type: string;
    config: object;
  }>;
  results: any;
};
