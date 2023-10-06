export type PipelineId = string;

export type Pipeline = {
  id: PipelineId;
  name: string;
};

export type MapperId = string;

export type Datashape = {};

export type ExecuteResult = Record<MapperId, Datashape>;
