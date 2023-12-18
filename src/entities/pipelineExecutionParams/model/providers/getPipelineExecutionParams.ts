import {getPipelineParams} from '@/shared/api/dotsight';

import {PipelineId} from '@/entities/pipeline/model/types';

export const getPipelineExecutionParams = async (
  {pipelineId, mapperCode}: {pipelineId: PipelineId, mapperCode: string},
) => {
  const response = await getPipelineParams({id: pipelineId, mapperCode});
  return response.data;
};
