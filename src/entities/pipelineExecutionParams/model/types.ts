import {PipelineId} from '@/entities/pipeline/model';

export type PipelineExecutionParamsRaw = {
  description: string,
  properties: any,
  required: string[],
  title: string,
  type: string,
}

export type PipelineExecutionParams = PipelineExecutionParamsRaw & {
  id: PipelineId,
}
