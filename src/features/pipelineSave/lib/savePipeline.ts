import {PipelineId} from '@/entities/pipeline/model';
import {Dispatch} from '@reduxjs/toolkit';
import {updatePipeline} from '@/shared/api/dotsight';

export const savePipeline = (
  {pipelineId, name, isPublic}: {pipelineId: PipelineId, name: string, isPublic: boolean},
) => async (dispatch: Dispatch) => {
  await updatePipeline({id: pipelineId, name, isPublic});
  window.location.assign('/');
};

