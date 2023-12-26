import {PipelineId} from '@/entities/pipeline/model';

import {pipelineExecutionParamsAdapter} from './adapter';

export const {selectById} = pipelineExecutionParamsAdapter.getSelectors(
  // @ts-expect-error
  state => state.pipelineExecutionParams
);

/*
 * Keyword "id" cannot be used in rjsf, using "$id" for schema ID
 */
export const selectSafeRJSFPipelineExecutionParams = (state: any, pipelineId: PipelineId) => {
  const original = selectById(state, pipelineId);
  if (!original) {
    return original;
  }
  const {id, ...rest} = original;
  return {
    '$id': id,
    ...rest,
  };
}
