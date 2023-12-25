import {PipelineId} from '@/entities/pipeline/model';

export type PipelineExecutionParams = {
  is: PipelineId,
  description: string,
  properties: any,
  required: string[],
  title: string,
  type: string,
}